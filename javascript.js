// Global variables

var attemptNo = 0

////


function refreshPage() {
  // location.reload();
  window.location = window.location
}

// Remove local storage (test)
// window.localStorage.clear()

// Function to update the student's progress
function updateProgress(studentProgress, questionBankIndex ,newValue){

  // Replace value in student progress array
  studentProgress = [...studentProgress.slice(0,questionBankIndex),newValue, ...studentProgress.slice(questionBankIndex+1)]

  return studentProgress

}


///////// Function to get progress /////////

function getChapterProgress(progress, mastery){ //Insert student progress as variable

  var chapterList = [
    "Alkanes",
    "Alkenes",
    "Arenes",
    "Halogen Derivatives",
    "Hydroxy Compounds",
    "Carbonyl Compounds",
    "Carboxylic Acids and Derivatives",
    "Nitrogen Compounds"
  ];



  // Create an empty list (use at the end)
   var htmlArray = [`<h2 style="padding: 5px"><strong>Mastery: ${mastery}%</strong></h2>`];

   // console.log(htmlArray)

  // Loop through chapter list
    for (var idx in chapterList){

      var chapter = chapterList[idx]

      // console.log(chapterList[idx])

    // Start the count of questions
      var qn_count = 0 ;

    // Start the count of correct questions
      var correct_count = 0;

    // Loop through questionBank and see question.topic
      for (var question in questionBank){

      // Get index of the question if topic matches chapter list

        if (questionBank[question].topic == chapter){

          // + 1 count to the chapter

          qn_count++

          // Get the id of the questionBank question

          var qn_id = questionBank[question].questionID

          // Check the progress of the student by index
          
          var state = progress[qn_id] 

          // If value == 1, +1 count to correct questions

          if (state == 1){correct_count++}

        }

      }

      console.log(chapter + " " + qn_count)

      console.log("correct: " + correct_count)

      // push html into string

      var html = `<p><strong>${chapter}:</strong> ${correct_count}/${qn_count} correct</p>`

      console.log(html)

      htmlArray.push(html)

    }

  // Finally, convert the array into rows (with line break, and bold the keyword); use join""

  var htmlProgress = htmlArray.join("")


  // Set the progress display container inner html
  progressDisplayContainer.innerHTML = htmlProgress

}




///////// Function to build quiz //////////

function buildQuiz() {

  // Hide progress
  progressDisplayContainer.style.display = "none"
  progressButton.innerText = "Get Progress"

  // If no value given, alert 
  if(numberOfQuestions.value == ''){
    alert("Please key in the number of questions")
    return
  }

  // Randomise the indexes (for different quiz each time I reset)

  incorrectIndex = incorrectIndex.sort(() => Math.random() - 0.5);
  correctIndex = correctIndex.sort(() => Math.random() - 0.5);

  // Get student progress

  var studentProgress = JSON.parse(window.localStorage.getItem('progress'))
  
  console.log(studentProgress)

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

    //Set maximum to 50
    if (numberOfQuestions.value > 50) {
      numberOfQuestions.value = 50;
    }

    //Set minimum to 3
    if (numberOfQuestions.value < 1) {
      numberOfQuestions.value = 1;
    }


    // Create array of question indexes

    var questionIndexes = []

    // correctRatio = 0.2
    // incorrectRatio = 0.8

    var numberOfCorrectIndexes = Math.round(numberOfQuestions.value * 0.2)
    var numberOfIncorrectIndexes = numberOfQuestions.value - numberOfCorrectIndexes

    // console.log(numberOfIncorrectIndexes)
    // console.log(numberOfCorrectIndexes)

      // Case 1 - too little 1's
      if(correctIndex.length < numberOfCorrectIndexes){

        console.log("Not enough correct answers")

      // Append correct questions first
        for(var correctIdx = 0; correctIdx < correctIndex.length; correctIdx++){

          questionIndexes.push(correctIndex[correctIdx]);

        }

        var numberOfIncorrect = numberOfQuestions.value - correctIndex.length
        console.log(numberOfIncorrect)

      // Append incorrect questions
        for(var incorrectIdx = 0; incorrectIdx < numberOfIncorrect; incorrectIdx++){

          questionIndexes.push(incorrectIndex[incorrectIdx]);

        }


      }


      // Case 2 - too little 0's
      else if(correctIndex.length < numberOfCorrectIndexes){

        console.log("Not enough correct answers")

      // Append incorrect questions first
        for(var incorrectIdx = 0; incorrectIdx < incorrectIndex.length; incorrectIdx++){

          questionIndexes.push(incorrectIndex[incorrectIdx]);

        }

        var numberOfCorrect = numberOfQuestions.value - incorrectIndex.length
        console.log(numberOfIncorrect)

      // Append correct questions
        for(var correctIdx = 0; correctIdx < numberOfCorrect; correctIdx++){

          questionIndexes.push(correctIndex[correctIdx]);

        }



      }

      // Normal case - 80/20%
      else{

        console.log("This is a normal case")
        console.log("Correct Index:")
        console.log(correctIndex)
        console.log("Incorrect Index:")
        console.log(incorrectIndex)

        // Append incorrect answers

        for(var incorrectIdx = 0; incorrectIdx < numberOfIncorrectIndexes; incorrectIdx++){

          questionIndexes.push(incorrectIndex[incorrectIdx]);

        }

        // Append correct answers

        for(var correctIdx = 0; correctIdx < numberOfCorrectIndexes; correctIdx++){

          questionIndexes.push(correctIndex[correctIdx]);

        }

      }

    // Shuffle questionIndexes array

    questionIndexes = questionIndexes.sort(() => Math.random() - 0.5)

    console.log("Question Indexes: " + questionIndexes)

// Populate myQuestions Array

  var myQuestions = [];

  for (var q_idx in questionIndexes){

    var question_index = questionIndexes[q_idx]

    // console.log(question_index)

    myQuestions.push(questionBank[question_index])

  }

// console.log(myQuestions)

// Store questions in session storage then take it out later (or can store indexes)

console.log("Storing questions in session storage...")

window.sessionStorage.setItem('questions', JSON.stringify(myQuestions))


// End of 'IF' statement

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


  // Check if the no checkboxes are ticked
  if (chapterChoices.length == 0){
    alert("Please choose at least one chapter")

    // End the entire function
    return    
  }

  //console.log(chapterChoices);

  //filter by chapter
  var myQuestions = [];


  // Create question bank with chosen topics

  var chosenTopicsQuestions = [];

  for (var m = 0; m < questionBank.length; m++) {
    for (var chapter in chapterChoices) {
      var obj = questionBank[m];

      if (obj.topic == chapterChoices[chapter]) {
        chosenTopicsQuestions.push(obj);
      }
    }
  }

  console.log(chosenTopicsQuestions)


  //If number of questions in chosen topics < chosen number, choose max number of questions
  if (numberOfQuestions.value > chosenTopicsQuestions.length) {
    numberOfQuestions.value = chosenTopicsQuestions.length;
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

/////////// Insert code here to populate myQuestions ///////////////

// Initialise number of zeros and ones to 0

var zeroes = 0

var zero_index_array = []

var ones = 0

var one_index_array = []

for (var z = 0; z < chosenTopicsQuestions.length; z++){

  // For each question in chosen topics questions array, get their question ID
  var index = chosenTopicsQuestions[z].questionID

  // Get the state of the question (correct or incorrect/unattempted)
  var state = studentProgress[index]

  // console.log("State of question " + index + ": " + state)

  // Compare the number of incorrect to the number of states 0
  if (state == 0){
    zeroes++
    zero_index_array.push(index)
  }
  
  if (state == 1){
    ones++
    one_index_array.push(index)
  }

}

// Shuffle box zero and one_index_array
zero_index_array.sort(() => Math.random() - 0.5);
one_index_array.sort(() => Math.random() - 0.5);

// console.log("Number of 0 states: " + zeroes)
// console.log("Number of 1 states: " + ones)
// console.log("Zero array: " + zero_index_array)
// console.log("One array: " + one_index_array)

// Get the number of correct and incorrect questions to pull out

var numberOfCorrectIndexes = Math.round(numberOfQuestions.value * 0.2)
var numberOfIncorrectIndexes = numberOfQuestions.value - numberOfCorrectIndexes

console.log(numberOfCorrectIndexes)
console.log(numberOfIncorrectIndexes)

// Case 1 - Too little zeros

if (zeroes < numberOfIncorrectIndexes){

console.log("Too little zeroes")

// Add all the zeros in first

for (var zero in zero_index_array){

  myQuestions.push(questionBank[zero_index_array[0]])

}

console.log(myQuestions)

// Find the number of ones that I will need to add in

  var number_of_ones = numberOfQuestions.value - zeroes

  // console.log(number_of_ones)

  // Add in the rest of the ones
  for(var one_index = 0; one_index < number_of_ones; one_index++){

    var aa = one_index_array[one_index]
    
    console.log("qn_ID: " + aa)

    var ab = questionBank[aa]

    myQuestions.push(ab)

  }

}

// Case 2 - Too little ones

else if (ones < numberOfCorrectIndexes){

  console.log("Too little ones")

  // Add all the ones in first

  for (var one in one_index_array){

    myQuestions.push(questionBank[one_index_array[one]])

  }

  // Find the number of zeros that I will need to add in
  var number_of_zeroes = numberOfQuestions.value - ones

  // console.log(number_of_zeroes)

  // Add in the rest of the zeroes
  for(var zero_index = 0; zero_index < number_of_zeroes; zero_index++){

    var aa = zero_index_array[zero_index]
    
    console.log("qn_ID: " + aa)

    var ab = questionBank[aa]

    myQuestions.push(ab)

  }

}


// Case 3 - Normal

else{

  console.log("This is a normal case")

  // Add in ones first

  for (var bb = 0; bb < numberOfCorrectIndexes; bb++){

    var bba = one_index_array[bb]

    var bbb = questionBank[bba]

    myQuestions.push(bbb)

  }

  // Add in zeroes

  for (var bc = 0; bc < numberOfIncorrectIndexes; bc++){

    var bca = zero_index_array[bc]

    var bcb = questionBank[bca]

    myQuestions.push(bcb)

  }

}

// Shuffle myQuestions

  myQuestions.sort(() => Math.random() - 0.5);

  // console.log(myQuestions)

// Store questions in session storage then take it out later (or can store indexes)

console.log("Storing questions in session storage...")

window.sessionStorage.setItem('questions', JSON.stringify(myQuestions))


} // End of the "ELSE" statement


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

  // Show quiz container
  quizContainer.style.display = "block";

  // Show submit button
  submitButton.style.display = "block";
  
  // Hide scores
  resultsContainer.style.display = "none"
  
  // Scroll to quiz container
  quizContainer.scrollIntoView();
  
  attemptNo = 1

}





////////////// Function to show results ///////////////

function showResults() {
  
  console.log("Attempt " + attemptNo)
  
  // Hide the progress display
  progressDisplayContainer.style.display = "none"
  progressButton.innerText == "Get Progress"

  // Get student progress and questions array

  console.log("Pulling student progress")

  var studentProgress = JSON.parse(window.localStorage.getItem('progress'))

  console.log("Pulling questions from session storage...")
  
  var myQuestions = JSON.parse(window.sessionStorage.getItem('questions'))

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
        answerContainers[j].style.color = "green";
        if(attemptNo == 1){
        // Update progress (id of question, 0 = incorrect/unattempted; 1 = correct)
        var question_id = myQuestions[j].questionID
        studentProgress = updateProgress(studentProgress, question_id, 1)
          }

      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[j].style.color = "red";
        if(attemptNo == 1){
              // Update progress (id of question, 0 = incorrect/unattempted; 1 = correct)
              var question_id = myQuestions[j].questionID
              studentProgress = updateProgress(studentProgress, question_id, 0)    
        }

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
              answerContainers[j].style.color = "green";
              if(attemptNo == 1){
              // Update progress (id of question, 0 = incorrect/unattempted; 1 = correct)
              var question_id = myQuestions[j].questionID
              studentProgress = updateProgress(studentProgress, question_id, 1)    
              }
            } else {
              // color the answers red
              answerContainers[j].style.color = "red"
              if(attemptNo == 1){
              // Update progress (id of question, 0 = incorrect/unattempted; 1 = correct)
              var question_id = myQuestions[j].questionID
              studentProgress = updateProgress(studentProgress, question_id, 0)   
              }

            }
          } else {
            // color the answers red
            answerContainers[j].style.color = "red";
            if(attemptNo == 1){
              // Update progress (id of question, 0 = incorrect/unattempted; 1 = correct)
              var question_id = myQuestions[j].questionID
              studentProgress = updateProgress(studentProgress, question_id, 0)    
            }

          }
        } else {
          // color the answers red
          answerContainers[j].style.color = "red";
          if(attemptNo == 1){
              // Update progress (id of question, 0 = incorrect/unattempted; 1 = correct)
              var question_id = myQuestions[j].questionID
              studentProgress = updateProgress(studentProgress, question_id, 0)    
          }

        }
      }
      // if answer is wrong or blank
      else {
        // color the answers red
        answerContainers[j].style.color = "red";
        if(attemptNo > 1){
              // Update progress (id of question, 0 = incorrect/unattempted; 1 = correct)
              var question_id = myQuestions[j].questionID
              studentProgress = updateProgress(studentProgress, question_id, 0)    
        }

      }
    } else {
    }

    // show number of correct answers out of total
    if (numberOfQuestions.value < myQuestions.length) {

      if( numCorrect == numberOfQuestions.value){
        resultsContainer.innerHTML =
          "<h2>" +
          "Score: " +
          numCorrect +
          " out of " +
          numberOfQuestions.value +
          "<br> Great job!<br><br></h2>";
      }else{
        resultsContainer.innerHTML =
          "<h2>" +
          "Score: " +
          numCorrect +
          " out of " +
          numberOfQuestions.value +
          "<br> You can edit your answers and submit again.<br><br></h2>";
      }
    } else {

      if( numCorrect == myQuestions.length){
        resultsContainer.innerHTML = 
          "<h3 class='textsecondary'>" +
          "Attempt " + attemptNo + "<br></h3>" +
          "<h2>Score: " +
          numCorrect +
          " out of " +
          myQuestions.length +
          "<br> Great job!<br><br></h2>";
      }else{
        resultsContainer.innerHTML =
          "<h3 class='text-secondary'>" +
          "Attempt " + attemptNo + "<br></h3>" +
          "<h2>Score: " +
          numCorrect +
          " out of " +
          myQuestions.length +
          "<br> You can edit your answers and submit again.<br><br></h2>";
      }
    }
  }


// Show the results box
resultsContainer.style.display = "block";

console.log(studentProgress)

// Store new student progress array in storage 

window.localStorage.setItem('progress', JSON.stringify(studentProgress))

JSON.parse(window.localStorage.getItem('progress'))


// Scroll to the bottom of the page to show scores
window.scrollTo(0, document.body.scrollHeight);
  
  // Increment attempt number
  attemptNo++

}

//Uncheck all checkboxes

function clearAllCheckboxes(){

  var allCheckboxes = [
    "All",
    "Alkanes",
    "Alkenes",
    "Arenes",
    "Halogen Derivatives",
    "Hydroxy Compounds",
    "Carbonyl Compounds",
    "Carboxylic Acids and Derivatives",
    "Nitrogen Compounds"
  ];

for (var checkboxes in allCheckboxes){

  var checkbox = document.getElementById(allCheckboxes[checkboxes]);
  checkbox.checked = false

}

}



///// Function to initialise or reset progress tracker //////

function progressTracker(){
  
  // Hide progress
  progressDisplayContainer.style.display = "none"
  progressButton.innerText = "Get Progress"

  var reset_boolean = window.confirm('Are you sure you want to reset your progess?\nThis process cannot be undone.')

  if (reset_boolean == true){
    //Initialise an array of zeros
      const newProgress = new Array(questionBank.length).fill(0)

    //Initialise an array of ones (test)
      // const newProgress = new Array(questionBank.length).fill(1)

    // //Initialise an array of zeros and ones (test)
    //   const newProgress_0 = new Array(questionBank.length/2).fill(0)
    //   const newProgress_1 = new Array(questionBank.length/2).fill(1)
    //   const newProgress = newProgress_1.concat(newProgress_0)

      window.localStorage.setItem('progress', JSON.stringify(newProgress));
      var item = window.localStorage.getItem('progress')
      console.log("Individual Progress: " + JSON.parse(item))

      alert("Progress reset! All the best!")
  }

    }


////// Function to get progress of student //////

function getProgress(){
  
  if (studentProgress == null){
    alert("Please activate your progress tracker.")
    return
  }

  if (progressButton.innerText == "Get Progress"){

  // Get total number of questions
  var item = JSON.parse(window.localStorage.getItem('progress'))

  // Get total number of correct questions
  var ones = 0

  item.forEach((v) => (v === 1 && ones++));  

  var mastery = (ones/item.length * 100).toFixed(1)

  console.log("Number of correct answers: " + ones)

  // Show the progressDisplayContainer

  progressDisplayContainer.style.display = "block"

  // progressDisplayContainer.innerHTML = `<h2>Mastery: ${mastery}%</h2>` // Brought into function instead

  // Disappear after 3 seconds
  // setTimeout(function(){progressDisplayContainer.style.display = "none"},3000)

  // Get the progress of student by chapter
  getChapterProgress(item, mastery)

  progressButton.innerText = "Hide Progress"
    
  // Scroll to progressButton
  progressButton.scrollIntoView()

}else{

  progressButton.innerText = "Get Progress"

  // Hide progress
  progressDisplayContainer.style.display = "none"

}

}

//Variables
const quizContainer = document.getElementById("quiz");
const resultsContainer = document.getElementById("results");
const submitButton = document.getElementById("submit");
const createQuizButton = document.getElementById("createQuiz");
const numberOfQuestions = document.getElementById("numberOfQuestions");
const clearCheckboxesButton = document.getElementById("clearCheckboxes")
const progressButton = document.getElementById("mastery")
const progressDisplayContainer = document.getElementById("progress_display")
const totalNumberOfQuestions = "";



//Insert library of questions; the formating will clean everything up nicely
var questionBank = [
{question: "Which product will be obtained when an acyl chloride reacts with an alcohol?", answers: {A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 0},
{question: "Which product will be obtained when an acyl chloride reacts with a primary or secondary amine?", answers: {A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid"}, correctAnswer: "C", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 1},
{question: "Which product will be obtained when an acyl chloride reacts with ammonia?", answers: {A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid"}, correctAnswer: "C", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 2},
{question: "Which product will be obtained when an acyl chloride reacts with water?", answers: {A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid"}, correctAnswer: "D", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 3},
{question: "Which product will be obtained when an acyl chloride reacts with a phenol?", answers: {A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 4},
{question: "Which product will be obtained when an alkane reacts with Br<sub>2</sub> under UV light?", answers: {A: "Bromoalkane", B: "Bromobenzene", C: "Alkene", D: "No reaction"}, correctAnswer: "A", topic: "Alkanes", type: "choice", questionID: 5},
{question: "Which product will be obtained when an alkane reacts with Cl<sub>2</sub> under UV light?", answers: {A: "Chloroalkane", B: "Chlorobenzene", C: "Alkene", D: "No reaction"}, correctAnswer: "A", topic: "Alkanes", type: "choice", questionID: 6},
{question: "Which product will be obtained as the major product when an alkene is reacted with Br<sub>2</sub>(aq)?", answers: {A: "Mono-brominated alkane", B: "di-brominated alkane", C: "bromohydrin", D: "No reaction"}, correctAnswer: "C", topic: "Alkenes", type: "choice", questionID: 7},
{question: "Which product will be obtained as the major product when an alkene is reacted with Cl<sub>2</sub> in CCl<sub>4</sub>?", answers: {A: "Mono-chlorinated alkane", B: "di-chlorinated alkane", C: "chlorohydrin", D: "No reaction"}, correctAnswer: "B", topic: "Alkenes", type: "choice", questionID: 8},
{question: "Which product will be obtained as the major product when an alkene is reacted with Cl<sub>2</sub>(aq)?", answers: {A: "Mono-chlorinated alkane", B: "di-chlorinated alkane", C: "chlorohydrin", D: "No reaction"}, correctAnswer: "C", topic: "Alkenes", type: "choice", questionID: 9},
{question: "Which product will be obtained as the major product when an alkene is reacted with Br<sub>2</sub> in CCl<sub>4</sub>?", answers: {A: "Mono-brominated alkane", B: "di-brominated alkane", C: "bromohydrin", D: "No reaction"}, correctAnswer: "B", topic: "Alkenes", type: "choice", questionID: 10},
{question: "Which product will be obtained when an alkene is reacted with H<sub>2</sub> with Ni/Pt catalyst?", answers: {A: "Alkane", B: "Alkyne", C: "Alcohol", D: "No reaction"}, correctAnswer: "A", topic: "Alkenes", type: "choice", questionID: 11},
{question: "Which product will be obtained when an alkene is reacted with cold concentrated H<sub>2</sub>SO<sub>4</sub>, followed by warming with water", answers: {A: "Alkane", B: "Alkyne", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Alkenes", type: "choice", questionID: 12},
{question: "Which product will be obtained when an alkene is reacted with water with H<sub>3</sub>PO<sub>4</sub> catalyst at 70 atm, 300 degrees", answers: {A: "Alkane", B: "Alkyne", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Alkenes", type: "choice", questionID: 13},
{question: "Which product will be obtained when an alkene is reacted with HBr(g) at r.t.p?", answers: {A: "Mono-brominated alkane", B: "di-brominated alkane", C: "bromohydrin", D: "No reaction"}, correctAnswer: "A", topic: "Alkenes", type: "choice", questionID: 14},
{question: "Which product will be obtained when an alkene is reacted with cold KMnO<sub>4</sub>(aq) and NaOH(aq)?", answers: {A: "Alcohol", B: "Diol", C: "Carboxylic acid", D: "Ketone"}, correctAnswer: "B", topic: "Alkenes", type: "choice", questionID: 15},
{question: "Which product will be formed when a primary amine is reacted with acyl chloride?", answers: {A: "Secondary amine", B: "Amide", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 16},
{question: "Which product will be formed when a secondary amine is reacted with acyl chloride?", answers: {A: "Secondary amine", B: "Amide", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 17},
{question: "Which product will be formed when a tertiary amine is reacted with acyl chloride?", answers: {A: "Secondary amine", B: "Amide", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 18},
{question: "Which product will be formed when a primary amine is reacted with a carboxylic acid?", answers: {A: "Secondary amine", B: "Amide", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "D", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 19},
{question: "Which product will be formed when a primary amine is reacted with HCl?", answers: {A: "Secondary amine", B: "Amide", C: "Tertiary amine", D: "Ammonium salt"}, correctAnswer: "D", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 20},
{question: "Which product will be formed when an arene is reacted with Br<sub>2</sub> and AlCl<sub>3</sub> catalyst?", answers: {A: "bromobenzene", B: "Bromoalkene", C: "Bromoalkane", D: "No reaction"}, correctAnswer: "A", topic: "Arenes", type: "choice", questionID: 21},
{question: "Which product will be formed when an arene is reacted with Br<sub>2</sub> and FeBr<sub>3</sub> catalyst?", answers: {A: "bromobenzene", B: "Bromoalkene", C: "Bromoalkane", D: "No reaction"}, correctAnswer: "A", topic: "Arenes", type: "choice", questionID: 22},
{question: "Which product will be formed when an alkylbenzene is reacted with Br<sub>2</sub> under UV light?", answers: {A: "bromobenzene", B: "Bromoalkene", C: "Bromoalkane", D: "No reaction"}, correctAnswer: "C", topic: "Arenes", type: "choice", questionID: 23},
{question: "Which product will be formed when an alkylbenzene is reacted with Cl<sub>2</sub> under UV light?", answers: {A: "Chloroarene", B: "Chloroalkene", C: "Chloroalkane", D: "No reaction"}, correctAnswer: "C", topic: "Arenes", type: "choice", questionID: 24},
{question: "Which product will be formed when an ethylbenzene reacts with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "Benzene", B: "Benzoate", C: "Benzoic acid", D: "No reaction"}, correctAnswer: "C", topic: "Arenes", type: "choice", questionID: 25},
{question: "Which product will be formed when benzene is reacted with HNO<sub>3</sub>(conc) and H<sub>2</sub>SO<sub>4</sub>(conc)?", answers: {A: "Sulfobenzene", B: "Nitrobenzene", C: "Phenylamine", D: "No reaction"}, correctAnswer: "B", topic: "Arenes", type: "choice", questionID: 26},
{question: "Which product will be formed when phenylamine is reacted with Br<sub>2</sub>(aq)?", answers: {A: "mono-substituted bromophenylamine", B: "tri-substituted bromophenylamine", C: "Bromobenzene", D: "No reaction"}, correctAnswer: "B", topic: "Nitrogen Compounds", type: "choice", questionID: 27},
{question: "Which product will be formed when an aliphatic aldehyde is warmed with Ag<sub>2</sub>O in NH<sub>3</sub>?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Primary alcohol", D: "No reaction"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 28},
{question: "Which product will be formed when an aliphatic aldehyde is reacted with HCN with trace NaCN?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 29},
{question: "Which product will be formed when an aliphatic aldehyde is reacted with HCN with trace NaOH?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 30},
{question: "Which product will be formed when an aliphatic aldehyde is reacted with HCN with trace KOH?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 31},
{question: "Which product will be formed when an aliphatic aldehyde is reacted with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "A", topic: "Carbonyl Compounds", type: "choice", questionID: 32},
{question: "Which product will be formed when an aliphatic aldehyde is reacted with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "A", topic: "Carbonyl Compounds", type: "choice", questionID: 33},
{question: "Which product will be formed when an aliphatic aldehyde is reacted with LiAlH<sub>4</sub> in dry ether?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carbonyl Compounds", type: "choice", questionID: 34},
{question: "Which product will be formed when an aliphatic aldehyde is reacted with NaBH<sub>4</sub>?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carbonyl Compounds", type: "choice", questionID: 35},
{question: "Which product will be formed when an aliphatic aldehyde is warmed with Cu<sup>2+</sup> and NaOH?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 36},
{question: "Which product will be formed when an aromatic aldehyde is warmed with Ag<sub>2</sub>O in NH<sub>3</sub>?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 37},
{question: "Which product will be formed when an aromatic aldehyde is heated under high pressure with H<sub>2</sub> with Pt catalyst?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carbonyl Compounds", type: "choice", questionID: 38},
{question: "Which product will be formed when an aromatic aldehyde is reacted with HCN with trace NaCN?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 39},
{question: "Which product will be formed when an aromatic aldehyde is reacted with HCN with trace KCN?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 40},
{question: "Which product will be formed when an aromatic aldehyde is reacted with HCN with trace NaOH?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 41},
{question: "Which product will be formed when an aromatic aldehyde is reacted with HCN with trace KOH?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 42},
{question: "Which product will be formed when an aromatic aldehyde is reacted with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "A", topic: "Carbonyl Compounds", type: "choice", questionID: 43},
{question: "Which product will be formed when an aromatic aldehyde is reacted with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "A", topic: "Carbonyl Compounds", type: "choice", questionID: 44},
{question: "Which product will be formed when an aromatic aldehyde is reacted with LiAlH<sub>4</sub> in dry ether?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carbonyl Compounds", type: "choice", questionID: 45},
{question: "Which product will be formed when an aromatic aldehyde is reacted with NaBH<sub>4</sub>?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carbonyl Compounds", type: "choice", questionID: 46},
{question: "Which product will be formed when an aromatic aldehyde is warmed with Cu<sup>2+</sup> and NaOH?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "D", topic: "Carbonyl Compounds", type: "choice", questionID: 47},
{question: "Which product will be formed when a ketone is warmed with Cu<sup>2+</sup> and NaOH?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "D", topic: "Carbonyl Compounds", type: "choice", questionID: 48},
{question: "Which product will be formed when a ketone is warmed with Ag<sub>2</sub>O in NH<sub>3</sub>?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "D", topic: "Carbonyl Compounds", type: "choice", questionID: 49},
{question: "Which product will be formed when a ketone is heated under high pressure with H<sub>2</sub> and Pt catalyst?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carbonyl Compounds", type: "choice", questionID: 50},
{question: "Which product will be formed when a ketone is reacted with HCN with trace NaCN?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 51},
{question: "Which product will be formed when a ketone is reacted with HCN with trace NaOH?", answers: {A: "Nitrile (RCN)", B: "cyanohydrin", C: "Nitrilehydrin", D: "Nitroalcohol"}, correctAnswer: "B", topic: "Carbonyl Compounds", type: "choice", questionID: 52},
{question: "Which product will be formed when a methyl ketone is warmed with I<sub>2</sub> and NaOH?", answers: {A: "Carboxylate", B: "Carboxylic acid", C: "Alcohol", D: "No reaction"}, correctAnswer: "A", topic: "Carbonyl Compounds", type: "choice", questionID: 53},
{question: "Which product will be formed when a ketone is reacted with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "D", topic: "Carbonyl Compounds", type: "choice", questionID: 54},
{question: "Which product will be formed when a ketone is reacted with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "D", topic: "Carbonyl Compounds", type: "choice", questionID: 55},
{question: "Which product will be formed when a ketone is reacted with LiAlH<sub>4</sub> in dry ether?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carbonyl Compounds", type: "choice", questionID: 56},
{question: "Which product will be formed when a ketone is reacted with NaBH<sub>4</sub>?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carbonyl Compounds", type: "choice", questionID: 57},
{question: "Which product will be formed when a carboxylic acid is reacted with an alcohol in the presence of H<sub>2</sub>SO<sub>4</sub>(conc) and heat?", answers: {A: "Carboxylate", B: "Ester", C: "Aldehyde", D: "No reaction"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 58},
{question: "Which product will be formed when a carboxylic acid is reacted with LiAlH<sub>4</sub> in dry ether?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "C", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 59},
{question: "Which product will be formed when a carboxylic acid is reacted with Na?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 60},
{question: "Which product will be formed when a carboxylic acid is reacted with Na<sub>2</sub>CO<sub>3</sub>?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 61},
{question: "Which product will be formed when a carboxylic acid is reacted with NaHCO<sub>3</sub>?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 62},
{question: "Which product will be formed when a carboxylic acid is reacted with NaOH(aq)?", answers: {A: "Carboxylic acid", B: "Carboxylate", C: "Alcohol", D: "No reaction"}, correctAnswer: "B", topic: "Carboxylic Acids and Derivatives", type: "choice", questionID: 63},
{question: "Which product will be formed when a halogenoalkane is heated with excess NH<sub>3</sub>(alc) in a sealed tube?", answers: {A: "amine", B: "amide", C: "Quaternary ammonium salt", D: "No reaction"}, correctAnswer: "A", topic: "Halogen Derivatives", type: "choice", questionID: 64},
{question: "Which product will be formed when a halogenoalkane is heated with limiting NH<sub>3</sub>(alc) in a sealed tube?", answers: {A: "amine", B: "amide", C: "Quaternary ammonium salt", D: "No reaction"}, correctAnswer: "C", topic: "Halogen Derivatives", type: "choice", questionID: 65},
{question: "Which product will be formed when a halogenoalkane is heated with excess primary amine(alc) in a sealed tube?", answers: {A: "amine", B: "amide", C: "Quaternary ammonium salt", D: "No reaction"}, correctAnswer: "A", topic: "Halogen Derivatives", type: "choice", questionID: 66},
{question: "Which product will be formed when a halogenoalkane is heated with limiting primary amine(alc) in a sealed tube?", answers: {A: "amine", B: "amide", C: "Quaternary ammonium salt", D: "No reaction"}, correctAnswer: "C", topic: "Halogen Derivatives", type: "choice", questionID: 67},
{question: "Which product will be formed when a halogenoalkane is heated with excess secondary amine(alc) in a sealed tube?", answers: {A: "amine", B: "amide", C: "Quaternary ammonium salt", D: "No reaction"}, correctAnswer: "A", topic: "Halogen Derivatives", type: "choice", questionID: 68},
{question: "Which product will be formed when a halogenoalkane is heated with limiting secondary amine(alc) in a sealed tube?", answers: {A: "amine", B: "amide", C: "Quaternary ammonium salt", D: "No reaction"}, correctAnswer: "C", topic: "Halogen Derivatives", type: "choice", questionID: 69},
{question: "Which product will be formed when a halogenoalkane is heated with excess tertiary amine(alc) in a sealed tube?", answers: {A: "amine", B: "amide", C: "Quaternary ammonium salt", D: "No reaction"}, correctAnswer: "C", topic: "Halogen Derivatives", type: "choice", questionID: 70},
{question: "Which product will be formed when a halogenoalkane is heated with tertiary amine(alc) in a sealed tube?", answers: {A: "amine", B: "amide", C: "Quaternary ammonium salt", D: "No reaction"}, correctAnswer: "C", topic: "Halogen Derivatives", type: "choice", questionID: 71},
{question: "Which product will be formed when a halogenoalkane is heated with NaCN(alc) under reflux?", answers: {A: "Nitrile (RCN)", B: "Amine", C: "Amide", D: "Alcohol"}, correctAnswer: "A", topic: "Halogen Derivatives", type: "choice", questionID: 72},
{question: "Which product will be formed when a halogenoalkane is heated with KCN(alc) under reflux?", answers: {A: "Nitrile (RCN)", B: "Amine", C: "Amide", D: "Alcohol"}, correctAnswer: "A", topic: "Halogen Derivatives", type: "choice", questionID: 73},
{question: "Which product will be formed when a halogenoalkane is heated with NaOH(alc)?", answers: {A: "Alkene", B: "Alcohol", C: "Alkane", D: "No reaction"}, correctAnswer: "A", topic: "Halogen Derivatives", type: "choice", questionID: 74},
{question: "Which product will be formed when a halogenoalkane is heated with NaOH(aq)?", answers: {A: "Alkene", B: "Alcohol", C: "Alkane", D: "No reaction"}, correctAnswer: "B", topic: "Halogen Derivatives", type: "choice", questionID: 75},
{question: "Which product will be formed when an alcohol is reacted with an acyl chloride at r.t.p?", answers: {A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid"}, correctAnswer: "B", topic: "Hydroxy Compounds", type: "choice", questionID: 76},
{question: "Which product might be formed when an alcohol is heated over Al<sub>2</sub>O<sub>3</sub>?", answers: {A: "Alkene", B: "Alcohol", C: "Alkane", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 77},
{question: "Which product might be formed when an alcohol is heated under reflux with a carboxylic acid with concentrated H<sub>2</sub>SO<sub>4</sub>?", answers: {A: "Phenol", B: "Ester", C: "Amide", D: "Carboxylic acid"}, correctAnswer: "B", topic: "Hydroxy Compounds", type: "choice", questionID: 78},
{question: "Which product might be formed when an alcohol is heated with H<sub>2</sub>SO<sub>4</sub>(conc)?", answers: {A: "Alkene", B: "Alcohol", C: "Alkane", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 79},
{question: "Which product might be formed when an alcohol is heated with dry HBr gas?", answers: {A: "Bromoalkane", B: "Alkene", C: "Alkane", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 80},
{question: "Which product might be formed when an alcohol is reacted with HCl(conc) and ZnCl<sub>2</sub>?", answers: {A: "Chloroalkane", B: "Alkene", C: "Alkane", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 81},
{question: "Which product will be formed when an alcohol is reacted with I<sub>2</sub>, NaOH?", answers: {A: "Carboxylate (if CH<sub>3</sub> group is present)", B: "Carboxylic acid (if CH<sub>3</sub> group is present)", C: "Alcohol", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 82},
{question: "Which product might be formed when a primary alcohol is heated with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq) with immediate distillation?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "B", topic: "Hydroxy Compounds", type: "choice", questionID: 83},
{question: "Which product might be formed when a secondary alcohol is heated with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq) with immediate distillation?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 84},
{question: "Which product might be formed when a tertiary alcohol is heated with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq) with immediate distillation?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 85},
{question: "Which product might be formed when a primary alcohol is heated under reflux with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq)?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "C", topic: "Hydroxy Compounds", type: "choice", questionID: 86},
{question: "Which product might be formed when a secondary alcohol is heated under reflux with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq)?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 87},
{question: "Which product might be formed when a tertiary alcohol is heated under reflux with K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq)?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 88},
{question: "Which product might be formed when a primary alcohol is heated under reflux with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq)?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "C", topic: "Hydroxy Compounds", type: "choice", questionID: 89},
{question: "Which product might be formed when a secondary alcohol is heated under reflux with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq)?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "Carboxylate"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 90},
{question: "Which product might be formed when a tertiary alcohol is heated under reflux with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq)?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 91},
{question: "Which product will be formed when an alcohol is reacted with Na?", answers: {A: "Alkoxide", B: "Alkene", C: "Alkane", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 92},
{question: "Which product will be formed when an alcohol is reacted with Br<sub>2</sub> and P?", answers: {A: "Alkene", B: "Bromoalkene", C: "Bromoalkane", D: "No reaction"}, correctAnswer: "C", topic: "Hydroxy Compounds", type: "choice", questionID: 93},
{question: "Which product will be formed when an alcohol is reacted with I<sub>2</sub> and P?", answers: {A: "Acyl iodide", B: "Iodoalkene", C: "Iodoalkane", D: "No reaction"}, correctAnswer: "C", topic: "Hydroxy Compounds", type: "choice", questionID: 94},
{question: "Which product will be formed when an alcohol is reacted with NaOH(aq)?", answers: {A: "Alkoxide", B: "Alkene", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 95},
{question: "Which product will be formed when an alcohol is reacted with Na<sub>2</sub>CO<sub>3</sub>(aq)?", answers: {A: "Alkoxide", B: "Alkene", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 96},
{question: "Which product will be formed when an alcohol is reacted with NaHCO<sub>3</sub>(aq)?", answers: {A: "Alkoxide", B: "Alkene", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 97},
{question: "Which product will be formed when a phenol is reacted with an acyl chloride?", answers: {A: "Ester", B: "Carboxylic acid", C: "Carboxylate", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 98},
{question: "Which product will be formed when a phenol is reacted with a carboxylic acid?", answers: {A: "Ester", B: "Carboxylic acid", C: "Carboxylate", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 99},
{question: "Which product will be formed when a phenol is reacted with Br<sub>2</sub>(aq)?", answers: {A: "mono-substituted bromophenol", B: "tri-substituted bromophenol", C: "bromohydrin", D: "No reaction"}, correctAnswer: "B", topic: "Hydroxy Compounds", type: "choice", questionID: 100},
{question: "Which product will be formed when a phenol is reacted with Br<sub>2</sub> in CCl<sub>4</sub>?", answers: {A: "mono-substituted bromophenol", B: "tri-substituted bromophenol", C: "bromohydrin", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 101},
{question: "Which product will be formed when a phenol is reacted with Cl<sub>2</sub>(aq)?", answers: {A: "mono-substituted chlorophenol", B: "tri-substituted chlorophenol", C: "chlorohydrin", D: "No reaction"}, correctAnswer: "B", topic: "Hydroxy Compounds", type: "choice", questionID: 102},
{question: "Which product will be formed when a phenol is reacted with Cl<sub>2</sub> in CCl<sub>4</sub>?", answers: {A: "mono-substituted chlorophenol", B: "tri-substituted chlorophenol", C: "chlorohydrin", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 103},
{question: "Which product will be formed when a phenol is reacted with conc HNO<sub>3</sub>?", answers: {A: "Nitrobenzene", B: "Phenylamine", C: "Nitrophenol", D: "Tri-substituted nitrophenol"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 104},
{question: "Which product will be formed when a phenol is reacted with dilute HNO<sub>3</sub>?", answers: {A: "Nitrobenzene", B: "Phenylamine", C: "Nitrophenol", D: "Tri-substituted nitrophenol"}, correctAnswer: "C", topic: "Hydroxy Compounds", type: "choice", questionID: 105},
{question: "Which product will be formed when a phenol is reacted with Na?", answers: {A: "Phenoxide", B: "Alkoxide", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 106},
{question: "Which product will be formed when a phenol is reacted with NaOH(aq)?", answers: {A: "Phenoxide", B: "Alkoxide", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "A", topic: "Hydroxy Compounds", type: "choice", questionID: 107},
{question: "Which product will be formed when a phenol is reacted with Na<sub>2</sub>CO<sub>3</sub>?", answers: {A: "Phenoxide", B: "Alkoxide", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 108},
{question: "Which product will be formed when a phenol is reacted with NaHCO<sub>3</sub>?", answers: {A: "Phenoxide", B: "Alkoxide", C: "Carboxylic acid", D: "No reaction"}, correctAnswer: "D", topic: "Hydroxy Compounds", type: "choice", questionID: 109},
{question: "Which product with be formed when a nitrile (RCN) reacts with H<sub>2</sub> with Pd catalyst?", answers: {A: "Amine", B: "Amide", C: "Ketone", D: "Nitroalkane"}, correctAnswer: "A", topic: "Halogen Derivatives", type: "choice", questionID: 110},
{question: "Which product with be formed when a nitrile (RCN) is heated with H<sub>2</sub>SO<sub>4</sub>(aq)?", answers: {A: "Amine", B: "Carboxylic acid", C: "Carboxylate", D: "Amide"}, correctAnswer: "B", topic: "Halogen Derivatives", type: "choice", questionID: 111},
{question: "Which product with be formed when a nitrile (RCN) reacts with LiAlH<sub>4</sub> in dry ether?", answers: {A: "Amine", B: "Amide", C: "Ketone", D: "Nitroalkane"}, correctAnswer: "A", topic: "Halogen Derivatives", type: "choice", questionID: 112},
{question: "Which product with be formed when a nitrile (RCN) is heated with NaOH(aq)?", answers: {A: "Amine", B: "Carboxylic acid", C: "Carboxylate", D: "Amide"}, correctAnswer: "C", topic: "Halogen Derivatives", type: "choice", questionID: 113},
{question: "Which product will be formed when nitrobenzene is heated with HCl(conc) with Sn catalyst?", answers: {A: "Benzene", B: "Phenylamine", C: "Chlorobenzene", D: "No reaction"}, correctAnswer: "B", topic: "Nitrogen Compounds", type: "choice", questionID: 114},
{question: "Which product will be formed when benzene is reacted with a halogenoalkane in the presence of AlCl<sub>3</sub> catalyst?", answers: {A: "Halogenobenzene", B: "Alkylbenzene", C: "Acylbenzene", D: "No reaction"}, correctAnswer: "B", topic: "Arenes", type: "choice", questionID: 115},
{question: "Which product will be formed when benzene is reacted with a halogenoalkane in the presence of FeBr<sub>3</sub> catalyst?", answers: {A: "Halogenobenzene", B: "Alkylbenzene", C: "Acylbenzene", D: "No reaction"}, correctAnswer: "B", topic: "Arenes", type: "choice", questionID: 116},
{question: "Which product will be formed when benzene is reacted with an acyl chloride in the presence of AlCl<sub>3</sub> catalyst?", answers: {A: "Halogenobenzene", B: "Alkylbenzene", C: "Acylbenzene", D: "No reaction"}, correctAnswer: "C", topic: "Arenes", type: "choice", questionID: 117},
{question: "Which product will be formed when benzene is reacted with an acyl chloride in the presence of FeBr<sub>3</sub> catalyst?", answers: {A: "Halogenobenzene", B: "Alkylbenzene", C: "Acylbenzene", D: "No reaction"}, correctAnswer: "C", topic: "Arenes", type: "choice", questionID: 118},
{question: "Which product(s) might be obtained when an alkene is reacted with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "Ketone", B: "Aldehyde", C: "Carboxylic acid", D: "CO<sub>2</sub> and H<sub>2</sub>O", }, correctAnswer: {A: true, B: false, C: true, D: true}, topic: "Alkenes", type: "checkbox", questionID: 120},
{question: "Which product(s) will be formed when a primary amide is heated under reflux with dilute H<sub>2</sub>SO<sub>4</sub>?", answers: {A: "Primary ammonium salt", B: "Secondary ammonium salt ", C: "Ammonium", D: "Carboxylic acid", }, correctAnswer: {A: false, B: false, C: true, D: true}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 121},
{question: "Which product(s) will be formed when a secondary amide is heated under reflux with dilute H<sub>2</sub>SO<sub>4</sub>?", answers: {A: "Primary ammonium salt", B: "Secondary ammonium salt ", C: "Ammonium", D: "Carboxylic acid", }, correctAnswer: {A: true, B: false, C: false, D: true}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 122},
{question: "Which product(s) will be formed when a primary amide is heated under reflux with dilute NaOH?", answers: {A: "Amine", B: "Ammonia", C: "Carboxylate", D: "Carboxylic acid", }, correctAnswer: {A: false, B: true, C: true, D: false}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 123},
{question: "Which product(s) will be formed when a secondary amide is heated under reflux with dilute NaOH?", answers: {A: "Amine", B: "Ammonia", C: "Carboxylate", D: "Carboxylic acid", }, correctAnswer: {A: true, B: false, C: true, D: false}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 124},
{question: "Which product(s) will be formed when a carboxylic acid is reacted with PCl<sub>3</sub>?", answers: {A: "Acyl chloride", B: "HCl", C: "H<sub>3</sub>PO<sub>3</sub>", D: "POCl<sub>3</sub>", }, correctAnswer: {A: true, B: false, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 125},
{question: "Which product(s) will be formed when a carboxylic acid is reacted with PCl<sub>5</sub>?", answers: {A: "Acyl chloride", B: "HCl", C: "H<sub>3</sub>PO<sub>3</sub>", D: "POCl<sub>3</sub>", }, correctAnswer: {A: true, B: true, C: false, D: true}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 126},
{question: "Which product(s) will be formed when a carboxylic acid is reacted with SOCl<sub>2</sub>?", answers: {A: "Acyl chloride", B: "HCl", C: "SO<sub>2</sub>", D: "SO<sub>3</sub>", }, correctAnswer: {A: true, B: true, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 127},
{question: "Which product(s) will be formed when methanoic acid is reacted with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "CO<sub>2</sub>", B: "H<sub>2</sub>O", C: "Alcohol", D: "No reaction", }, correctAnswer: {A: true, B: true, C: false, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 128},
{question: "Which product(s) will be formed when ethanedioic acid is reacted with KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat?", answers: {A: "CO<sub>2</sub>", B: "H<sub>2</sub>O", C: "Methanoic acid", D: "No reaction", }, correctAnswer: {A: true, B: true, C: false, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 129},
{question: "Which product(s) will be formed when an ester is heated under reflux with H<sub>2</sub>SO<sub>4</sub>(aq)?", answers: {A: "Carboxylic acid", B: "Alcohol", C: "Carboxylate", D: "No reaction", }, correctAnswer: {A: true, B: true, C: false, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 130},
{question: "Which product(s) will be formed when an ester is heated under reflux with NaOH(aq)?", answers: {A: "Carboxylic acid", B: "Alcohol", C: "Carboxylate", D: "No reaction", }, correctAnswer: {A: false, B: true, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 131},
{question: "Which product will be formed when an alcohol is reacted with PCl<sub>3</sub>?", answers: {A: "Chloroalkane", B: "HCl", C: "H<sub>3</sub>PO<sub>3</sub>", D: "POCl<sub>3</sub>", }, correctAnswer: {A: true, B: false, C: true, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 132},
{question: "Which product will be formed when an alcohol is reacted with PCl<sub>5</sub>?", answers: {A: "Chloroalkane", B: "HCl", C: "H<sub>3</sub>PO<sub>3</sub>", D: "POCl<sub>3</sub>", }, correctAnswer: {A: true, B: true, C: false, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 133},
{question: "Which product will be formed when an alcohol is reacted with SOCl<sub>2</sub>?", answers: {A: "Chloroalkane", B: "HCl", C: "SO<sub>2</sub>", D: "SO<sub>3</sub>", }, correctAnswer: {A: true, B: true, C: true, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 134},
{question: "Which of the following sets of reagent and condition are suitable to turn an acyl chloride into an ester?", answers: {A: "Alcohol, heat", B: "Alcohol, heat with reflux", C: "Alcohol, warm", D: "Alcohol, r.t.p", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 135},
{question: "Which of the following sets of reagent and condition are suitable to turn an acyl chloride into an amide (secondary)?", answers: {A: "aqueous primary amine", B: "primary amine in inert solvent", C: "aqueous secondary amine", D: "secondary amine in inert solvent", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 136},
{question: "Which of the following sets of reagent and condition are suitable to turn an acyl chloride into an amide (tertiary)?", answers: {A: "aqueous primary amine", B: "primary amine in inert solvent", C: "aqueous secondary amine", D: "secondary amine in inert solvent", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 137},
{question: "Which of the following sets of reagent and condition are suitable to turn an acyl chloride into a carboxylic acid?", answers: {A: "Water, heat", B: "Water, r.t.p", C: "Alcohol, heat", D: "Alcohol, r.t.p", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 138},
{question: "Which of the following sets of reagent and condition are suitable to turn an acyl chloride into an amide (primary)?", answers: {A: "aqueous ammonia", B: "ammonia in inert solvent", C: "aqueous primary amine", D: "limiting dilute primary amine", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 139},
{question: "Which of the following sets of reagent and condition are suitable to turn an acyl chloride into an ester?", answers: {A: "phenol, r.t.p", B: "phenol, heat", C: "phenoxide, r.t.p", D: "phenol, NaOH(aq), heat", }, correctAnswer: {A: true, B: false, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 140},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkane into a halogenoalkane?", answers: {A: "HBr, UV", B: "HBr, r.t.p", C: "Br<sub>2</sub>, UV", D: "Br<sub>2</sub>, r.t.p", }, correctAnswer: {A: false, B: false, C: true, D: false}, topic: "Alkanes", type: "checkbox", questionID: 141},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkane into a halogenoalkane?", answers: {A: "HCl, UV", B: "HCl, r.t.p", C: "Cl<sub>2</sub>, UV", D: "Cl<sub>2</sub>, r.t.p", }, correctAnswer: {A: false, B: false, C: true, D: false}, topic: "Alkanes", type: "checkbox", questionID: 142},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into a halogenoalkane?", answers: {A: "Br<sub>2</sub> in CCl<sub>4</sub>", B: "HBr(aq)", C: "HBr(g)", D: "FeBr<sub>3</sub>", }, correctAnswer: {A: true, B: false, C: true, D: false}, topic: "Alkenes", type: "checkbox", questionID: 143},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into a bromohydrin?", answers: {A: "Br<sub>2</sub> in CCl<sub>4</sub>", B: "Br<sub>2</sub>(aq)", C: "HBr(aq)", D: "NaBr", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Alkenes", type: "checkbox", questionID: 144},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into an alkane?", answers: {A: "H<sub>2</sub>/ Ni catalyst, heat", B: "H<sub>2</sub>/ Pt catalyst", C: "H<sub>2</sub>/ Pd catalyst", D: "H<sub>2</sub>(g)", }, correctAnswer: {A: true, B: true, C: true, D: false}, topic: "Alkenes", type: "checkbox", questionID: 145},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into an alcohol?", answers: {A: "Cold H<sub>2</sub>SO<sub>4</sub>(conc) followed by H<sub>2</sub>O, warm", B: "Cold H<sub>2</sub>SO<sub>4</sub>(aq) followed by H<sub>2</sub>O, warm", C: "Hot H<sub>2</sub>SO<sub>4</sub>(conc)", D: "Hot H<sub>2</sub>SO<sub>4</sub>(aq)", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Alkenes", type: "checkbox", questionID: 146},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into a diol?", answers: {A: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", C: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", D: "Cold KMnO<sub>4</sub>, NaOH(aq)", }, correctAnswer: {A: false, B: false, C: true, D: true}, topic: "Alkenes", type: "checkbox", questionID: 147},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into a carboxylic acid?", answers: {A: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", C: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", D: "Cold KMnO<sub>4</sub>, NaOH(aq)", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Alkenes", type: "checkbox", questionID: 148},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into a carboxylate?", answers: {A: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", C: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", D: "Cold KMnO<sub>4</sub>, NaOH(aq)", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Alkenes", type: "checkbox", questionID: 149},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into an aldehyde?", answers: {A: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", C: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", D: "No reaction", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Alkenes", type: "checkbox", questionID: 150},
{question: "Which of the following sets of reagent and condition are suitable to turn an alkene into a ketone?", answers: {A: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", C: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", D: "Cold KMnO<sub>4</sub>, NaOH(aq)", }, correctAnswer: {A: true, B: true, C: false, D: false}, topic: "Alkenes", type: "checkbox", questionID: 151},
{question: "Which of the following sets of reagent and condition are suitable to turn a terminal alkene into CO<sub>2</sub> and H<sub>2</sub>O?", answers: {A: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", C: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", D: "Cold KMnO<sub>4</sub>, NaOH(aq)", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Alkenes", type: "checkbox", questionID: 152},
{question: "Which of the following sets of reagent and condition are suitable to turn an amide (primary) into a carboxylic acid and ammonium salt?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p", B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "NaOH(aq), r.t.p", D: "NaOH(aq), heat under reflux", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 153},
{question: "Which of the following sets of reagent and condition are suitable to turn an amide (primary) into a carboxylate and ammonia?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p", B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "NaOH(aq), r.t.p", D: "NaOH(aq), heat under reflux", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 154},
{question: "Which of the following sets of reagent and condition are suitable to turn an amide (secondary) into a carboxylic acid and ammonium salt?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p", B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "NaOH(aq), r.t.p", D: "NaOH(aq), heat under reflux", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 155},
{question: "Which of the following sets of reagent and condition are suitable to turn an amide (secondary) into a carboxylate and amine?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p", B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "NaOH(aq), r.t.p", D: "NaOH(aq), heat under reflux", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 156},
{question: "Which of the following sets of reagent and condition are suitable to turn an amine into an amide?", answers: {A: "acyl chloride, r.t.p", B: "acyl chloride, heat", C: "carboxylic acid, heat", D: "carboxylic acid, r.t.p", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 157},
{question: "Which of the following sets of reagent and condition are suitable to turn an amine into a salt?", answers: {A: "HCl(aq)", B: "acyl chloride, heat", C: "carboxylic acid(aq), r.t.p", D: "carboxylic acid(aq), heat under reflux", }, correctAnswer: {A: true, B: false, C: true, D: true}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 158},
{question: "Which of the following sets of reagent and condition are suitable to turn an arene (alkylbenzene) into a bromobenzene?", answers: {A: "Br<sub>2</sub> in CCl<sub>4</sub>", B: "Br<sub>2</sub>, Fe catalyst", C: "Br<sub>2</sub>, FeBr<sub>3</sub> catalyst", D: "Br<sub>2</sub>, AlCl<sub>3</sub> catalyst", }, correctAnswer: {A: false, B: true, C: true, D: true}, topic: "Arenes", type: "checkbox", questionID: 159},
{question: "Which of the following sets of reagent and condition are suitable to turn an arene (alkylbenzene) into a chlorobenzene?", answers: {A: "Cl<sub>2</sub> in CCl<sub>4</sub>", B: "Cl<sub>2</sub>, Fe catalyst", C: "Cl<sub>2</sub>, FeBr<sub>3</sub> catalyst", D: "Cl<sub>2</sub>, AlCl<sub>3</sub> catalyst", }, correctAnswer: {A: false, B: true, C: true, D: true}, topic: "Arenes", type: "checkbox", questionID: 160},
{question: "Which of the following sets of reagent and condition are suitable to turn an arene (alkylbenzene) into a chloroalkane?", answers: {A: "Cl<sub>2</sub> in CCl<sub>4</sub>", B: "Cl<sub>2</sub>(aq)", C: "Cl<sub>2</sub>, UV", D: "Cl<sub>2</sub>, FeBr<sub>3</sub> catalyst", }, correctAnswer: {A: false, B: false, C: true, D: false}, topic: "Arenes", type: "checkbox", questionID: 161},
{question: "Which of the following sets of reagent and condition are suitable to turn an arene (alkylbenzene) into a nitrobenzene?", answers: {A: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), heat", B: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), cold", C: "HNO<sub>3</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", D: "HNO<sub>3</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), cold", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Arenes", type: "checkbox", questionID: 162},
{question: "Which of the following sets of reagent and condition are suitable to turn an arene (alkylbenzene) into a benzoic acid?", answers: {A: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", B: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", C: "Cold K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", D: "K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Arenes", type: "checkbox", questionID: 163},
{question: "Which of the following sets of reagent and condition are suitable to turn a phenylamine into a 2,4,6-trisubstituted phenylamine?", answers: {A: "Br<sub>2</sub> in CCl<sub>4</sub>", B: "Br<sub>2</sub>(aq)", C: "HBr in CCl<sub>4</sub>", D: "HBr(aq)", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Nitrogen Compounds", type: "checkbox", questionID: 164},
{question: "Which of the following sets of reagent and condition are suitable to turn an aromatic (aldehyde) into a carboxylate?", answers: {A: "Ag<sub>2</sub>O in NH<sub>3</sub>, warm", B: "Cu<sup>2+</sup>, NaOH, warm", C: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", D: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", }, correctAnswer: {A: true, B: false, C: false, D: true}, topic: "Carbonyl Compounds", type: "checkbox", questionID: 165},
{question: "Which of the following sets of reagent and condition are suitable to turn a carbonyl (aldehyde) into an alcohol?", answers: {A: "LiAlH<sub>4</sub>(aq)", B: "NaBH<sub>4</sub>", C: "LiAlH<sub>4</sub> in dry ether", D: "H<sub>2</sub>/ Pt catalyst", }, correctAnswer: {A: false, B: true, C: true, D: true}, topic: "Carbonyl Compounds", type: "checkbox", questionID: 166},
{question: "Which of the following sets of reagent and condition are suitable to turn a carbonyl (aldehyde) into a cyanohydrin?", answers: {A: "NaCN", B: "HCN", C: "HCN with trace NaCN", D: "HCN with trace NaOH", }, correctAnswer: {A: false, B: false, C: true, D: true}, topic: "Carbonyl Compounds", type: "checkbox", questionID: 167},
{question: "Which of the following sets of reagent and condition are suitable to turn a carbonyl (aldehyde) into a carboxylic acid?", answers: {A: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", C: "K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", D: "Cold K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", }, correctAnswer: {A: true, B: false, C: true, D: false}, topic: "Carbonyl Compounds", type: "checkbox", questionID: 168},
{question: "Which of the following sets of reagent and condition are suitable to turn a carbonyl (aldehyde) into an alcohol?", answers: {A: "LiAlH<sub>4</sub>(aq)", B: "NaBH<sub>4</sub>", C: "LiAlH<sub>4</sub> in dry ether", D: "H<sub>2</sub>/ Pt catalyst", }, correctAnswer: {A: false, B: true, C: true, D: true}, topic: "Carbonyl Compounds", type: "checkbox", questionID: 169},
{question: "Which of the following sets of reagent and condition are suitable to turn an aliphatic aldehyde into a carboxylate?", answers: {A: "Ag<sub>2</sub>O in NH<sub>3</sub>, warm", B: "Cu<sup>2+</sup>, NaOH, warm", C: "2,4-DNPH", D: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", }, correctAnswer: {A: true, B: true, C: false, D: true}, topic: "Carbonyl Compounds", type: "checkbox", questionID: 170},
{question: "Which of the following sets of reagent and condition are suitable to turn a carbonyl (ketone) into an alcohol?", answers: {A: "LiAlH<sub>4</sub>(aq)", B: "NaBH<sub>4</sub>", C: "LiAlH<sub>4</sub> in dry ether", D: "H<sub>2</sub>/ Pt catalyst", }, correctAnswer: {A: false, B: true, C: true, D: true}, topic: "Carbonyl Compounds", type: "checkbox", questionID: 171},
{question: "Which of the following sets of reagent and condition are suitable to turn a carbonyl (ketone) into a cyanohydrin?", answers: {A: "NaCN", B: "HCN", C: "HCN with trace NaCN", D: "HCN with trace NaOH", }, correctAnswer: {A: false, B: false, C: true, D: true}, topic: "Carbonyl Compounds", type: "checkbox", questionID: 172},
{question: "Which of the following sets of reagent and condition are suitable to turn a carboxylic acid into an ester?", answers: {A: "Alcohol", B: "Alcohol, H<sub>2</sub>SO<sub>4</sub>(aq), heat", C: "Alcohol, H<sub>2</sub>SO<sub>4</sub>(conc), heat", D: "Phenol", }, correctAnswer: {A: false, B: false, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 173},
{question: "Which of the following sets of reagent and condition are suitable to turn a carboxylic acid into an alcohol?", answers: {A: "LiAlH<sub>4</sub>(aq)", B: "NaBH<sub>4</sub>", C: "LiAlH<sub>4</sub> in dry ether", D: "H<sub>2</sub>/ Pt catalyst", }, correctAnswer: {A: false, B: false, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 174},
{question: "Which of the following sets of reagent and condition are suitable to turn a carboxylic acid into a carboxylate?", answers: {A: "Na", B: "Na<sub>2</sub>CO<sub>3</sub>", C: "NaHCO<sub>3</sub>", D: "NaOH(aq)", }, correctAnswer: {A: true, B: true, C: true, D: true}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 175},
{question: "Which of the following sets of reagent and condition are suitable to turn a carboxylic acid into an acyl chloride?", answers: {A: "PCl<sub>3</sub>", B: "PCl<sub>5</sub>", C: "SOCl<sub>2</sub>", D: "HCl", }, correctAnswer: {A: true, B: true, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 176},
{question: "Which of the following sets of reagent and condition are suitable to turn ethanedioic acid into CO<sub>2</sub> and H<sub>2</sub>O?", answers: {A: "KMnO<sub>4</sub>(aq), NaOH(aq), heat", B: "Cold K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", C: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", D: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", }, correctAnswer: {A: false, B: false, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 177},
{question: "Which of the following sets of reagent and condition are suitable to turn methanoic acid into CO<sub>2</sub> and H<sub>2</sub>O?", answers: {A: "K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "Cold K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", C: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat", D: "Cold KMnO<sub>4</sub>, H<sub>2</sub>SO<sub>4</sub>(aq)", }, correctAnswer: {A: true, B: false, C: true, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 178},
{question: "Which of the following sets of reagent and condition are suitable to turn an ester into an alcohol and carboxylic acid?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p", B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "NaOH(aq), r.t.p", D: "NaOH(aq), heat under reflux", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 179},
{question: "Which of the following sets of reagent and condition are suitable to turn an ester into an alcohol and carboxylate?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p", B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "NaOH(aq), r.t.p", D: "NaOH(aq), heat under reflux", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Carboxylic Acids and Derivatives", type: "checkbox", questionID: 180},
{question: "Which of the following sets of reagent and condition are suitable to turn a halogenoalkane into an amine?", answers: {A: "limiting NH<sub>3</sub>(alc), heat", B: "Excess NH<sub>3</sub>(aq), heat in sealed tube", C: "limiting NH<sub>3</sub>(alc), heat in sealed tube", D: "Excess NH<sub>3</sub>(alc), heat in sealed tube", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Halogen Derivatives", type: "checkbox", questionID: 181},
{question: "Which of the following sets of reagent and condition are suitable to turn a halogenoalkane into a nitrile?", answers: {A: "NaCN(alc), heat under reflux", B: "KCN(alc), heat under reflux", C: "NaCN(aq), heat under reflux", D: "NaCN(alc), r.t.p", }, correctAnswer: {A: true, B: true, C: false, D: false}, topic: "Halogen Derivatives", type: "checkbox", questionID: 182},
{question: "Which of the following sets of reagent and condition are suitable to turn a halogenoalkane into an alkene?", answers: {A: "NaOH(alc), heat", B: "NaOH(alc), r.t.p", C: "NaOH(aq), heat", D: "NaOH(aq), r.t.p", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Halogen Derivatives", type: "checkbox", questionID: 183},
{question: "Which of the following sets of reagent and condition are suitable to turn a halogenoalkane into an alcohol?", answers: {A: "NaOH(alc), heat", B: "NaOH(alc), r.t.p", C: "NaOH(aq), heat", D: "NaOH(aq), r.t.p", }, correctAnswer: {A: false, B: false, C: true, D: false}, topic: "Halogen Derivatives", type: "checkbox", questionID: 184},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into an ester?", answers: {A: "Carboxylic acid, H<sub>2</sub>SO<sub>4</sub>(conc), heat under reflux", B: "Carboxylic acid, r.t.p", C: "Acyl chloride(aq), r.t.p", D: "Acyl chloride in CCl<sub>4</sub>, r.t.p", }, correctAnswer: {A: true, B: false, C: false, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 185},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into an alkene?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), heat", B: "Excess H<sub>2</sub>SO<sub>4</sub>(conc), 170 degrees", C: "H<sub>3</sub>PO<sub>4</sub>(aq)", D: "Al<sub>2</sub>O<sub>3</sub>, heat", }, correctAnswer: {A: false, B: true, C: false, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 186},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into a halogenoalkane?", answers: {A: "Dry HBr, heat", B: "NaBr + H<sub>2</sub>SO<sub>4</sub>(conc)", C: "HCl(conc), ZnCl<sub>2</sub>", D: "PCl<sub>3</sub>", }, correctAnswer: {A: true, B: true, C: true, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 187},
{question: "Which of the following reagent and condition might turn an alcohol into a carboxylate?", answers: {A: "I<sub>2</sub>, NaOH, heat (if -CH<sub>3</sub> group is present)", B: "KMnO<sub>4</sub>(aq), NaOH(aq), heat under reflux", C: "K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), NaOH(aq), heat under reflux", D: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", }, correctAnswer: {A: true, B: true, C: false, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 188},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into a carboxylic acid?", answers: {A: "I<sub>2</sub>, NaOH, heat", B: "K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), NaOH(aq), heat under reflux", C: "KMnO<sub>4</sub>(aq), NaOH(aq), heat under reflux", D: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 189},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into a ketone?", answers: {A: "I<sub>2</sub>, NaOH, heat", B: "K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "2,4-DNPH", D: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", }, correctAnswer: {A: false, B: true, C: false, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 190},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into an aldehyde?", answers: {A: "K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat with immediate distillation", B: "K<sub>2</sub>Cr<sub>2</sub>O<sub>7</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat with immediate distillation", D: "KMnO<sub>4</sub>(aq), H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 191},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into an alkoxide?", answers: {A: "Na<sub>2</sub>CO<sub>3</sub>", B: "NaHCO<sub>3</sub>", C: "NaOH(aq)", D: "Na", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 192},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into a halogenoalkane?", answers: {A: "PBr<sub>3</sub>", B: "Br<sub>2</sub> + P", C: "PCl<sub>3</sub>", D: "PCl<sub>5</sub>", }, correctAnswer: {A: true, B: true, C: true, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 193},
{question: "Which of the following sets of reagent and condition are suitable to turn an alcohol into a halogenoalkane?", answers: {A: "PBr<sub>3</sub>", B: "SOCl<sub>2</sub>", C: "Dry HI(g), heat", D: "I<sub>2</sub> + P", }, correctAnswer: {A: true, B: true, C: true, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 194},
{question: "Which of the following sets of reagent and condition are suitable to turn a phenol into an ester?", answers: {A: "Acyl chloride in CCl<sub>4</sub>, r.t.p", B: "Carboxylic acid, H<sub>2</sub>SO<sub>4</sub>(conc), heat with reflux", C: "Acyl chloride(aq), r.t.p", D: "Acyl chloride in CCl<sub>4</sub>, heat under reflux", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 195},
{question: "Which of the following sets of reagent and condition are suitable to turn a phenol into a 2,4,6-trisubstituted bromophenol?", answers: {A: "Br<sub>2</sub> in CCl<sub>4</sub>", B: "Br<sub>2</sub>(aq)", C: "HBr in CCl<sub>4</sub>", D: "HBr(aq)", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 196},
{question: "Which of the following sets of reagent and condition are suitable to turn a phenol into a mono-substituted bromophenol?", answers: {A: "Br<sub>2</sub> in CCl<sub>4</sub>", B: "Br<sub>2</sub>(aq)", C: "HBr in CCl<sub>4</sub>", D: "HBr(aq)", }, correctAnswer: {A: true, B: false, C: false, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 197},
{question: "Which of the following sets of reagent and condition are suitable to turn a phenol into a 2,4,6-trisubstituted nitrophenol?", answers: {A: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), heat", B: "Dilute HNO<sub>3</sub>", C: "Conc HNO<sub>3</sub>", D: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), cold", }, correctAnswer: {A: false, B: false, C: true, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 198},
{question: "Which of the following sets of reagent and condition are suitable to turn a phenol into 4-nitrophenol?", answers: {A: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), heat", B: "Dilute HNO<sub>3</sub>", C: "Conc HNO<sub>3</sub>", D: "HNO<sub>3</sub>(conc), H<sub>2</sub>SO<sub>4</sub>(conc), cold", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 199},
{question: "Which of the following sets of reagent and condition are suitable to turn a phenol into a phenoxide?", answers: {A: "Na<sub>2</sub>CO<sub>3</sub>", B: "NaHCO<sub>3</sub>", C: "NaOH(aq)", D: "Na", }, correctAnswer: {A: false, B: false, C: true, D: true}, topic: "Hydroxy Compounds", type: "checkbox", questionID: 200},
{question: "Which of the following sets of reagent and condition are suitable to turn a nitrile into an amine?", answers: {A: "LiAlH<sub>4</sub>(aq)", B: "LiAlH<sub>4</sub> in dry ether", C: "NaBH<sub>4</sub>", D: "H<sub>2</sub>/ Pd catalyst", }, correctAnswer: {A: false, B: true, C: false, D: true}, topic: "Halogen Derivatives", type: "checkbox", questionID: 201},
{question: "Which of the following sets of reagent and condition are suitable to turn a nitrile into a carboxylic acid?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p", B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "NaOH(aq), r.t.p", D: "NaOH(aq), heat under reflux", }, correctAnswer: {A: false, B: true, C: false, D: false}, topic: "Halogen Derivatives", type: "checkbox", questionID: 202},
{question: "Which of the following sets of reagent and condition are suitable to turn a nitrile into a carboxylate?", answers: {A: "H<sub>2</sub>SO<sub>4</sub>(aq), r.t.p", B: "H<sub>2</sub>SO<sub>4</sub>(aq), heat under reflux", C: "NaOH(aq), r.t.p", D: "NaOH(aq), heat under reflux", }, correctAnswer: {A: false, B: false, C: false, D: true}, topic: "Halogen Derivatives", type: "checkbox", questionID: 203},
];


//////////////// Calculations ///////////////////

console.log("Number of questions: " + questionBank.length)

var fullQuestionIndexArray = Array.from(Array(questionBank.length).keys())

// console.log(fullQuestionIndexArray)

// Get the student's progress

var studentProgress = JSON.parse(window.localStorage.getItem('progress'))

if(studentProgress != null){

console.log("Student Progress: " + studentProgress)

// Initialise a blank array for correct and incorrect progress
  var correctIndex = []
  var incorrectIndex = []

for (var index = 0; index < questionBank.length; index++){

  if (studentProgress[index] == 0){

    // console.log(index + ": " + studentProgress[index])

    incorrectIndex.push(index);

  } else{

    correctIndex.push(index)
  }

}

// // Randomise the indexes // Shifted this into buildQuiz function

// incorrectIndex = incorrectIndex.sort(() => Math.random() - 0.5);
// correctIndex = correctIndex.sort(() => Math.random() - 0.5);

// console.log("Shuffled incorrect index:\n" + incorrectIndex)
// console.log("Shuffled correct index:\n" + correctIndex)

////////////////////////////////////////////////


// display quiz right away
createQuizButton.addEventListener("click", buildQuiz);

// on submit, show results
submitButton.addEventListener("click", showResults);


// Start page at the top

window.scrollTo(0,0)

} else {
  
  // alert("Please activate your progress tracker.")
  
  // Auto-activate progress tracker
  
  //Initialise an array of zeros
      const newProgress = new Array(questionBank.length).fill(0)

      window.localStorage.setItem('progress', JSON.stringify(newProgress));
      var item = window.localStorage.getItem('progress')
      console.log("Individual Progress: " + JSON.parse(item))
  
      refreshPage()
  
  // console.log(studentProgress)
  
  alert("Welcome! Please read the instructions before starting")
  
}


// // Clear all local storage (for testing)
// window.localStorage.clear()

// console.log(studentProgress)
