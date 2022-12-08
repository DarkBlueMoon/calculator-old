const numberBtns = document.querySelectorAll(".number");
const operatorBtns = document.querySelectorAll(".operator");
const eqBtn = document.querySelector(".equals");
const resultDisplay = document.getElementById("result");
const clearBtn = document.querySelector(".clear");

let operand1 = "";
let operand2 = "";
let currOperator = "";
let showAnswer = false;
let clearFlag = false;
let finalCalc = false; // Potentially replacing showAnswer

numberBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (clearFlag) {
      clearDisplay();
    }

    if (finalCalc) {
      resetCalc();
    }

    updateDisplay(btn.textContent);
  });
});

operatorBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (operand1 === "") {
      operand1 = resultDisplay.value;
      currOperator = btn.textContent;
    } else if (operand1 !== "") {
      evalAndDisplayCurrCalc();
      currOperator = btn.textContent;
    }
    clearFlag = true;
  });
});

eqBtn.addEventListener("click", () => {
  if (operand1 === "" && operand2 === "" && currOperator === "") {
    alert(
      "Valid operation is (number1) (operator) (number2). One of these were missing."
    );
    resetCalc();
    return;
  }
  evalAndDisplayCurrCalc();
  finalCalc = true;
  clearFlag = true;
});

clearBtn.addEventListener("click", resetCalc);

function evalAndDisplayCurrCalc() {
  operand2 = resultDisplay.value;
  clearDisplay();
  operand1 = operate(currOperator, operand1, operand2);
  updateDisplay(operand1);
}

// TODO: Prevent numbers from going beyond input's maxlength.
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
  operand1 = "";
  operand2 = "";
  currOperator = "";
  showAnswer = false;
  clearFlag = false;
  finalCalc = false;
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

  return Math.round((num1 / num2) * 1000) / 1000;
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
