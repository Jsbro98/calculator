// objects used in button event listener, these are used in the input array

const operandOne = {
    finishedWithInput: false,
    hasValue: false,
    value: [],
    isNegative: false,
    resetValues() {
        this.finishedWithInput = false;
        this.hasValue = false;
        this.value = [];
        this.isNegative = false;
    },
};

const operandTwo = {
    finishedWithInput: false,
    hasValue: false,
    value: [],
    isNegative: false,
    resetValues() {
        this.finishedWithInput = false;
        this.hasValue = false;
        this.value = [];
        this.isNegative = false;
    },
};

const operator = {
    hasValue: false,
    finishedWithInput: false,
    value: [],
    resetValues() {
        this.hasValue = false;
        this.value = [];
        this.finishedWithInput = false;
    },
};

const operatorOrEquals = {
    testValue() {
        let value = this.value;
        
        if (value === "=") {
            this.whichValue.isEquals = true;
        } else {
            this.whichValue.isOperator = true;
        }
    },
    value: null,
    whichValue: {
        isOperator: false,
        isEquals: false,
    },
    resetValues() {
        this.value = null;
        this.whichValue.isEquals = false;
        this.whichValue.isOperator = false;
    },
};
// the input array that the calculator uses for storing and evaluating
const input = [operandOne.value, operator.value, operandTwo.value, operatorOrEquals.value];

const numberDisplayValue = () => {
    
    let result = [operandOne.value.join(""), operator.value, operandTwo.value.join("")];
    if (result[0] !== "") {
        if (operandOne.isNegative) {
            result[0] = -Math.abs(Number(result[0]));
        } else {
            result[0] = Number(result[0]);
        };
    };
    if (result[2] !== "") {
        if (operandTwo.isNegative) {
            result[2] = -Math.abs(Number(result[2]));
        } else {
            result[2] = Number(result[2]);
        };
    };
    result = result.join(" ");

    return result;
};

// the core evaluate function
function evaluate() {
    const equation = operator.value[0];
    let numberOne = Number(operandOne.value.join(""));
    let numberTwo = Number(operandTwo.value.join(""));

    // for loop to make the numbers negative
    for (i = 0; i < input.length - 1; i++) {
       const operandOneIsNegative = operandOne.isNegative;
       const operandTwoIsNegative = operandTwo.isNegative;
       const currentValue = input[i].join("");

        if (currentValue === equation) {
            continue;
        } else if (Number(currentValue) === numberOne && numberOne !== 0) {
            if (operandOneIsNegative) {
                numberOne = -Math.abs(numberOne);
            }
        } else if (Number(currentValue) === numberTwo && numberTwo !== 0) {
            if (operandTwoIsNegative) {
                numberTwo = -Math.abs(numberTwo);
            }
        };
    };

    if(numberTwo == null || equation == null) {return;}
    if (equation === '+') {
        const result = numberOne + numberTwo;
        console.log(`${numberOne} + ${numberTwo} = ${result}`);
        numberContainer.textContent = `${result}`;
        return result;
    }
    if (equation === '-') {
        const result = numberOne - numberTwo;
        console.log(`${numberOne} - ${numberTwo} = ${result}`);
        numberContainer.textContent = `${result}`;
        return result;
    }
    if (equation === '*') {
        const result = numberOne * numberTwo;
        console.log(`${numberOne} * ${numberTwo} = ${result}`);
        numberContainer.textContent = `${result}`;
        return result;
    }
    if (equation === '/') {
        if (numberTwo === 0) {
            return console.log("No dividing by zero!")
        };
        const result = numberOne / numberTwo;
        console.log(`${numberOne} / ${numberTwo} = ${result}`);
        numberContainer.textContent = `${result}`;
        return result;
    }
};

// selectors to grab all calculator buttons
const keypadNumbers = document.querySelectorAll('.keypad-container > button, .keypad.zero');

const equationButtons = document.querySelectorAll('.equation-container > button:not(.equation.negative)');

// selector for the calculator display
const numberDisplay = document.querySelector('.number-display');
const numberContainer = document.querySelector('.number-container');

const calculatorButtons = Array.from(keypadNumbers).concat(Array.from(equationButtons));
const equalButton = document.querySelector('.equals-button');
const negativeButton = document.querySelector('.equation.negative');
const clearButton = document.querySelector('.clear-button');
calculatorButtons.push(equalButton);

//function for adding the event listener for all calculator buttons
function addButtonListeners() {

// function to set isNegative on operand objects
function makeValueNegative() {
    let negativeDisplay = numberDisplayValue();
    const isOperandOneDone = (operandOne.hasValue && operandOne.finishedWithInput);
    const isOperandTwoDone = operandTwo.hasValue;
    const isOperatorDone = operator.hasValue;
    const isOperandOneAndOperatorDone = (isOperandOneDone && isOperatorDone);

    if(isOperandOneDone && !isOperandOneAndOperatorDone && operandOne.value !== 0) {

       return operandOne.isNegative = true;
    } else if ((isOperandTwoDone || isOperandOneAndOperatorDone) && operandTwo.value !== 0) {
       return operandTwo.isNegative = true;
    } else  {
        return operandOne.isNegative = true;
    }

};

// setting event listeners for negative and clear buttons
negativeButton.addEventListener('click', makeValueNegative);
clearButton.addEventListener('click',() => {resetInputArrayAndValues(); console.log("input cleared"); numberContainer.textContent = "";});

// function for resetting resetting input array
function resetInputArrayAndValues() {
    (function (...objects) {
        const objectsArray = objects;
        objectsArray.forEach((object) => {object.resetValues()});
    }) (operandOne, operandTwo, operator, operatorOrEquals);

    evaluated = false;
    input[0] = operandOne.value;
    input[1] = operator.value;
    input[2] = operandTwo.value;
    input[3] = operatorOrEquals.value;
};


calculatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // test a value to see if its an operator
        function isOperator() {
            const value = e.target.textContent;
            if (value === "/" || value === "*" || value === "-" || value === "+") {
                return true;
            }
            return false;
        }

        const isValueAnOperator = isOperator();

        // function for pushing the numbers and operators from the calculator buttons into the input array above
        function pushIntoInputArray() {
            const value = e.target.textContent;
            if ((operandOne.finishedWithInput === false) && isValueAnOperator === false && value !== "=") {
                operandOne.value.push(value);
                operandOne.hasValue = true;
            }
            if (operandOne.hasValue && isValueAnOperator && operandTwo.hasValue === false && operator.finishedWithInput !== true) {
                operator.value.push(value);
                operator.hasValue = true;
                operandOne.finishedWithInput = true;
                operator.finishedWithInput = true;
            }
            if (operandOne.finishedWithInput && operator.hasValue && !isValueAnOperator && value !== "=") {
                operandTwo.value.push(value);
                operandTwo.hasValue = true;
            }
            if (operandTwo.hasValue && (isValueAnOperator || value === "=") && operandOne.hasValue !== false) {
                /* this function is needed to carry over an evaluation to the beginning
                 of the input array after reseting the input array */
                function setOperandOneValue() {
                    if (result === undefined) {return};
                    operandOne.hasValue = true;
                    if (result > Number.MAX_SAFE_INTEGER || result < Number.MIN_SAFE_INTEGER) {
                        const re = /,/gi;
                        const value = result.toLocaleString().replace(re, "");
                        return operandOne.value.push(...value);
                    }
                    if (result < 0 || !Number.isInteger(result)) {
                        operandOne.value.push(result)
                        return operandOne.value;
                    };

                    if (result !== undefined) {operandOne.value.push(...result.toString())};

                    for (i = 0; i < operandOne.value.length; i++) {
                        const array = operandOne.value;
                        array[i] = Number(array[i]);
                    };

                };

                const result = evaluate();
                resetInputArrayAndValues();
                setOperandOneValue();
                if (isValueAnOperator && operandOne.hasValue === true) {
                    operator.value.push(value);
                    operator.hasValue = true;
                    operandOne.finishedWithInput = true;
                }
            };

            numberContainer.textContent = numberDisplayValue();

        }

        pushIntoInputArray(e);

    })
})
}

addButtonListeners();

