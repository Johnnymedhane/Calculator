const lightThemeRadio = document.getElementById('light');
const darkThemeRadio = document.getElementById('dark');

function changetheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
};

lightThemeRadio.addEventListener('change', () => {
    if(lightThemeRadio.checked) {
        changetheme('light-theme')
    }
});

darkThemeRadio.addEventListener('change', () => {
    if(darkThemeRadio.checked) {
        changetheme('dark-theme');
    }
})
 
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    changetheme(savedTheme);
    if (savedTheme === 'light-theme') {
        lightThemeRadio.checked = true;
    } else if (savedTheme === 'dark-theme') {
        darkThemeRadio.checked = true;
    }
} else {
    // If no theme is saved, default to the light theme
    changetheme('light-theme');
    lightThemeRadio.checked = true;
}

 
 
 
 const buttons = Array.from(document.querySelectorAll("button"));
 const result = document.getElementById("input");

 let newCalculation = false;
 let currentInput = '' ;
 const operators = ["+", "-", "/", "*"];

 let inputResult = result.value;



 buttons.forEach((btn) => {
    btn.addEventListener('click', () => buttonClick(btn));
 });
 const buttonClick = (button) => {
        const buttonValue = button.textContent;

        switch (button.value) {
            case "c":
                cleanInput();
                break;
            case "=": 
            processResult();
            break;
           case '.':
            handleDecimal();
            break;
          default:
            operatorsOrNumbers(buttonValue);
   
        }
    };


 // Clean the display and currentInput variable
 function cleanInput() {
    newCalculation = false;
    currentInput = "";
    result.value = '';     

 };

//  Calculate result and display it
function processResult() {
    try {
        const finalResult = calculateResult(currentInput);
        if (finalResult === "Error" || isNaN(finalResult)) {
            result.value = "Error";
        } else {
            result.value = finalResult;
        }
        currentInput = result.value;
        newCalculation = true;
    } catch (e) {
        result.value = "Error";
    }
}

//  decimal button
function handleDecimal() {

    const currentInputValue = currentInput.split(/[\+\-\*\/]/);
    const lastNum = currentInputValue[currentInputValue.length -1];
    
    // prevent pressing dot "." twice before any operato
    if (!lastNum.includes(".")) {
       currentInput += ".";
     result.value += ".";
 }

};

// operators and numbers
function operatorsOrNumbers(value) {
    if (operators.includes(value)) {
        operatorClick(value);
    } else {
        numberClick(value);
    }
}

// operators
function operatorClick(operator) {
    if (newCalculation) {
        newCalculation = false;
        result.value += operator;
        currentInput += operator;
    } else {
        const lastChar = currentInput.slice(-1);
        if (!operators.includes(lastChar)) {
            result.value += operator;
            currentInput += operator;
        }
    }
};

// numbers 
function numberClick(number) {
    if (newCalculation) {
        cleanInput();
        newCalculation = false;
    }
    result.value += number;
    currentInput += number;
};

//  Calculate the result of the input
function calculateResult(input) {
    const operatorsStack = [];
    const numbersStack = [];
    let currentNumber = '';

    for (let i = 0; i < input.length; i++) {
        const char = input[i];
        
        if (!isNaN(char) || char === '.') {
            currentNumber += char;
        } else if (operators.includes(char)) {
            if (currentNumber !== '') {
                numbersStack.push(parseFloat(currentNumber));
                currentNumber = '';
            }
            while (operatorsStack.length > 0 && getOperatorPrecedence(operatorsStack[operatorsStack.length - 1]) >= getOperatorPrecedence(char)) {
                const num1 = numbersStack.pop();
                const num2 = numbersStack.pop();
                const operator = operatorsStack.pop();
                numbersStack.push(calculateTwoNumbers(num2, num1, operator));
            }
            operatorsStack.push(char);
        }
    }

    if (currentNumber !== '') {
        numbersStack.push(parseFloat(currentNumber));
    }

    while (operatorsStack.length > 0) {
        const num1 = numbersStack.pop();
        const num2 = numbersStack.pop();
        const operator = operatorsStack.pop();
        numbersStack.push(calculateTwoNumbers(num2, num1, operator));
    }

    return numbersStack.pop();
};


// calculate to numbers beased on operator
function calculateTwoNumbers(num1, num2, operator) {
    switch(operator) {
        case("+"): return num1 + num2;
         case("-"): return num1 - num2;
         case("*"): return num1 * num2;
         case("/"):return num2 === 0 ? "Error" : num1 / num2;
         default: return 0;

    }
};

//  operator precedence 
function arrangeOperators (operator) {
    switch(operator) {
        case "+":
        case "-":
            return 1;
        case "*":
        case "/":
            return 2;
        default:
            return 0;
        }
};




