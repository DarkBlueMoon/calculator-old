const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const eqBtn = document.querySelector(".equals");
const resultDisplay = document.getElementById("result");
const clearBtn = document.querySelector(".clear");
let operand1 = "";
let operand2 = "";
let displayOperand = 0;
let currOperator = "";
let showAnswer = false;
let clearFlag = false;
let finalCalc = false; // Potentially replacing showAnswer
// finalCalc means that = has been pressed and we are no longer calculating for this current iteration.
// Two operand vars (if something in both, update display w/ current calc)
let currentlyCalcing = true;

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (clearFlag) {
      clearDisplay();
    }
    updateDisplay(btn.textContent);
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Default case: operand1 and operand2 are empty
    if (operand1 === "") {
      operand1 = resultDisplay.value;
      currOperator = btn.textContent;
    } else if (operand1 !== "") {
      operand2 = resultDisplay.value;
      clearDisplay();
      operand1 = operate(currOperator, operand1, operand2);
      updateDisplay(operand1);
      currOperator = btn.textContent;
    }
    clearFlag = true;

    // if (operand1 !== "" && operand2 !== "") {
    //   // operand1 = resultDisplay.value;
    //   // currOperator = btn.textContent;
    //   // clearFlag = true; // clear display on next btn press
    // }
    // if (finalCalc) {
    // } else {
    //   displayOperand += parseInt(resultDisplay.value);
    //   currOperator = btn.textContent;
    //   clearFlag = true;
    // }
    // updateDisplay(displayOperand);
    // displayOperand = parseInt(resultDisplay.value);
    // currOperator = btn.textContent;
    // // resultDisplay.value = "";
    // clearFlag = true;
  });
});

eqBtn.addEventListener("click", () => {
  showAnswer = true;
  updateDisplay(
    operate(currOperator, displayOperand, parseInt(resultDisplay.value))
  );
  clearFlag = true;
});

clearBtn.addEventListener("click", resetCalc);

function updateDisplay(val) {
  if (showAnswer) {
    resultDisplay.value = val;
    showAnswer = false;
    return;
  }

  resultDisplay.value = resultDisplay.value + val;
}

function resetCalc() {
  resultDisplay.value = "";
  displayOperand = 0;
  currOperator = "";
  showAnswer = false;
  clearFlag = false;
}

function clearDisplay() {
  resultDisplay.value = "";
  clearFlag = false;
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) return "Cannot divide by Zero.";

  return Math.round((num1 / num2) * 100) / 100;
}

function operate(op, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);

  switch (op) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
    default:
      break;
  }
}
