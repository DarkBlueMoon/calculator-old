const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const eqBtn = document.querySelector(".equals");
const resultDisplay = document.getElementById("result");
const clearBtn = document.querySelector(".clear");
let displayOperand = 0;
let currOperator = "";
let showAnswer = false;
let clearFlag = false;

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    updateDisplay(btn.textContent);
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayOperand = parseInt(resultDisplay.value);
    currOperator = btn.textContent;
    resultDisplay.value = "";
  });
});

eqBtn.addEventListener("click", () => {
  showAnswer = true;
  updateDisplay(
    operate(currOperator, displayOperand, parseInt(resultDisplay.value))
  );
});

clearBtn.addEventListener("click", resetCalc);

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
