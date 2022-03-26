function refreshPage() {
  location.reload();
}

function buildQuiz() {
  //Check if "All" selected
  var checkboxes = document.getElementById("All");
  var boxChecked = checkboxes.checked ? true : false;

  //Chapters to filter by
  var chapterChoices = [];

  //Populate chapterChoices; need to think about how to order the blocks of codes (can embed within codes)
  //Array of full chapters
  var fullChapterSet = [
    "Alkanes",
    "Alkenes",
    "Arenes",
    "Halogen Derivatives",
    "Hydroxy Compounds",
    "Carbonyl Compounds",
    "Carboxylic Acids and Derivatives",
    "Nitrogen Compounds"
  ];

  if (boxChecked == true) {
    for (var chapters in fullChapterSet) {
      chapterChoices.push(fullChapterSet[chapters]);
    }
  } else {
    for (var chapters in fullChapterSet) {
      checkboxes = document.getElementById(fullChapterSet[chapters]);
      boxChecked = checkboxes.checked ? true : false;

      //console.log(checkboxes)

      if (boxChecked == true) {
        chapterChoices.push(fullChapterSet[chapters]);
      } else {
      }
    }
  }

  //console.log(chapterChoices);

  //filter by chapter
  var myQuestions = [];

  for (var m = 0; m < sortedQuestions.length; m++) {
    for (var chapter in chapterChoices) {
      var obj = sortedQuestions[m];

      if (obj.topic == chapterChoices[chapter]) {
        myQuestions.push(obj);
      }
    }
  }

  //Log chapters into console
  //console.log(myQuestions);
  //console.log(chapterChoices.length);

  //Set maximum to 50
  if (numberOfQuestions.value > 50) {
    numberOfQuestions.value = 50;
  }

  //Set minimum to 3
  if (numberOfQuestions.value < 1) {
    numberOfQuestions.value = 1;
  }

  //If number of questions < chosen number, choose max number of questions
  if (numberOfQuestions.value > myQuestions.length) {
    numberOfQuestions.value = myQuestions.length;
  }

  //My attempt at coding it

  // variable to store the HTML output
  const output = [];

  for (let i = 0; i < numberOfQuestions.value; i++) {
    var questionNumberLabel = i + 1;

    // variable to store the list of possible answers
    const answers = [];

    // and for each available answer...
    for (var letter in myQuestions[i].answers) {
      //console.log(myQuestions[i].type.value);

      if (myQuestions[i].type === "choice") {
        // ...add an HTML radio button
        answers.push(
          `<label>
            <input type="radio" name="question${i}" value="${letter}">
            ${myQuestions[i].answers[letter]}
          </label>`
        );
      } else if (myQuestions[i].type === "checkbox") {
        // ...add an HTML checkbox button
        answers.push(
          `<label>
            <input type="checkbox" name="question${i}" value="${letter}">
            ${myQuestions[i].answers[letter]}
          </label>`
        );
      } else {
      }
    }

    // add this question and its answers to the output
    output.push(
      `<div class="question"> ${"Question " +
        questionNumberLabel +
        ":<br>" +
        myQuestions[i].question} </div>
        <div class="answers"> ${answers.join("")} </div>`
    );
  }

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
}

function showResults() {
  //Just gonna repeat the same process as above to generate options

  //Check if "All" selected
  var checkboxes = document.getElementById("All");
  var boxChecked = checkboxes.checked ? true : false;

  //Chapters to filter by
  var chapterChoices = [];

  //Populate chapterChoices; need to think about how to order the blocks of codes (can embed within codes)
  //Array of full chapters
  var fullChapterSet = [
    "Alkanes",
    "Alkenes",
    "Arenes",
    "Halogen Derivatives",
    "Hydroxy Compounds",
    "Carbonyl Compounds",
    "Carboxylic Acids and Derivatives",
    "Nitrogen Compounds"
  ];

  if (boxChecked == true) {
    for (var chapters in fullChapterSet) {
      chapterChoices.push(fullChapterSet[chapters]);
    }
  } else {
    for (var chapters in fullChapterSet) {
      checkboxes = document.getElementById(fullChapterSet[chapters]);
      boxChecked = checkboxes.checked ? true : false;

      //console.log(checkboxes)

      if (boxChecked == true) {
        chapterChoices.push(fullChapterSet[chapters]);
      } else {
      }
    }
  }

  //console.log(chapterChoices);

  //filter by chapter
  var myQuestions = [];

  for (var m = 0; m < sortedQuestions.length; m++) {
    for (var chapter in chapterChoices) {
      var obj = sortedQuestions[m];

      if (obj.topic == chapterChoices[chapter]) {
        myQuestions.push(obj);
      }
    }
  }

  //Log chapters into console
  //console.log(myQuestions);
  //console.log(chapterChoices.length);

  //End of repeat

  // gather answer containers from our quiz
  const answerContainers = quizContainer.querySelectorAll(".answers");

  // keep track of user's answers
  let numCorrect = 0;

  // for each question...

  for (let j = 0; j < numberOfQuestions.value; j++) {
    var qnNo = j + 1;

    if (myQuestions[j].type === "choice") {
      const answerContainer = answerContainers[j];
      const selector = `input[name=question${j}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      console.log(answerContainer);
      console.log(userAnswer);
      console.log(myQuestions[j].correctAnswer);

      // if answer is correct
      if (userAnswer === myQuestions[j].correctAnswer) {
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[j].style.color = "lightgreen";
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[j].style.color = "red";
      }
    } else if (myQuestions[j].type === "checkbox") {
      const answerContainer = answerContainers[j];
      //Check if the boxes are check - return true/false
      const selectorA = `input[value=A]:checked`;
      const selectorB = `input[value=B]:checked`;
      const selectorC = `input[value=C]:checked`;
      const selectorD = `input[value=D]:checked`;
      const userAnswerA = (answerContainer.querySelector(selectorA) || {})
        .checked
        ? true
        : false;
      const userAnswerB = (answerContainer.querySelector(selectorB) || {})
        .checked
        ? true
        : false;
      const userAnswerC = (answerContainer.querySelector(selectorC) || {})
        .checked
        ? true
        : false;
      const userAnswerD = (answerContainer.querySelector(selectorD) || {})
        .checked
        ? true
        : false;

      //Pull correct answers - return true/false
      var optionA = myQuestions[j].correctAnswer["A"];
      var optionB = myQuestions[j].correctAnswer["B"];
      var optionC = myQuestions[j].correctAnswer["C"];
      var optionD = myQuestions[j].correctAnswer["D"];

      //console.log("Options");
      //console.log(optionA);
      //console.log(optionB);
      //console.log(optionC);
      //console.log(optionD);

      //console.log("Choices");
      //console.log(userAnswerA);
      //console.log(userAnswerB);
      //console.log(userAnswerC);
      //console.log(userAnswerD);

      // if answer is correct
      if (optionA == userAnswerA) {
        if (optionB == userAnswerB) {
          if (optionC == userAnswerC) {
            if (optionD == userAnswerD) {
              // add to the number of correct answers
              numCorrect++;

              // color the answers green
              answerContainers[j].style.color = "lightgreen";
            } else {
              // color the answers red
              answerContainers[j].style.color = "red";
            }
          } else {
            // color the answers red
            answerContainers[j].style.color = "red";
          }
        } else {
          // color the answers red
          answerContainers[j].style.color = "red";
        }
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[j].style.color = "red";
      }
    } else {
    }

    // show number of correct answers out of total
    if (numberOfQuestions.value < myQuestions.length) {
      resultsContainer.innerHTML =
        "Score: " +
        numCorrect +
        " out of " +
        numberOfQuestions.value +
        "<br> You can edit your answers and submit again.";
    } else {
      resultsContainer.innerHTML =
        "Score: " +
        numCorrect +
        " out of " +
        myQuestions.length +
        "<br> You can edit your answers and submit again";
    }
  }
}

//Variables
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const createQuizButton = document.getElementById("createQuiz");
const numberOfQuestions = document.getElementById("numberOfQuestions");
const newQuizButton = document.getElementById("newQuiz");
const totalNumberOfQuestions = "";

//Insert library of questions; the formating will clean everything up nicely
var questionBank = [
  {
    question:
      "Which product(s) might be obtained when an alkene is reacted with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "CO<sub>2</sub> and H<sub>2</sub>O"
    },
    correctAnswer: { A: true, B: false, C: true, D: true },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which product(s) will be formed when a primary amide is heated under reflux with dilute H<sub>2</sub>SO<sub>4</sub>?",
    answers: {
      A: "Primary ammonium salt",
      B: "Secondary ammonium salt ",
      C: "Ammonium",
      D: "Carboxylic acid"
    },
    correctAnswer: { A: false, B: false, C: true, D: true },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which product(s) will be formed when a secondary amide is heated under reflux with dilute H<sub>2</sub>SO<sub>4</sub>?",
    answers: {
      A: "Primary ammonium salt",
      B: "Secondary ammonium salt ",
      C: "Ammonium",
      D: "Carboxylic acid"
    },
    correctAnswer: { A: true, B: false, C: false, D: true },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which product(s) will be formed when a primary amide is heated under reflux with dilute NaOH?",
    answers: {
      A: "Amine",
      B: "Ammonia",
      C: "Carboxylate",
      D: "Carboxylic acid"
    },
    correctAnswer: { A: false, B: true, C: true, D: false },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which product(s) will be formed when a secondary amide is heated under reflux with dilute NaOH?",
    answers: {
      A: "Amine",
      B: "Ammonia",
      C: "Carboxylate",
      D: "Carboxylic acid"
    },
    correctAnswer: { A: true, B: false, C: true, D: false },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which product is formed when a carboxylic acid is reacted with PCl<sub>3</sub>?",
    answers: {
      A: "Acyl chloride",
      B: "HCl",
      C: "H<sub>3</sub>PO<sub>3</sub>",
      D: "POCl<sub>3</sub>"
    },
    correctAnswer: { A: true, B: false, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which product is formed when a carboxylic acid is reacted with PCl<sub>5</sub>?",
    answers: {
      A: "Acyl chloride",
      B: "HCl",
      C: "H<sub>3</sub>PO<sub>3</sub>",
      D: "POCl<sub>3</sub>"
    },
    correctAnswer: { A: true, B: true, C: false, D: true },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which product(s) is formed when a carboxylic acid is reacted with SOCl<sub>2</sub>?",
    answers: {
      A: "Acyl chloride",
      B: "HCl",
      C: "SO<sub>2</sub>",
      D: "SO<sub>3</sub>"
    },
    correctAnswer: { A: true, B: true, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which product is formed when a methanoic acid is reacted with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "CO<sub>2</sub>",
      B: "H<sub>2</sub>O",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: { A: true, B: true, C: false, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which product is formed when a ethanedioic acid is reacted with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "CO<sub>2</sub>",
      B: "H<sub>2</sub>O",
      C: "Methanoic acid",
      D: "No reaction"
    },
    correctAnswer: { A: true, B: true, C: false, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which product is formed when an ester is heated under reflux with H<sub>2</sub>SO<sub>4</sub>(aq)?",
    answers: {
      A: "Carboxylic acid",
      B: "Alcohol",
      C: "Carboxylate",
      D: "No reaction"
    },
    correctAnswer: { A: true, B: true, C: false, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which product is formed when an ester is heated under reflux with NaOH(aq)?",
    answers: {
      A: "Carboxylic acid",
      B: "Alcohol",
      C: "Carboxylate",
      D: "No reaction"
    },
    correctAnswer: { A: false, B: true, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with PCl<sub>3</sub>?",
    answers: {
      A: "Chloroalkane",
      B: "HCl",
      C: "H<sub>3</sub>PO<sub>3</sub>",
      D: "POCl<sub>3</sub>"
    },
    correctAnswer: { A: true, B: false, C: true, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with PCl<sub>5</sub>?",
    answers: {
      A: "Chloroalkane",
      B: "HCl",
      C: "H<sub>3</sub>PO<sub>3</sub>",
      D: "POCl<sub>3</sub>"
    },
    correctAnswer: { A: true, B: true, C: false, D: true },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with SOCl<sub>2</sub>?",
    answers: {
      A: "Chloroalkane",
      B: "HCl",
      C: "SO<sub>2</sub>",
      D: "SO<sub>3</sub>"
    },
    correctAnswer: { A: true, B: true, C: true, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an acyl chloride into an ester?",
    answers: {
      A: "Alcohol, heat",
      B: "Alcohol, heat with reflux",
      C: "Alcohol, warm",
      D: "Alcohol, r.t.p"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an acyl chloride into an amide (secondary)?",
    answers: {
      A: "excess concentrated primary amine",
      B: "primary amine in inert solvent",
      C: "excess concentrated secondary amine",
      D: "secondary amine in inert solvent"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an acyl chloride into an amide (tertiary)?",
    answers: {
      A: "excess concentrated primary amine",
      B: "primary amine in inert solvent",
      C: "excess concentrated secondary amine",
      D: "secondary amine in inert solvent"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition should you use to turn an acyl chloride into a carboxylic acid?",
    answers: {
      A: "Water, heat",
      B: "Water, r.t.p",
      C: "Alcohol, heat",
      D: "Alcohol, r.t.p"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition should you use to turn an acyl chloride into an amide (primary)?",
    answers: {
      A: "excess concentrated ammonia",
      B: "ammonia in inert solvent",
      C: "excess concentrated primary amine",
      D: "limiting dilute primary amine"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition should be used to turn an acyl chloride into an ester?",
    answers: {
      A: "phenol, r.t.p",
      B: "phenol, heat",
      C: "phenoxide, r.t.p",
      D: "phenol, NaOH(aq), heat"
    },
    correctAnswer: { A: true, B: false, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkane into a halogenoalkane?",
    answers: {
      A: "HBr, UV",
      B: "HBr, r.t.p",
      C: "Br<sub>2</sub>, UV",
      D: "Br<sub>2</sub>, r.t.p"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Alkanes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkane into a halogenoalkane?",
    answers: {
      A: "HCl, UV",
      B: "HCl, r.t.p",
      C: "Cl<sub>2</sub>, UV",
      D: "Cl<sub>2</sub>, r.t.p"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Alkanes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into a halogenoalkane?",
    answers: {
      A: "Br<sub>2</sub> in CCl<sub>4</sub>",
      B: "Br<sub>2</sub>(aq)",
      C: "HBr(aq)",
      D: "NaBr"
    },
    correctAnswer: { A: true, B: true, C: false, D: true },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into a bromohydrin?",
    answers: {
      A: "Br<sub>2</sub> in CCl<sub>4</sub>",
      B: "Br<sub>2</sub>(aq)",
      C: "HBr(aq)",
      D: "NaBr"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into an alkane?",
    answers: {
      A: "H<sub>2</sub>/ Ni catalyst, heat",
      B: "H<sub>2</sub>/ Pt catalyst",
      C: "H<sub>2</sub>/ Pd catalyst",
      D: "H<sub>2</sub>(g)"
    },
    correctAnswer: { A: true, B: true, C: true, D: false },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into an alcohol?",
    answers: {
      A:
        "Cold H<sub>2</sub>SO<sub>4</sub>(conc) followed by H<sub>2</sub>O, warm",
      B:
        "Cold H<sub>2</sub>SO<sub>4</sub>(aq) followed by H<sub>2</sub>O, warm",
      C: "Hot H<sub>2</sub>SO<sub>4</sub>(conc)",
      D: "Hot H<sub>2</sub>SO<sub>4</sub>(aq)"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into a diol?",
    answers: {
      A: "Hot acidified KMnO<sub>4</sub>",
      B: "Hot alkaline KMnO<sub>4</sub>",
      C: "Cold acidified KMnO<sub>4</sub>",
      D: "Cold alkaline KMnO<sub>4</sub>"
    },
    correctAnswer: { A: false, B: false, C: true, D: true },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into a carboxylic acid?",
    answers: {
      A: "Hot acidified KMnO<sub>4</sub>",
      B: "Hot alkaline KMnO<sub>4</sub>",
      C: "Cold acidified KMnO<sub>4</sub>",
      D: "Cold alkaline KMnO<sub>4</sub>"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into a carboxylate?",
    answers: {
      A: "Hot acidified KMnO<sub>4</sub>",
      B: "Hot alkaline KMnO<sub>4</sub>",
      C: "Cold acidified KMnO<sub>4</sub>",
      D: "Cold alkaline KMnO<sub>4</sub>"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into an aldehyde?",
    answers: {
      A: "Hot acidified KMnO<sub>4</sub>",
      B: "Hot alkaline KMnO<sub>4</sub>",
      C: "Cold acidified KMnO<sub>4</sub>",
      D: "No reaction"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alkene into a ketone?",
    answers: {
      A: "Hot acidified KMnO<sub>4</sub>",
      B: "Hot alkaline KMnO<sub>4</sub>",
      C: "Cold acidified KMnO<sub>4</sub>",
      D: "Cold alkaline KMnO<sub>4</sub>"
    },
    correctAnswer: { A: true, B: true, C: false, D: false },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a terminal alkene into CO<sub>2</sub> and H<sub>2</sub>O?",
    answers: {
      A: "Hot acidified KMnO<sub>4</sub>",
      B: "Hot alkaline KMnO<sub>4</sub>",
      C: "Cold acidified KMnO<sub>4</sub>",
      D: "Cold alkaline KMnO<sub>4</sub>"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Alkenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an amide (primary) into a carboxylic acid and ammonium salt?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p",
      B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux",
      C: "NaOH(aq), r.t.p",
      D: "NaOH(aq), heat under reflux"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an amide (primary) into a carboxylate and ammonia?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p",
      B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux",
      C: "NaOH(aq), r.t.p",
      D: "NaOH(aq), heat under reflux"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an amide (secondary) into a carboxylic acid and ammonium salt?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p",
      B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux",
      C: "NaOH(aq), r.t.p",
      D: "NaOH(aq), heat under reflux"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an amide (secondary) into a carboxylate and amine?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p",
      B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux",
      C: "NaOH(aq), r.t.p",
      D: "NaOH(aq), heat under reflux"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an amine into an amide?",
    answers: {
      A: "acyl chloride, r.t.p",
      B: "acyl chloride, heat",
      C: "carboxylic acid, heat",
      D: "carboxylic acid, r.t.p"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an amine into a salt?",
    answers: {
      A: "HCl(aq)",
      B: "acyl chloride, heat",
      C: "carboxylic acid(aq), r.t.p",
      D: "carboxylic acid(aq), heat under reflux"
    },
    correctAnswer: { A: true, B: false, C: true, D: true },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an arene (alkylbenzene) into a bromobenzene?",
    answers: {
      A: "Br<sub>2</sub> in CCl<sub>4</sub>",
      B: "Br<sub>2</sub>, Fe catalyst",
      C: "Br<sub>2</sub>, FeBr<sub>3</sub> catalyst",
      D: "Br<sub>2</sub>, AlCl<sub>3</sub> catalyst"
    },
    correctAnswer: { A: false, B: true, C: true, D: true },
    topic: "Arenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an arene (alkylbenzene) into a chlorobenzene?",
    answers: {
      A: "Cl<sub>2</sub> in CCl<sub>4</sub>",
      B: "Cl<sub>2</sub>, Fe catalyst",
      C: "Cl<sub>2</sub>, FeBr<sub>3</sub> catalyst",
      D: "Cl<sub>2</sub>, AlCl<sub>3</sub> catalyst"
    },
    correctAnswer: { A: false, B: true, C: true, D: true },
    topic: "Arenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an arene (alkylbenzene) into a chloroalkane?",
    answers: {
      A: "Cl<sub>2</sub> in CCl<sub>4</sub>",
      B: "Cl<sub>2</sub>(aq)",
      C: "Cl<sub>2</sub>, UV",
      D: "Cl<sub>2</sub>, FeBr<sub>3</sub> catalyst"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Arenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an arene (alkylbenzene) into a nitrobenzene?",
    answers: {
      A: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), heat",
      B: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), cold",
      C: "HNO<sub>3</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat",
      D: "HNO<sub>3</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), cold"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Arenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an arene (alkylbenzene) into a benzoic acid?",
    answers: {
      A: "Cold acidified KMnO<sub>4</sub>",
      B: "Hot acidified KMnO<sub>4</sub>",
      C: "Cold acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>",
      D: "Hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Arenes",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a phenylamine into a <sub>2</sub>,<sub>4</sub>,<sub>6</sub>-substituted phenylamine?",
    answers: {
      A: "Br<sub>2</sub> in CCl<sub>4</sub>",
      B: "Br<sub>2</sub>(aq)",
      C: "HBr in CCl<sub>4</sub>",
      D: "HBr(aq)"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an aromatic (aldehyde) into a carboxylate?",
    answers: {
      A: "Ag<sub>2</sub>O in NH<sub>3</sub>, warm",
      B: "Cu<sub>2</sub>+, NaOH, warm",
      C: "Hot alkaline K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>",
      D: "Hot alkaline KMnO<sub>4</sub>"
    },
    correctAnswer: { A: true, B: false, C: false, D: true },
    topic: "Carbonyl Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carbonyl (aldehyde) into an alcohol?",
    answers: {
      A: "LiAlH<sub>4</sub>(aq)",
      B: "NaBH<sub>4</sub>",
      C: "LiAlH<sub>4</sub> in dry ether",
      D: "H<sub>2</sub>/ Pt catalyst"
    },
    correctAnswer: { A: false, B: true, C: true, D: true },
    topic: "Carbonyl Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carbonyl (aldehyde) into a cyanohydrin?",
    answers: {
      A: "NaCN",
      B: "HCN",
      C: "HCN with trace NaCN",
      D: "HCN with trace NaOH"
    },
    correctAnswer: { A: false, B: false, C: true, D: true },
    topic: "Carbonyl Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carbonyl (aldehyde) into a carboxylic acid?",
    answers: {
      A: "Hot acidified KMnO<sub>4</sub>",
      B: "Cold acidified KMnO<sub>4</sub>",
      C: "Hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>",
      D: "Cold acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>"
    },
    correctAnswer: { A: true, B: false, C: true, D: false },
    topic: "Carbonyl Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carbonyl (aldehyde) into an alcohol?",
    answers: {
      A: "LiAlH<sub>4</sub>(aq)",
      B: "NaBH<sub>4</sub>",
      C: "LiAlH<sub>4</sub> in dry ether",
      D: "H<sub>2</sub>/ Pt catalyst"
    },
    correctAnswer: { A: false, B: true, C: true, D: true },
    topic: "Carbonyl Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a aliphatic aldehyde into a carboxylate?",
    answers: {
      A: "Ag<sub>2</sub>O in NH<sub>3</sub>, warm",
      B: "Cu<sub>2</sub>+, NaOH, warm",
      C: "I<sub>2</sub>, NaOH, heat",
      D: "Hot alkaline KMnO<sub>4</sub>"
    },
    correctAnswer: { A: true, B: true, C: true, D: true },
    topic: "Carbonyl Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carbonyl (ketone) into an alcohol?",
    answers: {
      A: "LiAlH<sub>4</sub>(aq)",
      B: "NaBH<sub>4</sub>",
      C: "LiAlH<sub>4</sub> in dry ether",
      D: "H<sub>2</sub>/ Pt catalyst"
    },
    correctAnswer: { A: false, B: true, C: true, D: true },
    topic: "Carbonyl Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carbonyl (ketone) into a cyanohydrin?",
    answers: {
      A: "NaCN",
      B: "HCN",
      C: "HCN with trace NaCN",
      D: "HCN with trace NaOH"
    },
    correctAnswer: { A: false, B: false, C: true, D: true },
    topic: "Carbonyl Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carboxylic acid into an ester?",
    answers: {
      A: "Alcohol",
      B: "Alcohol, H<sub>2</sub>SO<sub>4</sub>(aq), heat",
      C: "Alcohol, H<sub>2</sub>SO<sub>4</sub>(conc), heat",
      D: "Phenol"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carboxylic acid into an alcohol?",
    answers: {
      A: "LiAlH<sub>4</sub>(aq)",
      B: "NaBH<sub>4</sub>",
      C: "LiAlH<sub>4</sub> in dry ether",
      D: "H<sub>2</sub>/ Pt catalyst"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carboxylic acid into a carboxylate?",
    answers: {
      A: "Na",
      B: "Na<sub>2</sub>CO<sub>3</sub>",
      C: "NaHCO<sub>3</sub>",
      D: "NaOH(aq)"
    },
    correctAnswer: { A: true, B: true, C: true, D: true },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a carboxylic acid into an acyl chloride?",
    answers: {
      A: "PCl<sub>3</sub>",
      B: "PCl<sub>5</sub>",
      C: "SOCl<sub>2</sub>",
      D: "HCl"
    },
    correctAnswer: { A: true, B: true, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn ethanedioic acid into CO<sub>2</sub> and H<sub>2</sub>O?",
    answers: {
      A: "Hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>",
      B: "Cold acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>",
      C: "Hot acidified KMnO<sub>4</sub>",
      D: "Cold acidified KMnO<sub>4</sub>"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn methanoic acid into CO<sub>2</sub> and H<sub>2</sub>O?",
    answers: {
      A: "Hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>",
      B: "Cold acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>",
      C: "Hot acidified KMnO<sub>4</sub>",
      D: "Cold acidified KMnO<sub>4</sub>"
    },
    correctAnswer: { A: true, B: false, C: true, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an ester into an alcohol and carboxylic acid?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p",
      B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux",
      C: "NaOH(aq), r.t.p",
      D: "NaOH(aq), heat under reflux"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an ester into an alcohol and carboxylate?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p",
      B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux",
      C: "NaOH(aq), r.t.p",
      D: "NaOH(aq), heat under reflux"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Carboxylic Acids and Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a halogenoalkane into an amine?",
    answers: {
      A: "limiting NH<sub>3</sub>(alc), heat",
      B: "Excess NH<sub>3</sub>(aq), heat in sealed tube",
      C: "limiting NH<sub>3</sub>(alc), heat in sealed tube",
      D: "Excess NH<sub>3</sub>(alc), heat in sealed tube"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Halogen Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a halogenoalkane into a nitrile?",
    answers: {
      A: "NaCN(alc), heat under reflux",
      B: "KCN(alc), heat under reflux",
      C: "NaCN(aq), heat under reflux",
      D: "NaCN(alc), r.t.p"
    },
    correctAnswer: { A: true, B: true, C: false, D: false },
    topic: "Halogen Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a halogenoalkane into an alkene?",
    answers: {
      A: "NaOH(alc), heat",
      B: "NaOH(alc), r.t.p",
      C: "NaOH(aq), heat",
      D: "NaOH(aq), r.t.p"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Halogen Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a halogenoalkane into an alcohol?",
    answers: {
      A: "NaOH(alc), heat",
      B: "NaOH(alc), r.t.p",
      C: "NaOH(aq), heat",
      D: "NaOH(aq), r.t.p"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Halogen Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alcohol into an ester?",
    answers: {
      A:
        "Carboxylic acid, H<sub>2</sub>SO<sub>4</sub>(conc), heat under reflux",
      B: "Carboxylic acid, r.t.p",
      C: "Acyl chloride(aq), r.t.p",
      D: "Acyl chloride in CCl<sub>4</sub>, r.t.p"
    },
    correctAnswer: { A: true, B: false, C: false, D: true },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alcohol into an alkene?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), heat",
      B: "Excess H<sub>2</sub>SO<sub>4</sub>(conc), 170 degrees",
      C: "H<sub>3</sub>PO<sub>4</sub>(aq)",
      D: "Al<sub>2</sub>O<sub>3</sub>, heat"
    },
    correctAnswer: { A: false, B: true, C: false, D: true },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alcohol into a halogenoalkane?",
    answers: {
      A: "Dry HBr, heat",
      B: "NaBr + H<sub>2</sub>SO<sub>4</sub>(conc)",
      C: "HCl(conc), anhydrous ZnCl<sub>2</sub>",
      D: "HCl"
    },
    correctAnswer: { A: true, B: true, C: true, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition might turn an alcohol into a carboxylate?",
    answers: {
      A: "I<sub>2</sub>, NaOH, heat",
      B: "Hot alkaline KMnO<sub>4</sub>, heat under reflux",
      C:
        "Hot alkaline K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, heat under reflux",
      D: "Hot acidified KMnO<sub>4</sub>, heat under reflux"
    },
    correctAnswer: { A: true, B: true, C: false, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alcohol into a ketone/carboxylic acid?",
    answers: {
      A: "I<sub>2</sub>, NaOH, heat",
      B:
        "Hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, heat under reflux",
      C:
        "Hot alkaline K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, heat under reflux",
      D: "Hot acidified KMnO<sub>4</sub>, heat under reflux"
    },
    correctAnswer: { A: false, B: true, C: false, D: true },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alcohol into an aldehyde?",
    answers: {
      A:
        "Hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, heat with immediate distillation",
      B:
        "Hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, heat under reflux",
      C: "Hot acidified KMnO<sub>4</sub>, heat with immediate distillation",
      D: "Hot acidified KMnO<sub>4</sub>, heat under reflux"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alcohol into an alkoxide?",
    answers: {
      A: "Na<sub>2</sub>CO<sub>3</sub>",
      B: "NaHCO<sub>3</sub>",
      C: "NaOH(aq)",
      D: "Na"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alcohol into a halogenoalkane?",
    answers: {
      A: "PBr<sub>3</sub>",
      B: "Br<sub>2</sub> + P",
      C: "PCl<sub>3</sub>",
      D: "PCl<sub>5</sub>"
    },
    correctAnswer: { A: true, B: true, C: true, D: true },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn an alcohol into a halogenoalkane?",
    answers: {
      A: "PBr<sub>3</sub>",
      B: "SOCl<sub>2</sub>",
      C: "Dry HI(g), heat",
      D: "I<sub>2</sub> + P"
    },
    correctAnswer: { A: true, B: true, C: true, D: true },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a phenol into an ester?",
    answers: {
      A: "Acyl chloride in CCl<sub>4</sub>, r.t.p",
      B: "Carboxylic acid, H<sub>2</sub>SO<sub>4</sub>(conc), heat with reflux",
      C: "Acyl chloride(aq), r.t.p",
      D: "Acyl chloride in CCl<sub>4</sub>, heat under reflux"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a phenol into a <sub>2</sub>,<sub>4</sub>,<sub>6</sub>-substituted bromophenol?",
    answers: {
      A: "Br<sub>2</sub> in CCl<sub>4</sub>",
      B: "Br<sub>2</sub>(aq)",
      C: "HBr in CCl<sub>4</sub>",
      D: "HBr(aq)"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a phenol into a mono-substituted bromophenol?",
    answers: {
      A: "Br<sub>2</sub> in CCl<sub>4</sub>",
      B: "Br<sub>2</sub>(aq)",
      C: "HBr in CCl<sub>4</sub>",
      D: "HBr(aq)"
    },
    correctAnswer: { A: true, B: false, C: false, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a phenol into a <sub>2</sub>,<sub>4</sub>,<sub>6</sub>-substituted nitrophenol?",
    answers: {
      A: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), heat",
      B: "Dilute HNO<sub>3</sub>",
      C: "Conc HNO<sub>3</sub>",
      D: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), cold"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a phenol into a nitrophenol?",
    answers: {
      A: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), heat",
      B: "Dilute HNO<sub>3</sub>",
      C: "Conc HNO<sub>3</sub>",
      D: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), cold"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a phenol into a phenoxide?",
    answers: {
      A: "Na<sub>2</sub>CO<sub>3</sub>",
      B: "NaHCO<sub>3</sub>",
      C: "NaOH(aq)",
      D: "Na"
    },
    correctAnswer: { A: false, B: false, C: true, D: true },
    topic: "Hydroxy Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a nitrile into an amine?",
    answers: {
      A: "LiAlH<sub>4</sub>(aq)",
      B: "LiAlH<sub>4</sub> in dry ether",
      C: "NaBH<sub>4</sub>",
      D: "H<sub>2</sub>/ Pd catalyst"
    },
    correctAnswer: { A: false, B: true, C: false, D: true },
    topic: "Halogen Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a nitrile into a carboxylic acid?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p",
      B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux",
      C: "NaOH(aq), r.t.p",
      D: "NaOH(aq), heat under reflux"
    },
    correctAnswer: { A: false, B: true, C: false, D: false },
    topic: "Halogen Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a nitrile into a carboxylate?",
    answers: {
      A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p",
      B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux",
      C: "NaOH(aq), r.t.p",
      D: "NaOH(aq), heat under reflux"
    },
    correctAnswer: { A: false, B: false, C: false, D: true },
    topic: "Halogen Derivatives",
    type: "checkbox"
  },
  {
    question:
      "Which of the following reagent and condition can turn a nitrobenzene into a phenylamine?",
    answers: {
      A: "H<sub>2</sub>/ Ni catalyst, heat",
      B: "H<sub>2</sub>/ Ni catalyst, cold",
      C: "HCl(conc) and Sn, followed by NaOH(aq)",
      D: "HCl(conc) and anhydrous ZnCl<sub>2</sub>, followed by NaOH(aq)"
    },
    correctAnswer: { A: false, B: false, C: true, D: false },
    topic: "Nitrogen Compounds",
    type: "checkbox"
  },
  {
    question:
      "Which product will be obtained when an acyl chloride reacts with an alcohol?",
    answers: { A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid" },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an acyl chloride reacts with a primary or secondary amine?",
    answers: { A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid" },
    correctAnswer: "C",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an acyl chloride reacts with ammonia",
    answers: { A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid" },
    correctAnswer: "C",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an acyl chloride reacts with water?",
    answers: { A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid" },
    correctAnswer: "D",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an acyl chloride reacts with a phenol?",
    answers: { A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid" },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an alkane reacts with Br<sub>2</sub> under UV light?",
    answers: {
      A: "Bromoalkane",
      B: "Bromobenzene",
      C: "Alkene",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Alkanes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an alkane reacts with Cl<sub>2</sub> under UV light?",
    answers: {
      A: "Chloroalkane",
      B: "Chlorobenzene",
      C: "Alkene",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Alkanes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained as the major product when an alkene is reacted with Br<sub>2</sub>(aq)?",
    answers: {
      A: "Mono-brominated alkane",
      B: "di-brominated alkane",
      C: "bromohydrin",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained as the major product when an alkene is reacted with Cl<sub>2</sub> in CCl<sub>4</sub>?",
    answers: {
      A: "Mono-chlorinated alkane",
      B: "di-chlorinated alkane",
      C: "chlorohydrin",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained as the major product when an alkene is reacted with Cl<sub>2</sub>(aq)?",
    answers: {
      A: "Mono-chlorinated alkane",
      B: "di-chlorinated alkane",
      C: "chlorohydrin",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained as the major product when an alkene is reacted with Br<sub>2</sub> in CCl<sub>4</sub>?",
    answers: {
      A: "Mono-brominated alkane",
      B: "di-brominated alkane",
      C: "bromohydrin",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an alkene is reacted with H<sub>2</sub> with Ni/Pt catalyst?",
    answers: { A: "Alkane", B: "Alkyne", C: "Alcohol", D: "No reaction" },
    correctAnswer: "A",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an alkene is reacted with cold concentrated H<sub>2</sub>SO<sub>4</sub>, followed by warming with water",
    answers: { A: "Alkane", B: "Alkyne", C: "Alcohol", D: "No reaction" },
    correctAnswer: "C",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an alkene is reacted with water with H<sub>3</sub>PO<sub>4</sub> catalyst at 70 atm, 300 degrees",
    answers: { A: "Alkane", B: "Alkyne", C: "Alcohol", D: "No reaction" },
    correctAnswer: "C",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an alkene is reacted with HBr at r.t.p?",
    answers: {
      A: "Mono-brominated alkane",
      B: "di-brominated alkane",
      C: "bromohydrin",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be obtained when an alkene is reacted with cold, diluted KMnO<sub>4</sub>?",
    answers: { A: "Alcohol", B: "Diol", C: "Carboxylic acid", D: "Ketone" },
    correctAnswer: "B",
    topic: "Alkenes",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a primary amine is added to acyl chloride?",
    answers: {
      A: "Secondary amine",
      B: "Amide",
      C: "Carboxylic acid",
      D: "Caboxylate"
    },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a secondary amine is added to acyl chloride?",
    answers: {
      A: "Secondary amine",
      B: "Amide",
      C: "Carboxylic acid",
      D: "Caboxylate"
    },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a tertiary amine is added to acyl chloride?",
    answers: {
      A: "Secondary amine",
      B: "Amide",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a primary amine is added to a carboxylic acid?",
    answers: {
      A: "Secondary amine",
      B: "Amide",
      C: "Carboxylic acid",
      D: "Caboxylate"
    },
    correctAnswer: "D",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a primary amine is added to HCl?",
    answers: {
      A: "Secondary amine",
      B: "Amide",
      C: "Alkylammonium salt",
      D: "Ammonium salt"
    },
    correctAnswer: "D",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an arene is added to Br<sub>2</sub> with AlCl<sub>3</sub> catalyst?",
    answers: {
      A: "bromobenzene",
      B: "Bromoalkene",
      C: "Bromoalkane",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an arene is added to Br<sub>2</sub> with FeBr<sub>3</sub> catalyst?",
    answers: {
      A: "bromobenzene",
      B: "Bromoalkene",
      C: "Bromoalkane",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alkylbenzene is added to Br<sub>2</sub> under UV light?",
    answers: {
      A: "bromobenzene",
      B: "Bromoalkene",
      C: "Bromoalkane",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alkylbenzene is added to Cl<sub>2</sub> under UV light?",
    answers: {
      A: "Chloroarene",
      B: "Chloroalkene",
      C: "Chloroalkane",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alkylbenzene reacts with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "Benzene",
      B: "Benzoate",
      C: "Benzoic acid",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when benzene is added to HNO<sub>3</sub>(conc) and H<sub>2</sub>SO<sub>4</sub>(conc)?",
    answers: {
      A: "Sulfobenzene",
      B: "Nitrobenzene",
      C: "Phenylamine",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an phenylamine is added to Br<sub>2</sub>(aq)?",
    answers: {
      A: "mono-substituted bromophenylamine",
      B: "tri-substituted bromophenylamine",
      C: "Bromobenzene",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Nitrogen Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is warmed with Ag<sub>2</sub>O in NH<sub>3</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Primary alcohol",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is reacted with HCN with trace NaCN?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is reacted with HCN with trace NaCN?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is reacted with HCN with trace NaOH?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is reacted with HCN with trace KOH?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is reacted with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is reacted with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is reacted with LiAlH<sub>4</sub> in dry ether?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is reacted with hot acidified NaBH<sub>4</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aliphatic aldehyde is warmed with Cu<sub>2</sub>+ and NaOH?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is warmed with Ag<sub>2</sub>O in NH<sub>3</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is heated under high pressure with H<sub>2</sub> with Pt catalyst?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is reacted with HCN with trace NaCN?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is reacted with HCN with trace KCN?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is reacted with HCN with trace NaOH?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is reacted with HCN with trace KOH?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is reacted with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is reacted with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is reacted with LiAlH<sub>4</sub> in dry ether?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is reacted with NaBH<sub>4</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an aromatic aldehyde is warmed with Cu<sub>2</sub>+ and NaOH?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is warmed with Cu<sub>2</sub>+ and NaOH?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is warmed with Ag<sub>2</sub>O in NH<sub>3</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is heated under high pressure with H<sub>2</sub> and Pt catalyst?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is reacted with HCN with trace NaCN?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is reacted with HCN with trace NaOH?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "B",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is warmed with I<sub>2</sub> and NaOH?",
    answers: {
      A: "Carboxylate (if CH<sub>3</sub> group is present)",
      B: "Carboxylic acid (if CH<sub>3</sub> group is present)",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is reacted with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is reacted with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is reacted with LiAlH<sub>4</sub> in dry ether?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a ketone is reacted with NaBH<sub>4</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carbonyl Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a carboxylic acid is reacted with an alcohol in the presence of H<sub>2</sub>SO<sub>4</sub>(conc) and heat?",
    answers: { A: "Carboxylate", B: "Ester", C: "Aldehyde", D: "No reaction" },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a carboxylic acid is reacted with LiAlH<sub>4</sub> in dry ether?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a carboxylic acid is reacted with Na?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a carboxylic acid is reacted with Na<sub>2</sub>CO<sub>3</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a carboxylic acid is reacted with NaHCO<sub>3</sub>?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a carboxylic acid is reacted with NaOH(aq)?",
    answers: {
      A: "Carboxylic acid",
      B: "Carboxylate",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Carboxylic Acids and Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with excess NH<sub>3</sub>(alc) in a sealed tube?",
    answers: {
      A: "amine",
      B: "amide",
      C: "Quaternary ammonium cation",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with limiting NH<sub>3</sub>(alc) in a sealed tube?",
    answers: {
      A: "amine",
      B: "amide",
      C: "Quaternary ammonium cation",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with excess primary amine(alc) in a sealed tube?",
    answers: {
      A: "amine",
      B: "amide",
      C: "Quaternary ammonium cation",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with limiting primary amine(alc) in a sealed tube?",
    answers: {
      A: "amine",
      B: "amide",
      C: "Quaternary ammonium cation",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with excess secondary amine(alc) in a sealed tube?",
    answers: {
      A: "amine",
      B: "amide",
      C: "Quaternary ammonium cation",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with limiting secondary amine(alc) in a sealed tube?",
    answers: {
      A: "amine",
      B: "amide",
      C: "Quaternary ammonium cation",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with excess tertiary amine(alc) in a sealed tube?",
    answers: {
      A: "amine",
      B: "amide",
      C: "Quaternary ammonium cation",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with tertiary amine(alc) in a sealed tube?",
    answers: {
      A: "amine",
      B: "amide",
      C: "Quaternary ammonium cation",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with NaCN(alc) under reflux?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "A",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is heated with KCN(alc) under reflux?",
    answers: {
      A: "Nitrile (RCN)",
      B: "cyanohydrin",
      C: "Nitrilehydrin",
      D: "Nitroalcohol"
    },
    correctAnswer: "A",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is reacted with NaOH(alc)?",
    answers: { A: "Alkene", B: "Alcohol", C: "Alkane", D: "No reaction" },
    correctAnswer: "A",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when a halogenoalkane is reacted with NaOH(aq)?",
    answers: { A: "Alkene", B: "Alcohol", C: "Alkane", D: "No reaction" },
    correctAnswer: "B",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when an alcohol is reacted with an acyl chloride at r.t.p?",
    answers: { A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid" },
    correctAnswer: "B",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when an alcohol is heated over Al<sub>2</sub>O<sub>3</sub>?",
    answers: { A: "Alkene", B: "Alcohol", C: "Alkane", D: "No reaction" },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when an alcohol is heated under reflux with a carboxylic acid with concentrated H<sub>2</sub>SO<sub>4</sub>?",
    answers: { A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid" },
    correctAnswer: "B",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when an alcohol is heated with H<sub>2</sub>SO<sub>4</sub>(conc)?",
    answers: { A: "Alkene", B: "Alcohol", C: "Alkane", D: "No reaction" },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when an alcohol is heated with dry HBr gas?",
    answers: { A: "Bromoalkane", B: "Alkene", C: "Alkane", D: "No reaction" },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when an alcohol is reacted with HCl(conc) with anhydrous ZnCl<sub>2</sub>?",
    answers: { A: "Chloroalkane", B: "Alkene", C: "Alkane", D: "No reaction" },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with I<sub>2</sub>, NaOH?",
    answers: {
      A: "Carboxylate (if CH<sub>3</sub> group is present)",
      B: "Carboxylic acid (if CH<sub>3</sub> group is present)",
      C: "Alcohol",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a primary alcohol is heated with immediate distillation with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "Carboxylate"
    },
    correctAnswer: "B",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a secondary alcohol is heated with immediate distillation with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "Carboxylate"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a tertiary alcohol is heated with immediate distillation with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a primary alcohol is heated under reflux with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "Carboxylate"
    },
    correctAnswer: "C",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a secondary alcohol is heated under reflux with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "Carboxylate"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a tertiary alcohol is heated under reflux with hot acidified K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a primary alcohol is heated under reflux with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "Carboxylate"
    },
    correctAnswer: "C",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a secondary alcohol is heated under reflux with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "Carboxylate"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product might be formed when a tertiary alcohol is heated under reflux with hot acidified KMnO<sub>4</sub>?",
    answers: {
      A: "Ketone",
      B: "Aldehyde",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with Na?",
    answers: { A: "Alkoxide", B: "Alkene", C: "Alkane", D: "No reaction" },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with Br<sub>2</sub> and P?",
    answers: {
      A: "Alkene",
      B: "Bromoalkene",
      C: "Bromoalkane",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with I<sub>2</sub> and P?",
    answers: {
      A: "Acyl iodide",
      B: "Iodialkane",
      C: "Iodoalkane",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with NaOH(aq)?",
    answers: {
      A: "Alkoxide",
      B: "Alkene",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with Na<sub>2</sub>CO<sub>3</sub>(aq)?",
    answers: {
      A: "Alkoxide",
      B: "Alkene",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when an alcohol is reacted with NaHCO<sub>3</sub>(aq)?",
    answers: {
      A: "Alkoxide",
      B: "Alkene",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with an acyl chloride?",
    answers: {
      A: "Ester",
      B: "Carboxylic acid",
      C: "Carboxylate",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with a carboxylic acid?",
    answers: {
      A: "Ester",
      B: "Carboxylic acid",
      C: "Carboxylate",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with Br<sub>2</sub>(aq)?",
    answers: {
      A: "mono-substituted bromophenol",
      B: "tri-substituted bromophenol",
      C: "bromohydrin",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with Br<sub>2</sub> in CCl<sub>4</sub>?",
    answers: {
      A: "mono-substituted bromophenol",
      B: "tri-substituted bromophenol",
      C: "bromohydrin",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with Cl<sub>2</sub>(aq)?",
    answers: {
      A: "mono-substituted chlorophenol",
      B: "tri-substituted chlorophenol",
      C: "chlorohydrin",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with Cl<sub>2</sub> in CCl<sub>4</sub>?",
    answers: {
      A: "mono-substituted chlorophenol",
      B: "tri-substituted chlorophenol",
      C: "chlorohydrin",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with conc HNO<sub>3</sub>?",
    answers: {
      A: "Nitrobenzene",
      B: "Phenylamine",
      C: "Nitrophenol",
      D: "Tri-substituted nitrophenol"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with dilute HNO<sub>3</sub>?",
    answers: {
      A: "Nitrobenzene",
      B: "Phenylamine",
      C: "Nitrophenol",
      D: "Tri-substituted nitrophenol"
    },
    correctAnswer: "C",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question: "Which product will be formed when a phenol is reacted with Na?",
    answers: {
      A: "Phenoxide",
      B: "Alkoxide",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with NaOH(aq)?",
    answers: {
      A: "Phenoxide",
      B: "Alkoxide",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "A",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with Na<sub>2</sub>CO<sub>3</sub>?",
    answers: {
      A: "Phenoxide",
      B: "Alkoxide",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product will be formed when a phenol is reacted with NaHCO<sub>3</sub>?",
    answers: {
      A: "Phenoxide",
      B: "Alkoxide",
      C: "Carboxylic acid",
      D: "No reaction"
    },
    correctAnswer: "D",
    topic: "Hydroxy Compounds",
    type: "choice"
  },
  {
    question:
      "Which product with be formed when a nitrile (RCN) reacts with H<sub>2</sub> with Pd catalyst?",
    answers: { A: "Amine", B: "Amide", C: "Ketone", D: "Nitroalkane" },
    correctAnswer: "A",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product with be formed when a nitrile (RCN) is heated with H<sub>2</sub>SO<sub>4</sub>(aq)?",
    answers: { A: "Amine", B: "Carboxylic acid", C: "Carboxylate", D: "Amide" },
    correctAnswer: "B",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product with be formed when a nitrile (RCN) reacts with LiAlH<sub>4</sub> in dry ether?",
    answers: { A: "Amine", B: "Amide", C: "Ketone", D: "Nitroalkane" },
    correctAnswer: "A",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product with be formed when a nitrile (RCN) is heated with NaOH(aq)?",
    answers: { A: "Amine", B: "Carboxylic acid", C: "Carboxylate", D: "Amide" },
    correctAnswer: "C",
    topic: "Halogen Derivatives",
    type: "choice"
  },
  {
    question:
      "Which product is formed when nitrobenzene is heated with HCl(conc) with Sn catalyst?",
    answers: {
      A: "Benzene",
      B: "Phenylamine",
      C: "Chlorobenzene",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Nitrogen Compounds",
    type: "choice"
  },
  {
    question:
      "Which product is formed when benzene is reacted with a halogenoalkane in the presence of AlCl<sub>3</sub> catalyst?",
    answers: {
      A: "Halogenobenzene",
      B: "Alkylbenzene",
      C: "Acylbenzene",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product is formed when benzene is reacted with a halogenoalkane in the presence of FeBr<sub>3</sub> catalyst?",
    answers: {
      A: "Halogenobenzene",
      B: "Alkylbenzene",
      C: "Acylbenzene",
      D: "No reaction"
    },
    correctAnswer: "B",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product is formed when benzene is reacted with an acyl chloride in the presence of AlCl<sub>3</sub> catalyst?",
    answers: {
      A: "Halogenobenzene",
      B: "Alkylbenzene",
      C: "Acylbenzene",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Arenes",
    type: "choice"
  },
  {
    question:
      "Which product is formed when benzene is reacted with an acyl chloride in the presence of FeBr<sub>3</sub> catalyst?",
    answers: {
      A: "Halogenobenzene",
      B: "Alkylbenzene",
      C: "Acylbenzene",
      D: "No reaction"
    },
    correctAnswer: "C",
    topic: "Arenes",
    type: "choice"
  }
];

// display quiz right away
createQuizButton.addEventListener("click", buildQuiz);

// on submit, show results
submitButton.addEventListener("click", showResults);

// Reload page
newQuizButton.addEventListener("click", refreshPage);

//Shuffle questions at the start
const sortedQuestions = questionBank.sort(() => Math.random() - 0.5);

//Don't shuffle questions
//const sortedQuestions = questionBank;

//console.log(sortedQuestions);
