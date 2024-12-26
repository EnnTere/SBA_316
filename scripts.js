///////////////////////////
/// Global Variables
///////////////////////////

// Display Testing
const canvasState = document.getElementById("canvas_state");
const elementState = document.getElementById("element_state");
const mouseCoords = document.getElementById("mouse_coords");
let canvasInteraction = false;
let elementInteraction = false;

// Painting settings
let size = 5;
let color = "#111111";
let isPainting = false;
let pixels = [];

// Canvas element size & position from viewport + mouse positions
let mapMouseCoords = { x: 0, y: 0 };

// Mouse detection
let proximity = 5;



/////////////////////////////////
////      DOM Elements      //// 
///////////////////////////////

const body = document.querySelector("body")
const wrapper = document.querySelector(".page-wrapper")

// Canvas & retrieving canvas API
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d"); //returns object w/ properties & methods for drawing

// Text
//const header = document.createElement("h1")
// wrapper.appendChild(toolbar);







///////////////////////////////////////////////////
// Create Interactive Elements & Add to Toolbar //
//////////////////////////////////////////////////


//// Creating Toolbar ////
const sidebar = document.querySelector(".sidebar")
const toolbar = document.createElement("menu")

// trying out CSSText w/ template literals for bulk styling
toolbar.style.cssText = ` 
  background-color: indianred;
  height: 50%;
  width: 20%;
  padding: .75em;
`; 

//sidebar.appendChild(toolbar);
sidebar.prepend(toolbar);

// Toolbar buttons
const colorLabel = document.createElement("label")
colorLabel.setAttribute("for", "color-picker")
toolbar.append(colorLabel);

const colorPicker = document.createElement("input")
colorPicker.setAttribute("type", "color")
toolbar.append(colorPicker);

const resetButton = document.querySelector(".reset-button");
const sizeSpan = document.getElementById("size");



// Array of objects with button properties 
//// Including hidden labels as "+"" and "-" aren't accessible label names
//// Attempted after toolbar & buttons functionality had been written; not best use of time for project
const buttonSettings = [
  {
    text: "+",
    // label: "Increase brush size",
    // labelFor: "brush-increase",
    // labelClass: 'visHidden',
    action: () => {
      size += 5;
      if (size > 50) {size = 50};
      updateSizeTool();
    }
  },
  {
    text: "-",
    // label: "Decrease brush size",
    // labelFor: "brush-decrease",
    // labelClass: 'visHidden',
    action: () => {
      size -= 5;
      if (size < 5) {size = 5};
      updateSizeTool();
    }
  },
  {
    text: "Reset",
    action: () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }
];


//////// Map & append buttons + retain position of span ////////

// Creates elements for objs in button arr, maps obj properties, & returns buttons
const buttons = buttonSettings.map(({text, label, labelFor, labelClass, action}) => {

  // Creates button labels
  // const buttonLabel = document.createElement("label")
  // buttonLabel.textContent = label;
  // buttonLabel.htmlFor = labelFor;
  // buttonLabel.className = labelClass;

  // Creates buttons
  const button = document.createElement("button");
  // button.append(buttonLabel)
  button.textContent = text;
  button.addEventListener('click', action);

  //toolbar.append(buttonLabel, button)
  return button;
  // return toolbar;
});

// Appends new buttons to toolbar
toolbar.append(
  buttons[0],
  sizeSpan,
  buttons[1],
  buttons[2]
);


//////// Style Toolbar Options ////////

// Cache toolbar's entire HTMLCollection & to be styled elements
const toolbarOptions = toolbar.children;

// Add class to all interactive children w/in collection
for (let i = 0; i < toolbarOptions.length; i++) {
  const children = toolbarOptions[i];
  if (children.tagName === "BUTTON" || children.tagName === "INPUT") { // (not futureproof)
    children.classList.add("toolbarOptions")
  };
};

// body > page wrapper> sidebar > input
// console.log(sidebar.children[1] = sidebar.classList.add


// sidebar.lastElementChild.classList.add("button")
// sidebar.querySelectorAll("input");


// loop through sidebar
// if element Input
// lass add toolbarOptions 

// if


// menu > children[2]
// .style = size

toolbar.lastChild.style.cssText = `
  height: 25px;
  margin-top: 40px;
  margin-bottom: 5px;
`;



///////////////////////////
//// Canvas Background
///////////////////////////


//////// Canvas Background Image File Input ////////
// Validates & draws file on canvas

let setBackgroundImg = () => {
  const fileInput = document.getElementById("file")
  const uploadedFiles = fileInput.files[0];
  const fileReader = new FileReader(); // access & obtain files from FileList object returned by user's input

  const fileValidation = (uploadedFiles) => {
    const allowedTypes = /(\.jpg|\.jpeg|\.png|\.gif|\.webp)$/i;

    // Verify file uploaded & file type
    if (!uploadedFiles) {
      //window.alert("Please select a file");
      return false;
    };
    
    if (!allowedTypes.exec(uploadedFiles.name)) {
      window.alert("You can only upload jpegs, jpgs, pngs, gifs, or webp");
      fileInput.value = "";
      return false;
    }
    return true;
  };

  if (!fileValidation(uploadedFiles)) {
    return;
  };

    // If all file verifications passed, display the file
    fileReader.onload = (e) => { // when the reader loads
      const imgUpload = new Image();
      // const imgUpload = document.createElement("img");
      imgUpload.onload = () => { // ensure img fully loaded, then clear canvas & draw img
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(imgUpload, 0, 0);
      };
    imgUpload.src = e.target.result; // after img has loaded, use the image as the src
  };

  fileReader.readAsDataURL(uploadedFiles); // reads contents of uploaded file & embeds inline in document
};




///////////////////////////
//// Functions
///////////////////////////

// Creates the circle
const drawCircle = (currentX, currentY) => {
  ctx.beginPath(); // Starts a path
  ctx.arc(currentX, currentY, size, 0, Math.PI * 2); // Provides specs for circle
  ctx.fillStyle = color; // Sets color used for fill
  ctx.fill(); // Fills a path
};

// Draws the line from prev coords to current
const drawLine = (prevX, prevY, currentX, currentY) => {
  ctx.beginPath();
  ctx.moveTo(prevX, prevY,); // Sets starting point of path
  ctx.lineTo(currentX, currentY); // Draws path from moveTo position to param
  ctx.strokeStyle = color; // Styles the stroke
  ctx.lineWidth = size * 2; // Sets width of path
  ctx.stroke(); // Adds  outline to the path
};

// Translate mouse coordinates from viewport to corresponding coords w/in canvas
const getCanvasCoords = (e, canvas) => {
  let rect = canvas.getBoundingClientRect();
  return {
    x: (e.clientX - rect.left) * (canvas.width / rect.width),
    y: (e.clientY - rect.top) * (canvas.height / rect.height)
    // Subtracts offset relative to viewport for mouse coords relative to canvas. Multiplied to account for scaling. 
  };
};

// Updates toolbar text to reflect stroke size
const updateSizeTool = () => (
  sizeSpan.innerText = size
);

// Update values in display testing values
const updateDisplay = () => {
	canvasState.textContent = canvasInteraction ? 'is' : 'is not';
	elementState.textContent = elementInteraction ? 'is' : 'is not';
  mouseCoords.textContent = JSON.stringify(mapMouseCoords, function(key, val) {
  return val.toFixed ? Number(val.toFixed(3)) : val;
})
};
// Used replacer with stringify to reduce places shown & convert back to number
// https://stackoverflow.com/questions/9339870/how-to-reduce-numbers-significance-in-jsons-stringify



// Path overlap detection
const circle = new Path2D();
circle.arc(150, 75, 50, 0, 2 * Math.PI);
ctx.fillStyle = "red";
ctx.fill(circle);


let mouseOverlap = (e) => {
  mapMouseCoords = getCanvasCoords(e, canvas);
  elementInteraction = ctx.isPointInPath(circle, mapMouseCoords.x, mapMouseCoords.y);
  updateDisplay();
  //console.log("point")
};


/////////////////////////////////////////////////////////
    ////  Abandoned checking if element was colored //// 
///////////////////////////////////////////////////////
// Array of pixels in canvas 
// Every pixel has 4 values: r, g, b, alpha
// pixels = ctx.getImageData(0, 0, canvas.width, canvas.height)

// // Get index by looping through an array
// // Every element has 4 entries
// let getPixelColor = (x, y) => {
//   let pixIndex = ((y * (pixels.width * 4)) + (x * 4));
//   return {
//     r: pixels.data[pixIndex],
//     g: pixels.data[pixIndex + 1],
//     b: pixels.data[pixIndex + 2],
//     a: pixels.data[pixIndex + 3]
//   };
// };
//////////////////////////////////////////////////





///////////////////////////
//// Canvas Listeners  //// 
///////////////////////////

// Change paint colors
colorPicker.addEventListener("change", (e) => {
  color = e.target.value;
});

// Start Painting: When holding mouse button
//// Translate mouse coordinates of event object from viewport to corresponding coords w/in canvas
canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  mapMouseCoords = getCanvasCoords(e, canvas); 
  //console.log(mapMouseCoords, isPainting, "mousedown test");
});


// Stop Painting: On releasing mouse button
canvas.addEventListener("mouseup", (e) => {
  isPainting = false; // signals that drawing has stopped
  x = undefined; // reset mouse coords
  y = undefined;
  canvasInteraction = false;
  strokeInteraction = false;
  //console.log(x, y, isPainting, "mouseup test");
});


// Create Continuous Paint Stoke: On moving mouse & holding mouse button
// 1. Combines shapes for a continuous & more natural looking stroke
// 2. Looks at where mouse started & provides coords for draw functions to create a path from start (moveTo) to end (lineTo)
// 3. Keeps stroke at pointer tip
////// ?????? Checks if overlapping??????? ////////////////// <---------
canvas.addEventListener("mousemove", (e) => {
  const prevMouseCoords = { ...mapMouseCoords}; // Creates shallow copy of mouse coords obj
  mapMouseCoords = getCanvasCoords(e, canvas); // updates current coords

  if (isPainting) { // if painting, draw
    canvasInteraction = true; // Display for texting
    drawCircle(prevMouseCoords.x, prevMouseCoords.y); // draws circle at current mouse position
    drawLine(mapMouseCoords.x, mapMouseCoords.y, prevMouseCoords.x, prevMouseCoords.y); // draws line from previous to current mouse position
    mouseOverlap(e);
    if (!elementInteraction) { // if point is outside the path
      console.log("outside");
    } else {
        console.log("in");
      };
    };

    ////  May not need Image Data check //// 
    // let pixelColor = getPixelColor(mapMouseCoords.x, mapMouseCoords.y);
    // if (pixelColor.a) {
    //   window.alert("You're outside!");
    // };

  //console.log(mapMouseCoords.x, mapMouseCoords.y, isPainting, "mousemove test done");
  updateDisplay();
});


//// Update Canvas Background Image ////
file.addEventListener("change", (e) => {
  setBackgroundImg();
});

///////////////////////////
///////   Abandoned   /////
///////////////////////////


//More selective reset button
/*When reset button is hit, text does not reappear*/
/* can link all of these together*/

// Dynamically updating background - erases everything and adds a new value

// Ex. Generate new letter
// newLetter.addEventListener("click", () => {
//   ctx.font = "12.25em Arial";
//   ctx.textAlign = 'center';
//   ctx.textBaseline = 'middle';
//   ctx.strokeText("2nd", (canvas.height / 2),(canvas.width / 2)); 
// });

// https://stackoverflow.com/questions/31882814/html-canvas-change-text-dynamically




//////////////////////////////
//// Tests + Placeholders ////
//////////////////////////////

// Creates an HTML Image Element (<img>) not attached to the DOM
const tempImage = new Image();
tempImage.src = "./assets/peach.png";
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement

// draws an image on background of canvas data at this location
//https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage


// Temp Background Fill: Text
ctx.font = "2.75em Arial"; // Sets font properties
ctx.textAlign = 'center'; // centers text
ctx.textBaseline = 'middle';
ctx.strokeText(
  `Draw on the red circle & look below`,
  (canvas.height / 2),(canvas.width / 2)
); // Draws text w/ strokes, no fill + start coords

tempImage.addEventListener("load", () => {
  //console.log("image");
  ctx.drawImage(tempImage, (canvas.height / 2),(canvas.width / 4));
  //  initialCanvas();
}); 

// let initialCanvas = () => {
//   //drawImage
//   ctx.drawImage(tempImage, 0, 0/*, 233, 320*/);
//   // ctx.fillText("Test", (canvas.height / 2),(canvas.width / 2)); // draws & fills font + start coords
// };