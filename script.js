// starting by adding the selectors
const keypadButtons = Array.from(document.querySelectorAll('.keypad'));
const equationButtons = Array.from(document.querySelectorAll('.equation'));
const equalsButton = document.querySelector('.equals-button');
const inputDisplay = document.querySelector('number-display');

// adding the click event listener function
const addClickListenser = (element, callback) => {
    return element.addEventListener('click', callback);
};

// master input
let input = '';


// creating some pure functions


const makeNegative =(input) => {
    return -input;
};

const add = (num1, num2) => {
    return num1 + num2;
};

const subtract = (num1, num2) => {
    return num1 - num2
};

const multiply = (num1, num2) => {
    return num1 * num2;
};

const divide = (num1, num2) => {
    if (num2 === 0)
    return num1 / num2;
};

const returnValue = (element) => {
    return element.target.value;
};

const addToInput = (element) => {
    console.log(input);
    let value = returnValue(element);
   return input += value;
}