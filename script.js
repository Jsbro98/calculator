

function log(input) {
    console.log(input);
};

const operandOne = {
    finishedWithInput: false,
    hasValue: false,
    value: [],
    resetValues() {
        this.finishedWithInput = false;
        this.hasValue = false;
        this.value = [];
    },
};

const operandTwo = {
    finishedWithInput: false,
    hasValue: false,
    value: [],
    resetValues() {
        this.finishedWithInput = false;
        this.hasValue = false;
        this.value = [];
    },
};

const operator = {
    hasValue: false,
    value: [],
    resetValues() {
        this.hasValue = false;
        this.value = [];
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

const input = [operandOne.value, operator.value, operandTwo.value, operatorOrEquals.value];

let evaluated = false;
function evaluate() {
    const equation = operator.value[0];
    const numberOne = Number(operandOne.value.join(""));
    const numberTwo = Number(operandTwo.value.join(""));
    if(numberTwo == null || equation == null) {return;}
    if (equation === '+') {
        const result = numberOne + numberTwo;
        console.log(`${numberOne} + ${numberTwo} = ${result}`);
        return result;
    }
    if (equation === '-') {
        const result = numberOne - numberTwo;
        console.log(`${numberOne} - ${numberTwo} = ${result}`);
        return result;
    }
    if (equation === '*') {
        const result = numberOne * numberTwo;
        console.log(`${numberOne} * ${numberTwo} = ${result}`);
        return result;
    }
    if (equation === '/') {
        const result = numberOne / numberTwo;
        console.log(`${numberOne} / ${numberTwo} = ${result}`);
        return result;
    }
};

const keypadNumbers = document.querySelectorAll('.keypad-container > button, .keypad.zero');

const equationButtons = document.querySelectorAll('.equation-container > button');

const calculatorButtons = Array.from(keypadNumbers).concat(Array.from(equationButtons));
const equalButton = document.querySelector('.equals-button');
calculatorButtons.push(equalButton);

function addButtonListener() {

calculatorButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        function isOperator() {
            const value = e.target.textContent;
            if (value === "/" || value === "*" || value === "-" || value === "+") {
                return true;
            }
            return false;
        }

        const isValueAnOperator = isOperator();

        function pushIntoInputArray() {
            const value = e.target.textContent;
            if (operandOne.finishedWithInput === false && !isValueAnOperator) {
                operandOne.value.push(value);
                operandOne.hasValue = true;
            }
            if (operandOne.hasValue && isValueAnOperator && operandTwo.hasValue === false) {
                operator.value.push(value);
                operator.hasValue = true;
                operandOne.finishedWithInput = true;
            }
            if (operandOne.finishedWithInput && operator.hasValue && !isValueAnOperator && value !== "=") {
                operandTwo.value.push(value);
                operandTwo.hasValue = true;
            }
            if (operandTwo.hasValue && (isValueAnOperator || value === "=")) {
                function setOperandOneValue() {
                    if (result < 0) {
                        operandOne.value.push(result)
                        return operandOne.value;
                    };

                    operandOne.value.push(...result.toString());

                    for (i = 0; i < operandOne.value.length; i++) {
                        const array = operandOne.value;
                        array[i] = Number(array[i]);
                    };

                };

                const result = evaluate();
                resetInputArrayAndValues();
                setOperandOneValue();
                operandOne.finishedWithInput = true;
                operandOne.hasValue = true;
                if (isValueAnOperator) {
                    operator.value.push(value);
                }
                operator.hasValue = true;
            };

        }
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
        function checkInputArray() {

            function logEach() {
                for (key in inputArrayValues) {console.log(key, ":", inputArrayValues[key])};
            };

            const inputArrayValues = {

                numberOne: input[0],
                equation: input[1],
                numberTwo: input[2],
                indexThree: input[3],
            }

            
            if (evaluated) {
            resetInputArrayAndValues();
            }
        
        };
    
        pushIntoInputArray(e);

        checkInputArray();
    
    })
})
}

addButtonListener();

const numberDisplay = document.querySelector('.number-display');