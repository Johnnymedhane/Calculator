        const buttons = Array.from(document.querySelectorAll("button"));
        const result = document.getElementById("input");

        let newCalculation = false;
        let numbers = '' ;
        const operator = ["+", "-", "/", "*"];

        let inputResult = result.value;



        buttons.forEach((btn) => {
            btn.addEventListener('click', () =>
            {
        const buttonValue = btn.textContent;


         if(btn.value === "c") { 
           cleanInput();
          
            }
           
            
            else if(btn.value === "=") {
            //  calculate the result  
                 equalInput();

               
            }

             else if(btn.value === ".") {

             const currentInputValue = numbers.split(/[\+\-\*\/]/);
           
                
            const lastNum = currentInputValue[currentInputValue.length -1];

 

            // prevent pressing dot "." twice before any operator
            if (!lastNum.includes(".")) {
                numbers += ".";
                result.value += ".";
            }
           
             
                }
            
            //   operators

            else if (operator.includes(buttonValue)) {
            
                // continue calculation with the result

                if(newCalculation) {
                    newCalculation = false;
                    numbers += buttonValue;
                    result.value += buttonValue;
                }

                // prevent pressing the same operator twice
                const disableOpe = numbers.slice(-1);

                if (!operator.includes(disableOpe)) {
                    numbers += buttonValue;
                    result.value += buttonValue;
                    console.log(numbers)
                }

               
            }



        

        else {
        
           if(newCalculation) {
       numbers = "";
            result.value = "";
            newCalculation = false;
           }
        
       
        numbers +=  buttonValue;

            result.value = numbers;
        
        }
    })
})


        
    






        function cleanInput() {
            newCalculation = false;
        result.value = '';
        
        numbers = '';
        
        
        
        }
       


        function calculateTwoNum(num1, num2, operator) {
            switch(operator){
            case("+"):
            return num1 + num2;
        
            case("-"):
            return num1 - num2;
        
        
            case("*"):
        
            return num1 * num2;
        
           case("/"):
           if(num2 === 0) return "Error";
           return num1 / num2;
            
           default: 
           return 0;
        
            }
        }
        
        
        
        
        function calculateResult(result) {
            const operatorsStack = [];  // Renamed to avoid conflict
            const secondNumber = [];
            let firstNumber = "";
        
            for (let i = 0; i < result.length; i++) {
                const split = result[i];
        
                if (!isNaN(split) || split === ".") {  // Include dot as part of number
                    firstNumber += split;
                } else if (operator.includes(split)) {
                    if (firstNumber !== "") {
                        secondNumber.push(parseFloat(firstNumber));
                        firstNumber = "";
                    }
                    
                    while (operatorsStack.length > 0 && arrangeOperators(operatorsStack[operatorsStack.length - 1]) >= arrangeOperators(split)) {
                        const first = secondNumber.pop();
                        const second = secondNumber.pop();
                        const ope = operatorsStack.pop();
                        secondNumber.push(calculateTwoNum(second, first, ope));
                    }
                    operatorsStack.push(split);
                }
            }
        
            if (firstNumber !== "") {
                secondNumber.push(parseFloat(firstNumber));
            }
        
            while (operatorsStack.length > 0) {
                const first = secondNumber.pop();
                const second = secondNumber.pop();
                const ope = operatorsStack.pop();
                secondNumber.push(calculateTwoNum(second, first, ope));
            }
        
            return secondNumber.pop();
        }
        

        function arrangeOperators (operator) {
            if(operator === "+" || operator === "-") {
                return 1;
            }
            else if(operator === "*" || operator === "/") {
                return 2;
            }

                else {
                    return 0;
                }
            }
        
        
        
        
        
        
        





   

function equalInput() {

    try {
        const finalResult = calculateResult(numbers);

    if(finalResult === "Error" || isNaN(finalResult)){
        result.value = "Error";
    }
    else{result.value= finalResult;
    }

    //   numbers = " ";
    numbers = result.value
    newCalculation = true;

    }

     catch (e) {
         result.value = "Error";
    }

    }












        // function equalInput() {

        // try {
        //     const finalResult = calculateResult(numbers);
        //     //  numbers = eval(numbers);

        // if(finalResult === "Error" || isNaN(finalResult)){
        //     result.value = "Error";
        // }
        // else{result.value= finalResult;
        // }

        // //   numbers = " ";
        // numbers = result.value
        // newCalculation = true;

        // }

        //  catch (e) {
        //      result.value = "Error";
        // }

        // }











