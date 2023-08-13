let firstNumber;
let secondNumber;
let operation;
let numbers = document.querySelectorAll('.numbers');
let inputScreen = document.querySelector('.input-screen');
let outputScreen = document.querySelector('.output-screen span');
let clearEntryButton = document.querySelector('#clear-entry');
let clearButton = document.querySelector('#clear');
let basicOperators = document.querySelectorAll('.basic-operators');
let equalButton = document.querySelector('.equals');

const add = (firstNum, secondNum) => {
  return firstNum + secondNum;
};

const subtract = (firstNum, secondNum) => {
  return firstNum - secondNum;
};

const multiply = (firstNum, secondNum) => {
  return firstNum * secondNum;
};

const divide = (firstNum, secondNum) => {
  return firstNum / secondNum;
};

const operate = (firstNum, secondNum, operation) => {
  if (operation === '+') {
    return add(firstNum, secondNum);
  } else if (operation === '-') {
    return subtract(firstNum, secondNum);
  } else if (operation.charCodeAt() === 215) {
    return multiply(firstNum, secondNum);
  } else if (operation.charCodeAt() === 247) {
    return divide(firstNum, secondNum);
  }
};

const inputNumber = (e) => {
  if (
    inputScreen.textContent === '0' ||
    inputScreen.classList.contains('temporary') ||
    inputScreen.classList.contains('result')
  ) {
    if (inputScreen.classList.contains('temporary')) {
      // The class must be removed so that the next digit doesn't overwrite the previous one.
      // Refer to comment on line 83 for the reason
      inputScreen.classList.remove('temporary');
    } else if (inputScreen.classList.contains('result')) {
      // The output screen must be cleared so that it doesn't interfere with your next calculation
      outputScreen.textContent = '';
      // The class must be removed so that the next digit doesn't overwrite the previous one.
      // Refer to comment on line 129 for the reason
      inputScreen.classList.remove('result');
    }
    // Replaces the original zero on the calculator so you can start entering your input
    inputScreen.textContent = e.target.textContent;
  } else if (inputScreen.textContent.length < 13) {
    // Appends the inputted digit to the end of the number
    inputScreen.textContent = `${inputScreen.textContent}${e.target.textContent}`;
  }
};

const chooseOperator = (e) => {
  if (
    outputScreen.textContent === '' ||
    inputScreen.classList.contains('temporary') ||
    inputScreen.classList.contains('result')
  ) {
    if (inputScreen.classList.contains('temporary')) {
      number = outputScreen.textContent.slice(0, -2);
      // Replace original operator with the new inputted operator
      outputScreen.textContent = `${number} ${e.target.textContent}`;
      inputScreen.classList.remove('temporary');
    } else if (inputScreen.classList.contains('result')) {
      // Sends the inputted number and operation to the output screen so you can enter the second number
      outputScreen.textContent = `${inputScreen.textContent} ${e.target.textContent}`;
      inputScreen.classList.remove('result');
    } else {
      outputScreen.textContent = `${inputScreen.textContent} ${e.target.textContent}`;
    }
    // The temporary class makes the displayed text overwritten by your next digit input
    inputScreen.classList.add('temporary');
  } else {
    firstNumber = outputScreen.textContent.slice(0, -2); // Obtains number from the output screen
    operation = outputScreen.textContent.slice(-1); // Obtains operator from the output screen
    secondNumber = inputScreen.textContent;
    outputScreen.textContent = `${
      operate(+firstNumber, +secondNumber, operation).toPrecision(13) / 1
    } ${e.target.textContent}`; // Sends result and new operator when performing consecutive operations
    inputScreen.textContent = outputScreen.textContent.slice(0, -2);
    inputScreen.classList.add('temporary');
  }
};

const clearEntry = () => {
  if (inputScreen.classList.contains('result')) {
    outputScreen.textContent = '';
  }
  inputScreen.textContent = '0';
};

const clear = () => {
  inputScreen.textContent = '0';
  outputScreen.textContent = '';
};

const showResult = (e) => {
  if (!inputScreen.classList.contains('result')) {
    if (inputScreen.classList.contains('temporary')) {
      inputScreen.classList.remove('temporary');
    }

    if (outputScreen.textContent === '') {
      // This prevents errors if they don;t input an operation i.e displays that 5 = 5
      outputScreen.textContent = `${inputScreen.textContent} ${e.target.textContent}`;
    } else {
      firstNumber = outputScreen.textContent.slice(0, -2);
      operation = outputScreen.textContent.slice(-1);
      secondNumber = inputScreen.textContent;
      // Displays "<firstNumber> <operation> <secondNumber> = " in the output screen
      outputScreen.textContent = `${firstNumber} ${operation} ${secondNumber} ${e.target.textContent}`;
      // Displays result rounded to the 13 digits
      inputScreen.textContent = `${
        operate(+firstNumber, +secondNumber, operation).toPrecision(13) / 1
      }`;
    }
    // The result class makes your next digit input clear your screen and overwrite the result of the displayed calculation
    inputScreen.classList.add('result');
  }
};

numbers.forEach((number) => {
  number.addEventListener('click', inputNumber);
});

basicOperators.forEach((operator) => {
  operator.addEventListener('click', chooseOperator);
});

clearEntryButton.addEventListener('click', clearEntry);
clearButton.addEventListener('click', clear);
equalButton.addEventListener('click', showResult);
