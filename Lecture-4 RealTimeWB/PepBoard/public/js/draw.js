let isMouseDown = false;
//***********Undo stack****** */
let undoStack = [];
let redoStack = [];
function undoMaker() {
  if (undoStack.length > 0) {
    // remove most recent change
    redoStack.push(undoStack.pop());
    redraw();
    return true;
  }
  return false;
}

// **********************redo Stack
function redoMaker() {
  if (redoStack.length > 0) {
    undoStack.push(redoStack.pop());
    redraw();
    return true;
  }
  return false;
}
board.addEventListener("mousedown", function (e) {
  // start draw
  // console.log("mouse down");
  ctx.beginPath();
  let top = getLocation();
  // moves to a location without drawing
  ctx.moveTo(e.clientX, e.clientY - top);
  isMouseDown = true;

  let point = {
    x: e.clientX,
    y: e.clientY - top,
    identifier: "mousedown",
    color: ctx.strokeStyle,
    width: ctx.lineWidth
  };

  undoStack.push(point);

  socket.emit("mousedown", point);
  // event emit
});
// mmousedown x,y beginPath,moveTo(x,y),color,size
// mouseMove=> x1,y1, lineTo,stroke
board.addEventListener("mousemove", function (e) {
  if (isMouseDown == true) {
    // console.log("mousemove");
    // console.log(ctx);
    let top = getLocation();
    // draw a line from it's previous point to it 
    ctx.lineTo(e.clientX, e.clientY - top);
    ctx.stroke();
    let point = {
      x: e.clientX,
      y: e.clientY - top,
      identifier: "mousemove",
      color: ctx.strokeStyle,
      width: ctx.lineWidth
    };
    undoStack.push(point);
    console.log("Send mousemove event")
    socket.emit("mousemove", point);
  }
});

board.addEventListener("mouseup", function (e) {
  // console.log("Mouse up");
  isMouseDown = false;
});

const undo = document.querySelector(".undo");
const redo = document.querySelector(".redo");
let interval = null;

undo.addEventListener("mousedown", function () {
  // continously fires a function
  interval = setInterval(function () {
    if (undoMaker()) socket.emit("undo");
  }, 50);
});
undo.addEventListener("mouseup", function () {
  clearInterval(interval);
});
redo.addEventListener("mousedown", function () {
  interval = setInterval(function () {
    if (redoMaker()) socket.emit("redo");
  }, 50);
});
redo.addEventListener("mouseup", function () {
  clearInterval(interval);
});
function redraw() {
  // clear rect
  ctx.clearRect(0, 0, board.width, board.height);
// redraw
  for (let i = 0; i < undoStack.length; i++) {
    let { x, y, identifier, color, width } = undoStack[i];
    ctx.strokeStyle = color;
    ctx.lineWidth = width;
    if (identifier == "mousedown") {
      ctx.beginPath();
      ctx.moveTo(x, y);
    } else if (identifier == "mousemove") {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function getLocation() {
  // console.log(board.getBoundingClientRect());
  const { top } = board.getBoundingClientRect();
  return top;
}
