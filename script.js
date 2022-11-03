// starting by adding the selectors
const buttons = Array.from(document.querySelectorAll('button'));

// adding the click event listener function
const addClickListenser = (element, callback) => {
    return element.addEventListener('click', callback);
};

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
    return num1 / num2;
};