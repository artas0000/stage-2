const canvas = document.querySelector(".canvas");
const size_4x4 = document.querySelector(".size_4x4");
const size_32x32 = document.querySelector(".size_32x32");
const size_64x64 = document.querySelector(".size_64x64");
const range = document.querySelector('#range');
const span = document.querySelectorAll('span');
const colorCurrent = document.querySelector('#current');
const colorPrev = document.querySelector('#prev');
const colorCurrentLabel = document.querySelector("label[for=current]");
const colorPrevLabel = document.querySelector("label[for=prev]");

if (localStorage.currentColor === undefined) {
    localStorage.currentColor = colorCurrent.value;
}

if (localStorage.prevColor === undefined) {
    localStorage.prevColor = colorPrev.value;
}

if (localStorage.activeTool === undefined) {
    localStorage.activeTool = 'pencil';
}

if (localStorage.matrix === undefined) {
    let matrix = [
        ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        ["#ffffff", "#ffffff", "#ffffff", "#ffffff"],
        ["#ffffff", "#ffffff", "#ffffff", "#ffffff"]
    ]
    localStorage.matrix = JSON.stringify(matrix);
}
let storedMatrix = JSON.parse(localStorage.matrix);
let activeTool = localStorage.activeTool;

const ctx = canvas.getContext('2d');
canvas.height = 512;
canvas.width = 512;


window.onload = () => {
    setCurrentTool();
    colorCurrent.value = localStorage.currentColor;
    colorCurrentLabel.style.background = localStorage.currentColor;
    colorPrev.value = localStorage.prevColor;
    colorPrevLabel.style.background = localStorage.prevColor;

    drawMatrix();
}

window.onbeforeunload = () => {
    localStorage.activeTool = activeTool;
    localStorage.matrix = JSON.stringify(storedMatrix);
    localStorage.prevColor = colorPrev.value;
    localStorage.currentColor = colorCurrent.value;
}

range.addEventListener('change', changeSize)

function changeSize() {
    canvas.height = range.value;
    canvas.width = range.value;
    canvas.style.width = `${range.value}px`;
    canvas.style.height = `${range.value}px`;
    span.forEach(e => {
        e.innerHTML = range.value;
    });
    drawMatrix();
}

function drawMatrix() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    let heightPixel = canvas.height / storedMatrix.length;
    let widthPixel = canvas.width / storedMatrix.length;
    let y = 0;
    let x = 0;
    storedMatrix.forEach(element => {
        element.forEach(e => {
            ctx.fillStyle = e;
            ctx.fillRect(x, y, widthPixel, heightPixel);
            x += widthPixel;
        });
        x = 0;
        y += heightPixel;
    });
}

size_4x4.addEventListener('click', () => {
    changeMatrixSize(4);
});

size_32x32.addEventListener('click', () => {
    changeMatrixSize(32);
});

size_64x64.addEventListener('click', () => {
    changeMatrixSize(64);
});

function changeMatrixSize(widthMatrix) {
    let matrix = [];
    for (let i = 0; i < widthMatrix; i++) {
        matrix[i] = [];
        for (let j = 0; j < widthMatrix; j++) {
            matrix[i][j] = '#ffffff';
        }
    }
    storedMatrix = matrix;
    drawMatrix();
}

let isDrawing = false;

document.querySelector('.bucket').addEventListener('click', function (event) {
    activeTool = 'bucket';
    setCurrentTool();
});

document.querySelector('.eyedropper').addEventListener('click', function (event) {
    activeTool = 'eyedropper';
    setCurrentTool();
});

document.querySelector('.pencil').addEventListener('click', function (event) {
    activeTool = 'pencil';
    setCurrentTool();
});

document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case 'KeyB':
            activeTool = 'bucket';
            setCurrentTool();
            break;
        case 'KeyC':
            activeTool = 'eyedropper';
            setCurrentTool();
            break;
        case 'KeyP':
            activeTool = 'pencil';
            setCurrentTool();
            break;
        default:
            break;
    }
})

function setCurrentTool() {
    document.querySelectorAll('.tool').forEach(selector => {
        selector.style.color = '#0000008a';
    });
    document.querySelector(`.${activeTool}`).style.color = '#0000ff';
    document.querySelector(`.${activeTool}`).style.color = '#0000ff';
    document.querySelector(`.${activeTool}`).style.color = '#0000ff';

}

let stack = [];
canvas.addEventListener("mousedown", function (event) {
    let pixel = findPixel(canvas.width, event.offsetX, event.offsetY);
    let x = pixel.x;
    let y = pixel.y;
    switch (activeTool) {
        case 'pencil':
            storedMatrix[y][x] = colorCurrent.value;
            stack = [];
            isDrawing = true;
            break;
        case 'bucket':
            fillArea(x, y, colorCurrent.value, storedMatrix[y][x])
            break;
        case 'eyedropper':
            if (colorCurrent.value !== storedMatrix[y][x]) {
                setCurrentColor(storedMatrix[y][x]);
            }
            break;
        default:
            break;
    }
    drawMatrix();
});

canvas.addEventListener("mouseup", function (event) {
    isDrawing = false;
    stack = [];
});

canvas.addEventListener("mouseover", function (event) {
    isDrawing = false;
    stack = [];
});

canvas.addEventListener("mousemove", function (event) {
    if (isDrawing) {
        let pixel = findPixel(canvas.width, event.offsetX, event.offsetY);
        if (stack.length === 2) {
            if (Math.abs(stack[0].x - stack[1].x) > 1 || Math.abs(stack[0].y - stack[1].y) > 1) {
                drawLine(stack[0].x, stack[1].x, stack[0].y, stack[1].y);
            }
            stack.shift()
        }
        stack.push(pixel);
        storedMatrix[pixel.y][pixel.x] = colorCurrent.value;
        drawMatrix();
    }
});

function drawLine(xStart, xEnd, yStart, yEnd) {
    let deltaX = Math.abs(xEnd - xStart);
    let deltaY = Math.abs(yEnd - yStart);
    let signX = xStart < xEnd ? 1 : -1;
    let signY = yStart < yEnd ? 1 : -1;
    let deltaXY = deltaX - deltaY;
    storedMatrix[yEnd][xEnd] = colorCurrent.value;
    while (xStart != xEnd || yStart != yEnd) {
        storedMatrix[yStart][xStart] = colorCurrent.value;
        let doubleDeltaXY = deltaXY * 2;
        
        if (doubleDeltaXY > -deltaY) {
            deltaXY -= deltaY;
            xStart += signX;
        }
        if (doubleDeltaXY < deltaX) {
            deltaXY += deltaX;
            yStart += signY;
        }
    }
}

function findPixel(width, offsetX, offsetY) {
    let pixel = {
        x: 0,
        y: 0
    }
    for (let i = width / storedMatrix.length, count = 0; i <= width; i += width / storedMatrix.length) {
        if (offsetX <= i) {
            pixel.x = count;
            break;
        }
        count++;
    }
    for (let i = width / storedMatrix[0].length, count = 0; i <= width; i += width / storedMatrix.length) {
        if (offsetY <= i) {
            pixel.y = count;
            break;
        }
        count++;
    }
    return pixel;
}

function fillArea(x, y, newColor, oldColor) {
    let size = storedMatrix.length;
    let color = storedMatrix[y][x];
    if (x >= 0 && x <= size && y >= 0 && y < size && color == oldColor && color != newColor) {
        storedMatrix[y][x] = newColor;

        fillArea(x + 1, y, newColor, oldColor);
        fillArea(x - 1, y, newColor, oldColor);
        fillArea(x, y + 1, newColor, oldColor);
        fillArea(x, y - 1, newColor, oldColor);
    }
}

colorCurrent.addEventListener("change", function () {
    colorPrevLabel.style.background = colorCurrentLabel.style.background;
    colorCurrentLabel.style.background = colorCurrent.value;
    colorPrev.value = localStorage.currentColor;
    colorPrevLabel.style.background = colorPrev.value;
    localStorage.currentColor = colorCurrent.value;
    localStorage.prevColor = colorPrev.value;
});

colorPrev.addEventListener("change", function () {
    colorPrevLabel.style.background = colorPrev.value;
});

document.querySelector('.prev_color').addEventListener('click', function (event) {
    setCurrentColor(colorPrev.value);
})

document.querySelector('.red_color').addEventListener('click', function (event) {
    if (colorCurrent.value !== '#ff0000') {
        setCurrentColor('#ff0000');
    }
})

document.querySelector('.blue_color').addEventListener('click', function (event) {
    if (colorCurrent.value !== '#0000ff') {
        setCurrentColor('#0000ff');
    }
})

function setCurrentColor(color) {
    colorPrevLabel.style.background = colorCurrentLabel.style.background;
    colorCurrentLabel.style.background = color;
    colorPrev.value = colorCurrent.value;
    colorCurrent.value = color;
    localStorage.prevColor = colorPrev.value;
    localStorage.currentColor = colorCurrent.value;
}