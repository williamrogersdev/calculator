//create variable to store the running count of numbers being clicked
let inputVal = "0";
//variable for what the screen is going to display
const screen = document.querySelector(".screen");

//running total
let runningTotal = 0;

//previous operator var
let previousOperator;

//every button that is clicked here wll show up
function buttonClick(value) {
  //   console.log(value);
  //check if value is a symbol
  if (isNaN(parseInt(value))) {
    handleSymbol(value);
  } else {
    handleNumber(value);
  }
  //everytime someone clicks the button call rerender
  rerender();
}

//function to handle what to do if value is a number
function handleNumber(number) {
  //   console.log("number");

  if (inputVal === "0") {
    inputVal = number;
  } else {
    inputVal += number;
  }
  //   console.log(inputVal);
}

//function to handle all math operations
function handleMath(value) {
  if (inputVal === "0") {
    //do nothing
    return;
  }

  const intInput = parseInt(inputVal);
  if (runningTotal === 0) {
    runningTotal = intInput;
  } else {
    flushOperation(intInput);
  }

  previousOperator = value;
  inputVal = "0";
  console.log(runningTotal);
}

function flushOperation(intInput) {
  if (previousOperator === "+") {
    runningTotal += intInput;
  } else if (previousOperator === "-") {
    runningTotal -= intInput;
  } else if (previousOperator === "×") {
    runningTotal *= intInput;
  } else if (previousOperator === "÷") {
    runningTotal /= intInput;
  }
}

//function to handle what to do when value is a symbol
function handleSymbol(symbol) {
  //   console.log("symbol");
  //switch(bunch of if statements) for when each symbol is clicked
  switch (symbol) {
    case "C":
      inputVal = "0";
      break;
    case "=":
      if (previousOperator === null) {
        return;
      }

      flushOperation(parseInt(inputVal));

      previousOperator = null;
      inputVal = "" + runningTotal;
      runningTotal = 0;

      break;
    case "←":
      console.log("backarrow");
      if (inputVal.length === 1) {
        inputVal = "0";
      } else {
        inputVal = inputVal.substring(0, inputVal.length - 1);
      }
      break;
    case "+":
    case "-":
    case "÷":
    case "×":
      //   console.log("math sym");
      handleMath(symbol);

      break;
  }
}

function init() {
  document
    .querySelector(".calc-buttons")
    .addEventListener("click", function (event) {
      buttonClick(event.target.innerText);
    });
}

//function to rerender fincalCount whenever we want
//anytime rerend is called it will make finalCount and screen be the same thing
function rerender() {
  screen.innerText = inputVal;
}

init();
