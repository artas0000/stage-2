import {
    mainCanvas,
    storedMatrixList,
    drawMatrix,
    changeSizeCanvas,
    findPixel
} from './canvas/canvas.js';
import {
    setCurrentColor
} from './tool/color.js';
import {
    setCurrentTool,
    fillArea,
    fillSameColor,
    drawLine,
    drawPixel,
    currentPixelSize
} from './tool/tools.js';
import {
    activeTool
} from './action/action.js';
import {
    addTooltip
} from './action/tooltip.js';
import {
    storedActiveFrame,
    storedCountFrame,
    addFrameElem,
    renderFrames
} from './frames/frame.js';

const sizeButton = document.querySelectorAll('.size_button');
const size_32x32 = document.querySelector(".size_32x32");
const size_64x64 = document.querySelector(".size_64x64");
const size_128x128 = document.querySelector(".size_128x128");
const colorCurrent = document.querySelector('#current');
const colorPrev = document.querySelector('#prev');
const colorCurrentLabel = document.querySelector("label[for=current]");
const colorPrevLabel = document.querySelector("label[for=prev]");
const DEFAULT_MATRIX_SIZE  = 32;
// const DEFAULT_PIXEL_SIZE  = 1;
const RIGHT_MOUSE_BUTTON_WHICH = 3;

if (localStorage.currentColor === undefined) {
    localStorage.currentColor = colorCurrent.value;
}

if (localStorage.prevColor === undefined) {
    localStorage.prevColor = colorPrev.value;
}

if (localStorage.canvasSize === undefined) {
    localStorage.canvasSize = DEFAULT_MATRIX_SIZE;
}

window.onload = function () {
    setCurrentTool();
    for (let i = 0; i < storedCountFrame; i++) {
        addFrameElem();
    }
    colorCurrent.value = localStorage.currentColor;
    colorCurrentLabel.style.background = localStorage.currentColor;
    colorPrev.value = localStorage.prevColor;
    colorPrevLabel.style.background = localStorage.prevColor;
    sizeButton.forEach(button => {
        if (button.className.includes(localStorage.canvasSize + 'x' + localStorage.canvasSize)) {
            button.classList.add('active_button');
        }
    })
    document.querySelector(`.pixel_${localStorage.pixelSize}`).classList.add('active__pixel_size');
    drawMatrix(mainCanvas, storedMatrixList[storedActiveFrame]);
    renderFrames();
    addTooltip();
}

window.onbeforeunload = () => {
    localStorage.activeTool = activeTool;
    localStorage.countFrames = storedCountFrame;
    localStorage.activeFrame = storedActiveFrame;
    localStorage.matrixList = JSON.stringify(storedMatrixList);
    localStorage.prevColor = colorPrev.value;
    localStorage.currentColor = colorCurrent.value;
    localStorage.canvasSize = storedMatrixList[0].length;
    localStorage.pixelSize = currentPixelSize;
}

size_32x32.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(32);
    drawMatrix(mainCanvas, storedMatrixList[storedActiveFrame]);
    renderFrames();
});

size_64x64.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(64);
    drawMatrix(mainCanvas, storedMatrixList[storedActiveFrame]);
    renderFrames();
});

size_128x128.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(128);
    drawMatrix(mainCanvas, storedMatrixList[storedActiveFrame]);
    renderFrames();
});

let isDrawing = false;

let stack = [];
mainCanvas.addEventListener("mousedown", function (event) {
    let currentMatrix = storedMatrixList[storedActiveFrame];
    let pixel = findPixel(event.offsetX, event.offsetY, currentMatrix);
    let color = colorCurrent.value;
    if (event.which === RIGHT_MOUSE_BUTTON_WHICH) color = colorPrev.value;
    if (activeTool === 'eraser') color = '#ffffff00';
    let x = pixel.x;
    let y = pixel.y;
    switch (activeTool) {
        case 'eraser':
        case 'pencil':
            drawPixel(x, y, currentPixelSize, color, currentMatrix);
            stack = [];
            isDrawing = true;
            break;
        case 'bucket':
            fillArea(x, y, color, currentMatrix[y][x], currentMatrix);
            break;
        case 'bucket_all':
            fillSameColor(color, currentMatrix[y][x], currentMatrix);
            break;
        case 'eyedropper':
            if (colorCurrent.value !== currentMatrix[y][x]) {
                setCurrentColor(currentMatrix[y][x]);
            }
            break;
        default:
            break;
    }
    drawMatrix(mainCanvas, currentMatrix);
});

mainCanvas.addEventListener("mouseup", function (event) {
    isDrawing = false;
    stack = [];
    renderFrames();
});

mainCanvas.addEventListener("mouseover", function (event) {
    isDrawing = false;
    stack = [];
});

mainCanvas.oncontextmenu = () => {
    return false;
};

mainCanvas.addEventListener("mousemove", function (event) {
    let color = colorCurrent.value;
    if (event.which === RIGHT_MOUSE_BUTTON_WHICH) color = colorPrev.value;
    if (activeTool === 'eraser') color = '#ffffff00';
    if (isDrawing) {
        let pixel = findPixel(event.offsetX, event.offsetY, storedMatrixList[storedActiveFrame]);
        if (stack.length === 2) {
            if (Math.abs(stack[0].x - stack[1].x) > 1 || Math.abs(stack[0].y - stack[1].y) > 1) {
                drawLine(stack[0].x, stack[1].x, stack[0].y, stack[1].y, color, storedMatrixList[storedActiveFrame]);
            }
            stack.shift()
        }
        stack.push(pixel);
        drawPixel(pixel.x, pixel.y, currentPixelSize, color, storedMatrixList[storedActiveFrame])
        drawMatrix(mainCanvas, storedMatrixList[storedActiveFrame]);
    }
});