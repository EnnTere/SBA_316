
/// Painting game planning ///

// 1. Dynamic canvas
// - MVP UI
// - Interactions: mouseover, click

// 2. Win/Lose
// - win & lose conditions
// - notifying player of win or loss

// 3. Score
// - scoring rules
// - collecting & saving input
// - calculating & saving scores

// 4. UI, UX, Presentation
// - Styling
// - Min interaction size 45 x 45
// - Media queries

// 5. New Game
// - Clear score
// - Clear canvas

// Optional
// - Backup canvas with method similar to class lab
///////////////////////////////////////////////////////////////////

///////////////////////////
/// Global Variables
///////////////////////////

//let canvas = document.querySelector("canvas")
const selectColor = document.querySelector("#color-picker")
const resetButton =  document.querySelector(".reset-button")

// Caching canvas & retrieving canvas API
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d") //returns object w/ properties & methods for drawing

// Painting settings
let size = 10;
let color = '#111111';
let isPainting = false;
// Mouse positions
let x;
let y;


///////////////////////////
//// Functions
///////////////////////////

// Creates a circle
const drawCircle = (x, y) => {
    ctx.beginPath();  // Starts a path
    ctx.arc(x, y, size, 0, Math.PI * 2) // Provides specs for circle
    ctx.fillStyle = color; // Sets color used for fill
    ctx.fill(); // Fills a path
    console.log(x. y, "draw circle test")
};

// Draws a line
const drawLine = (x1, y1, x2, y2) => {
    ctx.beginPath();
    ctx.moveTo(x1, y1); // Sets starting point of path
    ctx.lineTo(x2, y2); // Draws path from moveTo position to param
    ctx.strokeStyle = color; // Styles the stroke
    ctx.lineWidth = size * 2; // Sets width of path
    ctx.stroke(); // Adds  outline to the path
    console.log(x, y, "draw line test")
};


// Sets 
// Takes stroke size & displays it on canvas toolbar
// const strokeSizeTool = () => (
//     sizeElement.innerText = size
// );



///////////////////////////
//// Canvas Listeners ////
///////////////////////////

// Start Painting: When holding mouse button
canvas.addEventListener("mousedown", (e) => {
    isPainting = true;
    x = e.offsetX; // read-only property of mousedown event, provides x offset coordinates of the moused pointer between the mouse event and the padding edge of the target node
    y = e.offsetY; // represent the X & Y coords of mouse event relative to the position of the canvas element = used to determine where the player started the mouse event on the canvas
    console.log(x, y, isPainting, "mousedown test")
});

// Stop Painting: On releasing mouse button
canvas.addEventListener("mouseup", (e) => {
    isPainting = false; // signals that drawing has stopped 
    x = undefined; // mouse location is no longer stored once stopped
    y = undefined;
    console.log(x, y, isPainting, "mouseup test")
});

// Issue: x+y aren't being passed to mousemove

// Create Paint Stoke: On moving mouse while holding mouse button, call circle & line draw functions
canvas.addEventListener("mousemove", (e) => {
    if (isPainting) {
        x2 = e.offsetX; // set to offset of event object (mouse coords)
        y2 = e.offsetY;
        console.log(x, y, x2, y2, isPainting, "mousemove test")
        drawCircle(x2, y2); // draws circle at current mouse position
        drawLine(x, y, x2, y2); // draws line from previous to current mouse position
        x = x2; // values updated to last values of offset so line starts from mouse's position
        y = y2;
        console.log(x, y,x2, y2, isPainting, "mousemove test")
    };
    console.log(x, y, isPainting, "mousemove done test")
});


// Make toolbar functionality

//9
// increase size 
// decrease size
// 11

// Reset canvas: clears entire canvas of strokes painted by player
resetButton.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //defines rectangles starting points & dimensions, pixels in rectangular area are changed to transparent black 
    console.log("reset test")
});

//));

// Change Stroke Color: When the color picker's value is changed, set color var to selected color
selectColor.addEventListener("change", (e) => {
    color = e.target.value
    console.log("change test")
});

//));





//https://foolishdeveloper.com/drawing-app-javascript/
































































/* 

//////////////////////////////////////////////////////////////
DOM Paint for ReferenceError

PART 1: Create the canvas!

a. Make a function called createCanvas
b. Inside, add a for loop that loops from 0 to 1080
c. In the for loop, create a new div element
d. Then append the new div element to the div with id "canvas" (HINT: line 1)
e. In the global scope, call the createCanvas function



function createCanvas() {
    for(let i = 0; i <= 2080; i++) {
        let divWrapper = document.createElement("div");
        canvas.appendChild(divWrapper);
    }
    console.log("creating")
};

createCanvas();


/////////////////////////////////
PART 2: Paint!

a. Add an event listener to the div with id of canvas
b. It should respond to the 'mouseover' event
c. Use a condition to check if the target element is not the canvas div
d. Also check if the 'canvasState' variable is true (HINT: line 4)
e. If both checks pass, set the background color of the target element to the value of the 'color' variable (HINT: line 5)



function onCanvas(event) {
    if (event.target != canvas && canvasState) {
        event.target.style.backgroundColor = color;
        console.log("callback")
    }
};


canvas.addEventListener("mouseover", onCanvas)


///////////////////////////////
PART 3: Stop painting!

a. Add an event listener to the canvas div that listens for 'click' events
b. In the callback function it should toggle the boolean value of the variable 'canvasState'



function paint() {
    if (!canvasState) {  // = !canvasState?
        canvasState = true;
    } else {
        canvasState = false;
    }
    
};

canvas.addEventListener("click", paint)



/////////////////////////////////
PART 4: Change the color!

a. Add an event listener to the input with type 'color' (HINT: line 2)
b. It should respond to the 'change' event
c. Inside the callback, set the 'color' variable to the current value of the target element



function changeColor(event) {
    color = event.target.value;
};

inpColor.addEventListener("change", changeColor)


/////////////////////////////////
PART 5: A clean slate...

a. Add an event listener to the button element that listens for 'click' events (HINT: line 3)
b. It should clear the canvas div of any child elements
c. Then call the createCanvas function you created in Part 1



function clear() {
    while (canvas.firstChild) {
        canvas.removeChild(canvas.firstChild)
    }
    createCanvas();
};


button.addEventListener("click", clear)


/////////////////////////////////
PART 6: Create your Mona Lisa!

a. Use your skills to paint a memorable picture
b. Take a screenshot of your work of art
c. Share it with the class! (Slack)

*/



