// general variables
let firstNumber = 0;
let secondNumber = 0;
let operator = "";
const display = document.querySelector(".display");

// C button
const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener("click", () => {
  firstNumber = 0;
  secondNumber = 0;
  operator = "";
  display.textContent = "";
  dotBtn.addEventListener("click", dotClick);
  undoBtn.addEventListener("click", undoClick);
});

// Undo (U) button
function undoClick() {
  const undo = display.textContent.split("").slice(0, -1).join("");
  return (display.textContent = undo);
}

const undoBtn = document.querySelector(".undo");
undoBtn.addEventListener("click", undoClick);

// operator buttons
// add button
const addBtn = document.querySelector(".addBtn");
addBtn.addEventListener("click", () => {
  // if user previously clicked "="
  if (display.textContent.match(/[-+*/]/) && display.textContent.match(/[=]/)) {
    display.textContent = `${firstNumber}`;
    // if user is chaining operations
  } else if (display.textContent.match(/(-?\d+)\s*([-+*\/])\s*(-?\d+)/)) {
    calculation = display.textContent.split(/(-?\d+)\s*([-+*\/])\s*(-?\d+)/);
    secondNumber = +calculation[3];
    firstNumber = `${operate(firstNumber, operator, secondNumber)
      .toFixed(3)
      .replace(/\.?0+$/, "")}`;
    display.textContent = `${firstNumber}`;
  }
  // user's first operation
  undoBtn.addEventListener("click", undoClick);
  dotBtn.addEventListener("click", dotClick); // used to limit "." to 1 per number
  firstNumber = +display.textContent;
  operator = "+";
  display.textContent += addBtn.textContent;
});

// subtract button
const subtractBtn = document.querySelector(".subtractBtn");
subtractBtn.addEventListener("click", () => {
  if (display.textContent.match(/[-+*/]/) && display.textContent.match(/[=]/)) {
    display.textContent = `${firstNumber}`;
  } else if (display.textContent.match(/(-?\d+)\s*([-+*\/])\s*(-?\d+)/)) {
    calculation = display.textContent.split(/(-?\d+)\s*([-+*\/])\s*(-?\d+)/);
    secondNumber = +calculation[3];
    firstNumber = `${operate(firstNumber, operator, secondNumber)
      .toFixed(3)
      .replace(/\.?0+$/, "")}`;
    display.textContent = `${firstNumber}`;
  }
  undoBtn.addEventListener("click", undoClick);
  dotBtn.addEventListener("click", dotClick);
  firstNumber = +display.textContent;
  operator = "-";
  display.textContent += subtractBtn.textContent;
});

// multiply button
const multiplyBtn = document.querySelector(".multiplyBtn");
multiplyBtn.addEventListener("click", () => {
  if (display.textContent.match(/[-+*/]/) && display.textContent.match(/[=]/)) {
    display.textContent = `${firstNumber}`;
  } else if (display.textContent.match(/(-?\d+)\s*([-+*\/])\s*(-?\d+)/)) {
    calculation = display.textContent.split(/(-?\d+)\s*([-+*\/])\s*(-?\d+)/);
    secondNumber = +calculation[3];
    firstNumber = `${operate(firstNumber, operator, secondNumber)
      .toFixed(3)
      .replace(/\.?0+$/, "")}`;
    display.textContent = `${firstNumber}`;
  }
  undoBtn.addEventListener("click", undoClick);
  dotBtn.addEventListener("click", dotClick);
  firstNumber = +display.textContent;
  operator = "*";
  display.textContent += multiplyBtn.textContent;
});

// divide button
const divideBtn = document.querySelector(".divideBtn");
divideBtn.addEventListener("click", () => {
  if (display.textContent.match(/[-+*/]/) && display.textContent.match(/[=]/)) {
    display.textContent = `${firstNumber}`;
  } else if (display.textContent.match(/(-?\d+)\s*([-+*\/])\s*(-?\d+)/)) {
    calculation = display.textContent.split(/(-?\d+)\s*([-+*\/])\s*(-?\d+)/);
    secondNumber = +calculation[3];
    firstNumber = `${operate(firstNumber, operator, secondNumber)
      .toFixed(3)
      .replace(/\.?0+$/, "")}`;
    display.textContent = `${firstNumber}`;
  }
  undoBtn.addEventListener("click", undoClick);
  dotBtn.addEventListener("click", dotClick);
  firstNumber = +display.textContent;
  operator = "/";
  display.textContent += divideBtn.textContent;
});

// equal button
const equalBtn = document.querySelector(".equalBtn");
equalBtn.addEventListener("click", () => {
  calculation = display.textContent.split(
    /(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/
  );
  secondNumber = +calculation[3];
  console.log(calculation);
  console.log(secondNumber);
  if (secondNumber === 0) {
    return (display.textContent = "You know better.");
  }
  dotBtn.removeEventListener("click", dotClick);
  undoBtn.removeEventListener("click", undoClick);
  display.textContent += ` ${equalBtn.textContent} ${operate(
    firstNumber,
    operator,
    secondNumber
  )
    .toFixed(3)
    .replace(/\.?0+$/, "")}`;
  firstNumber = +`${operate(firstNumber, operator, secondNumber)
    .toFixed(3)
    .replace(/\.?0+$/, "")}`;
});

// "." dot button
function dotClick() {
  display.textContent += dotBtn.textContent;
  dotBtn.removeEventListener("click", dotClick); // only one "." per number
}
const dotBtn = document.querySelector(".dotBtn");
dotBtn.addEventListener("click", dotClick);

// digit buttons
const buttons = document.querySelectorAll(".btn");
buttons.forEach((button) => {
  button.addEventListener("click", () => {
    display.textContent += button.textContent;
  });
});

// takes 3 arguments and works based on the operator used
function operate(firstNumber, operator, secondNumber) {
  if (operator === "+") {
    return add(firstNumber, secondNumber);
  }
  if (operator === "-") {
    return subtract(firstNumber, secondNumber);
  }
  if (operator === "*") {
    return multiply(firstNumber, secondNumber);
  }
  if (operator === "/") {
    return divide(firstNumber, secondNumber);
  }
  return "Invalid operation, please try again";
}

// 4 basic numeric functions:
// add
function add(...numbers) {
  return numbers.reduce((total, number) => (total += number), 0);
}
// subtract
function subtract(...numbers) {
  return numbers.reduce((total, number) => (total -= number));
}
// multiply
function multiply(...numbers) {
  return numbers.reduce((total, number) => (total *= number), 1);
}
// divide
function divide(...numbers) {
  return numbers.reduce((total, number) => (total /= number));
}

// keyboard support
// equal operator
window.addEventListener("keydown", (e) => {
  if (e.key === "=" || e.key === "Enter") {
    calculation = display.textContent.split(
      /(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/
    );
    secondNumber = +calculation[3];
    if (secondNumber === 0) {
      display.textContent = "You know better";
    }
    dotBtn.removeEventListener("click", dotClick);
    undoBtn.removeEventListener("click", undoClick);
    display.textContent += ` ${equalBtn.textContent} ${operate(
      firstNumber,
      operator,
      secondNumber
    )
      .toFixed(3)
      .replace(/\.?0+$/, "")}`;
    firstNumber = +`${operate(firstNumber, operator, secondNumber)
      .toFixed(3)
      .replace(/\.?0+$/, "")}`;

    // add operator
  } else if (e.key === "+") {
    if (
      display.textContent.match(/[-+*/]/) &&
      display.textContent.match(/[=]/)
    ) {
      display.textContent = `${firstNumber}`;
    } else if (
      display.textContent.match(/(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/)
    ) {
      calculation = display.textContent.split(
        /(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/
      );
      secondNumber = +calculation[3];
      firstNumber = `${operate(firstNumber, operator, secondNumber)
        .toFixed(3)
        .replace(/\.?0+$/, "")}`;
      display.textContent = `${firstNumber}`;
    }
    undoBtn.addEventListener("click", undoClick);
    dotBtn.addEventListener("click", dotClick); // used to limit "." to 1 per number
    firstNumber = +display.textContent;
    operator = "+";
    display.textContent += addBtn.textContent;
    // subtract operator
  } else if (e.key === "-") {
    if (
      display.textContent.match(/[-+*/]/) &&
      display.textContent.match(/[=]/)
    ) {
      display.textContent = `${firstNumber}`;
    } else if (
      display.textContent.match(/(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/)
    ) {
      calculation = display.textContent.split(
        /(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/
      );
      secondNumber = +calculation[3];
      firstNumber = `${operate(firstNumber, operator, secondNumber)
        .toFixed(3)
        .replace(/\.?0+$/, "")}`;
      display.textContent = `${firstNumber}`;
    }
    undoBtn.addEventListener("click", undoClick);
    dotBtn.addEventListener("click", dotClick);
    firstNumber = +display.textContent;
    operator = "-";
    display.textContent += subtractBtn.textContent;
    // multiply operator
  } else if (e.key === "*") {
    if (
      display.textContent.match(/[-+*/]/) &&
      display.textContent.match(/[=]/)
    ) {
      display.textContent = `${firstNumber}`;
    } else if (
      display.textContent.match(/(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/)
    ) {
      calculation = display.textContent.split(
        /(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/
      );
      secondNumber = +calculation[3];
      firstNumber = `${operate(firstNumber, operator, secondNumber)
        .toFixed(3)
        .replace(/\.?0+$/, "")}`;
      display.textContent = `${firstNumber}`;
    }
    undoBtn.addEventListener("click", undoClick);
    dotBtn.addEventListener("click", dotClick);
    firstNumber = +display.textContent;
    operator = "*";
    display.textContent += multiplyBtn.textContent;
    // divide operator
  } else if (e.key === "/") {
    if (
      display.textContent.match(/[-+*/]/) &&
      display.textContent.match(/[=]/)
    ) {
      display.textContent = `${firstNumber}`;
    } else if (
      display.textContent.match(/(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/)
    ) {
      calculation = display.textContent.split(
        /(-?\d*\.?\d+)\s*([-+*\/])\s*(-?\d*\.?\d+)/
      );
      secondNumber = +calculation[3];
      firstNumber = `${operate(firstNumber, operator, secondNumber)
        .toFixed(3)
        .replace(/\.?0+$/, "")}`;
      display.textContent = `${firstNumber}`;
    }
    undoBtn.addEventListener("click", undoClick);
    dotBtn.addEventListener("click", dotClick);
    firstNumber = +display.textContent;
    operator = "/";
    display.textContent += divideBtn.textContent;
    // 1-9 digits
  } else if (/[\d]/.test(e.key)) {
    display.textContent += e.key;
    // clear button
  } else if (e.key === "c") {
    firstNumber = 0;
    secondNumber = 0;
    operator = "";
    display.textContent = "";
    dotBtn.addEventListener("click", dotClick);
    undoBtn.addEventListener("click", undoClick);
    // dot button
  } else if (e.key === ".") {
    dotBtn.removeEventListener("click", dotClick);
    display.textContent += dotBtn.textContent;
    // undo button
  } else if (e.key === "Backspace" || e.key === "u") {
    undoClick();
  }
});
