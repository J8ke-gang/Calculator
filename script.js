// Function to append input to the display
function appendToDisplay(value) {
    const display = document.getElementById('display');
// Adds the clicked value (number or operator) to the display   
    display.value += value;
}

// clear the display
function clearDisplay() {
    const display = document.getElementById('display');
    display.value = '';
}

// calculate the result when the '=' button is clicked
function calculateResult() {
    const display = document.getElementById('display');
    let expression = display.value;

// Error if expression is empty
    if (!expression) {
        display.value = 'Error';
        return;
    }

    try {
// calculate by applying BIDMAS (order of operations)
        display.value = evaluateExpression(expression);
    } catch (error) {
// If invalid expression is entered show an error
        display.value = 'Error';
    }
}

// function to evaluate the expression manually (without eval)
function evaluateExpression(expression) {

// Remove all spaces from the expression
    expression = expression.replace(/\s+/g, '');

// Handle multiplication and division first (left to right)
    expression = handleMultiplicationAndDivision(expression);

// Handle addition and subtraction
    expression = handleAdditionAndSubtraction(expression);

    return expression;
}

// Handle multiplication and division
function handleMultiplicationAndDivision(expression) {

// Expression to match multiplication and division operations
    const regex = /(\d+(\.\d+)?)\s*([*/])\s*(\d+(\.\d+)?)/g;

    let match;
    while ((match = regex.exec(expression)) !== null) {
        const num1 = parseFloat(match[1]);
        const operator = match[3];
        const num2 = parseFloat(match[4]);

// Perform the operation
        let result;
        if (operator === '*') {
            result = num1 * num2;
        } else if (operator === '/') {
            if (num2 === 0) {
                throw new Error('Division by zero');
            }
            result = num1 / num2;
        }

// Replace the matched operation with the result
        expression = expression.replace(match[0], result);

        // Reset the regex to match again from the start       
        regex.lastIndex = 0;
    }

    return expression;
}

// Handle addition and subtraction
function handleAdditionAndSubtraction(expression) {

    // Regular expression to match addition and subtraction operations
    const regex = /(\d+(\.\d+)?)\s*([+-])\s*(\d+(\.\d+)?)/g;

    let match;
    while ((match = regex.exec(expression)) !== null) {
        const num1 = parseFloat(match[1]);
        const operator = match[3];
        const num2 = parseFloat(match[4]);

// Perform the operation
        let result;
        if (operator === '+') {
            result = num1 + num2;
        } else if (operator === '-') {
            result = num1 - num2;
        }

// Replace the matched operation with the result
        expression = expression.replace(match[0], result);
        regex.lastIndex = 0; // Reset the regex to match again from the start
    }

// Return the final result of the expression
    return expression;
}

