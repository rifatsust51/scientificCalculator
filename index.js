var screen = document.querySelector("#inputBox");
var numBtn = document.querySelectorAll(".btn");
var functionBtn = document.querySelectorAll(".function");

var screenValue = "";

const buttonMappings = {
    'x': '*',
    '÷': '/',
    'π': 3.1416,
    '(-)': '-',
    'x□': '**',
    'x-1': '**-1',
    'x/y':'/',
};

const computerCharacters = (e) => {
    const buttonContent =   buttonMappings[e.target.innerText] || e.target.innerText;
    screen.value += buttonContent;
}



 
function operationFunction(e) {
    const content = e.target.innerText.trim(); // Get the button text and remove extra spaces
    const inputValue = parseFloat(inputBox.value); // Parse the input value as a number

    // Check if the input value is valid
    if (isNaN(inputValue)) {
        screen.value = "Invalid Input"; // Display error if input is not a number
        return;
    }

    let result;
    switch (content) {
        case 'sin':
            result = Math.sin(inputValue * (Math.PI / 180)); // Convert degrees to radians
            break;
        case 'cos':
            result = Math.cos(inputValue * (Math.PI / 180)); // Convert degrees to radians
            break;
        case 'tan':
            result = Math.tan(inputValue * (Math.PI / 180)); // Convert degrees to radians
            break;
        case 'Abs':
            result = Math.abs(inputValue); // Absolute value
            break;
        case 'Ln':
            result = Math.log(inputValue); // Natural logarithm
            break;
        case 'log':
            result = Math.log10(inputValue); // Base 10 logarithm
            break;
        case 'x²':
            result = Math.pow(inputValue, 2); // Square
            break;
        case 'x3':
            result = Math.pow(inputValue, 3); // Cube
            break;
        case '√':
            result = Math.sqrt(inputValue); // Square root
            break;
        default:
            screen.value = "No Operation Selected"; // Handle unsupported operations
            return;
    }

    // Display the result
    screen.value = result;
}

      



for(const button of numBtn){
    button.addEventListener('click', computerCharacters);
}

for(const operation of functionBtn){
    operation.addEventListener('click', operationFunction);
}

//onclick events
function copy() {
    navigator.clipboard.writeText(screen.value);
}
function paste(){
    navigator.clipboard.readText()
    .then(text => {
        screen.value += text;
    })
    .catch(err => {
        console.error('Failed to read clipboard contents: ', err);
    });
}

function result(){
    try{
        
        screen.value = eval(screen.value);
    }catch(err){
        screen.value = 'Error';
    }
}

function eng(){
    //convert inputBox value to a number
    const inputValue = parseFloat(inputBox.value);
    //handle invalid or zero input
    if(isNaN(inputValue)|| inputValue === 0){
        screen.value = '0';
        return;
    }
    const exp = Math.floor(Math.log10(Math.abs(inputValue))/3)*3;
    //calculate the mantissa
    const mantissa  = inputValue/Math.pow(10, exp);
    //return the result
    screen.value = `${mantissa.toFixed(3)}E${exp}`;
}

function sexagesimal(){
    const decimalValue = parseFloat(screen.value);
    if(isNaN(decimalValue)){
        screen.value = 'invalid input';
        return;
    }
    const degrees = Math.floor(decimalValue);
    const minutesDecimal = Math.floor(decimalValue - degrees) * 60;
    const minutes = Math.floor(minutesDecimal);
    const seconds = Math.floor((minutesDecimal - minutes) * 60).toFixed(2);
    screen.value = `${degrees}°${minutes}'${seconds}"`;
}

//implementing log a base b 
document.getElementById("logBaseButton").addEventListener("click", () => {
    // Prompt the user for the base and the value
    const base = parseFloat(prompt("Enter the base (b):"));
    const value = parseFloat(prompt("Enter the value (x):"));

    // Validate the inputs
    if (isNaN(base) || isNaN(value)) {
        screen.value = "Invalid Input";
        return;
    }

    // Calculate the result using the logBase function
    const result = logBase(base, value);

    // Display the result
    screen.value = result;
});

function logBase(base, value) {
    // Validate the inputs to ensure they are positive and the base is not 1
    if (base <= 0 || base === 1 || value <= 0) {
        return "Invalid Input";
    }

    // Compute the logarithm with the given base
    return Math.log(value) / Math.log(base);
}

//memory store M+ And memory ReCall RCL button
let memory = null;  // Variable to store the value in memory

// Function to store the current value in memory
function storeInMemory() {
    const inputValue = parseFloat(inputBox.value);
    
    if (!isNaN(inputValue)) {
        memory = inputValue;
        screen.value = "Value stored in memory.";
        // Remove message after 2 seconds
        setTimeout(() => {
            screen.value = "";
        }, 1000);
    } else {
       screen.value = "Invalid Input.";
    }
}

// Function to recall the value from memory
function recallFromMemory() {
    if (memory !== null) {
        screen.value = memory;
       
    } else {
        screen.value = "No value in memory.";
    }
}

// Event listeners for M+ and RCL memory buttons
document.getElementById("memoryStoreButton").addEventListener("click", storeInMemory);
document.getElementById("memoryRecallButton").addEventListener("click", recallFromMemory);


//function for s toogle d 
let isDegreeMode = true; // Start in degree mode

// Function to toggle between Degree and Radian modes


// Function to toggle between Degree and Radian modes
function toggleSD() {
    isDegreeMode = !isDegreeMode; // Toggle mode (degree <=> radian)
    screen.value = isDegreeMode ? "Mode: Degrees" : "Mode: Radians"; // Show active mode
    setTimeout(() => screen.value = "", 1500); // Clear message after 1.5 seconds
}

// Attach event listener to toggle button
document.getElementById("toggleSDButton").addEventListener("click", toggleSD);

// Function to convert between degree and radian
function convert() {
    let currentValue = parseFloat(screen.value);
    if (isNaN(currentValue)) return; // Don't do anything if it's not a valid number
    
    if (isDegreeMode) {
        // Convert to radians (Degrees to Radians)
        currentValue = currentValue * (Math.PI / 180);
        screen.value = `${currentValue.toFixed(2)} `;
    } else {
        // Convert to degrees (Radians to Degrees)
        currentValue = currentValue * (180 / Math.PI);
        screen.value = `${currentValue.toFixed(2)} `;
    }
}

// Attach event listener to convert button
document.getElementById("ansButton").addEventListener("click", convert);

//Dom Events

document.addEventListener('DOMContentLoaded',()=>{
      const box = document.getElementById('inputBox');
      const powerBtn = document.getElementById('start');
      const effectsBtn = document.getElementById('config');
      const delBtn = document.getElementById('DE');
      const backg = document.querySelector('.container');

      //power button click events to start operations

      
        powerBtn.addEventListener('click', () => {
            const greenScreen = `rgb(37, 218, 167)`;
          
            // Initialize eventActivated if it's not already set
            if (box.dataset.eventActivated === undefined) {
                box.dataset.eventActivated = 'false'; // Default to 'false' for the first time
            }
            
            // Check if the button has been clicked
            const isClicked = box.dataset.eventActivated === "true";
        
            if (isClicked) {
                // If clicked, set the background to green
                box.style.backgroundColor = greenScreen;
                box.style.color = 'black';
                box.style.fontWeight = 'bold';
            } else {
                // If not clicked, reset the background color and other styles
                box.style.backgroundColor = '';
                box.value = '';  // Reset the value
                backg.style.backgroundImage = '';  // Remove any background image
            }
        
            // Toggle the eventActivated state
            box.dataset.eventActivated = isClicked ? 'false' : 'true';
           
        });
        

        //effects button click events to change background image

        effectsBtn.addEventListener('click', () => {
            const bg = "url('bg-src/Casio-bg.png')";
            console.log(backg.dataset.eventActivated);
            const isClicked = backg.dataset.eventActivated === 'true';
            if (isClicked) {
                backg.style.backgroundImage = bg;
                backg.style.backgroundSize = "cover";
            } else {
                backg.style.backgroundImage = "";
            }
            backg.dataset.eventActivated = isClicked ? 'false' : 'true';
        });

        //sound effects for button clicks
        numBtn.forEach((button)=>{
            button.addEventListener('click',()=>{
                const audio = new Audio('SFX-src/SFX-src_btnKeys-SFX1 (1).mp3');
                audio.play();
            });
        });
        functionBtn.forEach((button)=>{
            button.addEventListener('click',()=>{
                const audio = new Audio('SFX-src/SFX-src_btnKeys-SFX2.mp3');
                audio.play();
            });
        });

 // Delete button click event
delBtn.addEventListener('click', function () {
    const startPosition = box.selectionStart;
    const endPosition = box.selectionEnd;

    if (startPosition < endPosition) {
        // Case: A range of text is selected
        const textBeforeCaret = box.value.substring(0, startPosition);
        const textAfterCaret = box.value.substring(endPosition);
        box.value = textBeforeCaret + textAfterCaret;
        setSelectionRange(box, startPosition, startPosition); // Keep the caret at the start of the deleted range
    } else if (startPosition > 0) {
        // Case: No selection, delete the character before the caret
        const textBeforeCaret = box.value.substring(0, startPosition - 1);
        const textAfterCaret = box.value.substring(startPosition);
        box.value = textBeforeCaret + textAfterCaret;
        setSelectionRange(box, startPosition - 1, startPosition - 1); // Move the caret one step left
    }
    // If the caret is at the beginning of the input (startPosition === 0), do nothing
});

// Move the caret position to the right
function moveCaretRight() {
    const currentPosition = box.selectionStart;
    const newPosition = (currentPosition + 1); // Prevent moving beyond the text length
    setSelectionRange(box, newPosition, newPosition);
}

// Move the caret position to the left
function moveCaretLeft() {
    const currentPosition = box.selectionStart;
    const newPosition = (currentPosition - 1); // Prevent moving before the start of the text
    setSelectionRange(box, newPosition, newPosition);
}

// Event listeners to move caret buttons
const moveRightBtn = document.getElementById('right-btn');
const moveLeftBtn = document.getElementById('left-btn');
moveRightBtn.addEventListener('click', moveCaretRight);
moveLeftBtn.addEventListener('click', moveCaretLeft);

// Set the selection range for a given character position
function setSelectionRange(input, start, end) {
    input.focus();
    input.setSelectionRange(start, end); // Works for modern browsers
}

});



