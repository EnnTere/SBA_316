/// Painting game planning ///

// 1. Dynamic canvas
// - MVP UI
// - Interactions: mouseover, click

// 2. Canvas Content
// - Generate simple background (text)
// - *Attempt* ImageData background reading

// 3. Win/Lose
// - win & lose conditions (detecting boundaries, relies on ImageData)
// - notifying player of win or loss

// 4. Score
// - scoring rules
// - collecting & saving input
// - calculating & saving scores

// 5. UI, UX, Presentation
// - Styling
// - Min interaction size 45 x 45
// - Media queries

// 6. New Game
// - Clear score
// - Clear canvas

// Optional
// - Backup canvas with method similar to class lab
///////////////////////////////////////////////////////////////////

///////////////////////////
/// Global Variables
///////////////////////////

//let canvas = document.querySelector("canvas")
const selectColor = document.querySelector("#color-picker");
const resetButton = document.querySelector(".reset-button");

// Caching canvas & retrieving canvas API
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //returns object w/ properties & methods for drawing

// Painting settings
let size = 5;
let color = "#111111";
let isPainting = false;
// Mouse positions
let x;
let y;

///////////////////////////
//// Functions
///////////////////////////


//Combines shapes for a continous and more natural looking stroke
// Creates a circle
const drawCircle = (x, y) => {
  ctx.beginPath(); // Starts a path
  ctx.arc(x, y, size, 0, Math.PI * 2); // Provides specs for circle
  ctx.fillStyle = color; // Sets color used for fill
  ctx.fill(); // Fills a path
  console.log(x.y, "draw circle test");
};

// Draws a line
const drawLine = (x1, y1, x2, y2) => {
  ctx.beginPath();
  ctx.moveTo(x1, y1); // Sets starting point of path
  ctx.lineTo(x2, y2); // Draws path from moveTo position to param
  ctx.strokeStyle = color; // Styles the stroke
  ctx.lineWidth = size * 2; // Sets width of path
  ctx.stroke(); // Adds  outline to the path
  console.log(x, y, "draw line test");
};

// Sets
// Takes stroke size & displays it on canvas toolbar
// const strokeSizeTool = () => (
//     sizeElement.innerText = size
// );

///////////////////////////
//// Canvas Listeners  //// 
///////////////////////////

// Start Painting: When holding mouse button
canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  x = e.offsetX; // read-only property of mousedown event; provides x offset coordinates of the mouse pointer between the mouse event & the padding edge of the target node
  y = e.offsetY; // represent the X & Y coords of mouse event relative to the position of the canvas element => used to determine where the player started the mouse event on the canvas
  console.log(x, y, isPainting, "mousedown test");
});

// Stop Painting: On releasing mouse button
canvas.addEventListener("mouseup", (e) => {
  isPainting = false; // signals that drawing has stopped
  x = undefined; // mouse location is no longer stored once stopped
  y = undefined;
  console.log(x, y, isPainting, "mouseup test");
});

// Issue: x+y aren't being passed to mousemove

// Create Continuous Paint Stoke: On moving mouse while holding mouse button, call circle & line draw functions
// Looks at where mouse started & provides coords for drawLine function to create a path from start (moveTo) to end (lineTo)

// // offset for parent of element (keeps stroke at pointer tip) vs client for element ()
//   x2 = e.offsetX; // set to offset of event object (i.e. mouse coords)
//   y2 = e.offsetY;
canvas.addEventListener("mousemove", (e) => {
  if (isPainting) {
    x2 = e.offsetX; // set to offset of event object (i.e. mouse coords)
    y2 = e.offsetY;
    console.log(x, y, x2, y2, isPainting, "mousemove test");
    drawCircle(x2, y2); // draws circle at current mouse position
    drawLine(x, y, x2, y2); // draws line from previous to current mouse position
    x = x2; // values updated to last values of offset so line starts from mouse's position
    y = y2;
    console.log(x, y, x2, y2, isPainting, "mousemove test");
  }
  console.log(x, y, isPainting, "mousemove done test");
});

//  Toolbar functionality

//9
// increase size
// decrease size


// Change Stroke Color: When the color picker's value is changed, set color var to selected color
selectColor.addEventListener("change", (e) => {
  color = e.target.value;
  console.log("change test");
});

//));


// Reset canvas: clears entire canvas of strokes painted by player
resetButton.addEventListener("click", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height); //defines rectangles starting points & dimensions, pixels in rectangular area are changed to transparent black
  console.log("reset test");
});

//));



///////////////////////////
////   Functionality   //// 
///////////////////////////


// Dynamically updating background - erases everything and adds a new value
//Not sure what event it should be waiting for. Need to look at available events
// canvas.addEventListener("" (e) => {


// });
// https://stackoverflow.com/questions/31882814/html-canvas-change-text-dynamically


// 1
// generate the background
//// Turn in to a Function


// Temp Background Fill: Text
ctx.font = "12.25em Arial"; // Sets font properties
ctx.textAlign = 'center'; // centers text
ctx.textBaseline = 'middle';
// ctx.fillText("Test", (canvas.height / 2),(canvas.width / 2)); // draws & fills font + start coords
ctx.strokeText("Test", (canvas.height / 2),(canvas.width / 2)); // Draws text w/ strokes, no fill + start coords



/*When reset button is hit, text does not reappear*/
/* can link all of these together*/







////// Test: Generate a background on load /////////

// Creates an HTML Image Element (<img>) not attached to the DOM
const tempImage = new Image();
tempImage.src = "./assets/peach.png";
    // https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement



// draws an image on background of canvas data at this location
  //https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage
tempImage.addEventListener("load", () => {
  console.log("image");
  ctx.drawImage(tempImage, 0, 0/*, 233, 320*/); // 
}); 




///////////////
// Next Steps
///////////////


// ImageData
//// Creates read-only object that reads background pixel data of canvas + writes to a data array 
//// Width of img in px, height of img in px, (typed) array of ints
//// 0 - 3 index: R, G, B, Alpha, etc
//// Range: 0 to (height × width × 4) - 1 


/////////// Read canvas' background
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas

///// On load, read canvas' background image data 
// (https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData)

// Returns rgba of pixel at x & y positions
// console.log(getPixels(25, 68))
//getPixels(x, y);
// getPixelQuant(r, g, b);


///within paint function
// if () {

// }

// returns amount of picels in the canvas of color provided
// let getPixelQuant = (r, g, b) => {


// }

//function getPixels(x, y) {
let getPixels = (x, y) => {

  // Grabs & stores canvas boundary info & mouse location w/in
  // const canvasBoundary = canvas.getBoundingClientRect(); // Returns object w/ element's size & position 
  // const bndryMouseX = event.clientX - canvasBoundary.left; // retrieves mouse position relative to boundary
  // const bndryMouseY = event.clientY - canvasBoundary.top;

  // Returns an ImageData obj w/ a copy of the px data for canvas
  // //left, top, width, height => where & what is being grabbed
  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

  //translate the x and y coordinates into an index representing the offset of the first channel within the one-dimensional array. 
  //multiply by four because there are four elements per pixel, one for each channel
  //https://hacks.mozilla.org/2011/12/faster-canvas-pixel-manipulation-with-typed-arrays/
  //let pixelIndex = (y * canvasWidth + x) * 4;
  let index = ((y * (imageData.width * 4)) + (x * 4));
  //figure out diff

  // Stores the pixel data array from imageData object
  let pixelData = imageData.data //needed still?
  const rgbColor = `rgb(${pixelData[0]} ${pixelData[1]} ${pixelData[2]} / ${pixelData[3] / 255})`
  console.log(rgbColor)

  // return an object with pixel data
  return {
    red: pixelData[index],
    green: pixelData[index + 1],
    blue: pixelData[index + 2],
    alpha: pixelData[index + 3]
  }

};


// pixel data retrieval print
console.log(getPixels(25, 68))


// https://developer.mozilla.org/en-US/docs/Web/API/ImageData/data


/////// Step Test
  // test reading new object
  // let imageData = new ImageData(100, 100);
  // console.log(imageData.data); // Uint8ClampedArray[40000]
  // console.log(imageData.data.length); // 40000

///////////////////////////
//Win Conditions
//////////////////////////

//Detecting if point is within path/stroke
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInPath

// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/isPointInStroke

// ? https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getContextAttributes



///////////////////////////
////      Sources      //// 
///////////////////////////
// 
// Watch starting at 5-5:30: https://www.youtube.com/watch?v=9rsDNifGods
// https://foolishdeveloper.com/drawing-app-javascript/
// https://simon.html5.org/dump/html5-canvas-cheat-sheet.html
// https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/getImageData

// Read
  // https://webglfundamentals.org/webgl/lessons/webgl-anti-patterns.html
  // https://medium.com/@doomgoober/resizing-canvas-vector-graphics-without-aliasing-7a1f9e684e4d
  //https://isaiahnixon.com/dynamic-canvas/
  // https://stackoverflow.com/questions/22891827/how-do-i-hand-draw-on-canvas-with-javascript
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
