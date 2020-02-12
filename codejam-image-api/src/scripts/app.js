const canvas = document.querySelector(".canvas");
const sizeButton = document.querySelectorAll('.size_button');
const size_4x4 = document.querySelector(".size_4x4");
const size_32x32 = document.querySelector(".size_32x32");
const size_64x64 = document.querySelector(".size_64x64");
const size_128x128 = document.querySelector(".size_128x128");
const size_256x256 = document.querySelector(".size_256x256");
const size_512x512 = document.querySelector(".size_512x512");
const colorCurrent = document.querySelector('#current');
const colorPrev = document.querySelector('#prev');
const colorCurrentLabel = document.querySelector("label[for=current]");
const colorPrevLabel = document.querySelector("label[for=prev]");
const loadButton = document.querySelector('#load__image_button');
const blackWhiteButton = document.querySelector('#black__white_button');
const searchInput = document.querySelector('#search__input');
const API_KEY = '08cd3ec140935790d30cb0f05a3287fe52883c3e3e210f0ba8a1f2a3e724bac4';


if (localStorage.currentColor === undefined) {
    localStorage.currentColor = colorCurrent.value;
}

if (localStorage.prevColor === undefined) {
    localStorage.prevColor = colorPrev.value;
}

if (localStorage.activeTool === undefined) {
    localStorage.activeTool = 'pencil';
}

if (localStorage.imageURL === undefined) {
    localStorage.imageURL = '';
}


if (localStorage.canvasSize === undefined) {
    localStorage.canvasSize = 128;
}

if (localStorage.isMonochrome === undefined) {
    localStorage.isMonochrome = false;
}

if (localStorage.matrix === undefined) {
    let matrix = [
        ["#ffffff00", "#ffffff00", "#ffffff00", "#ffffff00"],
        ["#ffffff00", "#ffffff00", "#ffffff00", "#ffffff00"],
        ["#ffffff00", "#ffffff00", "#ffffff00", "#ffffff00"],
        ["#ffffff00", "#ffffff00", "#ffffff00", "#ffffff00"]
    ]

    localStorage.matrix = JSON.stringify(matrix);
}
let storedMatrix = JSON.parse(localStorage.matrix);
let activeTool = localStorage.activeTool;
let imageURL = localStorage.imageURL;
let isMonochrome = localStorage.isMonochrome;



const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

canvas.height = localStorage.canvasSize;
canvas.width = localStorage.canvasSize;

window.onload = function () {
    setCurrentTool();
    colorCurrent.value = localStorage.currentColor;
    colorCurrentLabel.style.background = localStorage.currentColor;
    colorPrev.value = localStorage.prevColor;
    colorPrevLabel.style.background = localStorage.prevColor;
    sizeButton.forEach(button => {
        if (button.className.includes(canvas.width + 'x' + canvas.height)) {
            button.classList.add('active_button');
        }
    })
    drawImageOnCanvas();
}

window.onbeforeunload = () => {
    localStorage.activeTool = activeTool;
    localStorage.matrix = JSON.stringify(storedMatrix);
    localStorage.prevColor = colorPrev.value;
    localStorage.currentColor = colorCurrent.value;
    localStorage.canvasSize = canvas.width;
    localStorage.imageURL = imageURL;
    localStorage.isMonochrome = isMonochrome;
}

function drawMatrix() {
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

function drawImageOnCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.crossOrigin = "Anonymous";
    if (imageURL !== '') {
        img.src = imageURL;
        img.onload = function () {
            if (img.width === img.height) {
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            } else if (img.width > img.height) {
                ctx.drawImage(img, 0, (canvas.width - (img.height * canvas.width) / img.width) / 2,
                    canvas.width, (img.height * canvas.width) / img.width);
            } else if (img.width < img.height) {
                ctx.drawImage(img, (canvas.width - (img.width * canvas.width) / img.height) / 2,
                    0, (img.width * canvas.width) / img.height, canvas.width);
            }
            if (isMonochrome === 'true') {
                setMonochromeStyle();
            }
            drawMatrix();
        }
    } else {
        drawMatrix();
    }

}

async function getImageByLink() {
    const url = `https://api.unsplash.com/photos/random?query=town,${searchInput.value}&client_id=${API_KEY}`;
    let response = await fetch(url);
    let data = await response.json();
    imageURL = data.urls.small;
    drawImageOnCanvas();
}

function changeSizeCanvas(widthMatrix) {
    canvas.width = widthMatrix;
    canvas.height = widthMatrix;
    sizeButton.forEach(button => {
        if (button.className.includes(canvas.width + 'x' + canvas.height)) {
            button.classList.add('active_button');
        }
    })
    let matrix = [];
    for (let i = 0; i < widthMatrix; i++) {
        matrix[i] = [];
        for (let j = 0; j < widthMatrix; j++) {
            matrix[i][j] = '#ffffff00';
        }
    }
    storedMatrix = matrix;
}

function setMonochromeStyle() {
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let pix = imageData.data;
    for (let i = 0, n = pix.length; i < n; i += 4) {
        let grayscale = pix[i] * .3 + pix[i + 1] * .59 + pix[i + 2] * .11;
        pix[i] = grayscale;
        pix[i + 1] = grayscale;
        pix[i + 2] = grayscale;
    }
    ctx.putImageData(imageData, 0, 0);
}

loadButton.addEventListener('click', () => {
    isMonochrome = false;
    changeSizeCanvas(canvas.width);
    getImageByLink();
});

blackWhiteButton.addEventListener('click', () => {
    if (isMonochrome === 'false') {
        isMonochrome = true;
    } else if (isMonochrome === 'true') {
        isMonochrome = false;
    }
    setMonochromeStyle();
})

size_4x4.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(4);
    drawImageOnCanvas();
});

size_32x32.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(32);
    drawImageOnCanvas();
});

size_64x64.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(64);
    drawImageOnCanvas();
});

size_128x128.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(128);
    drawImageOnCanvas();
});

size_256x256.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(256);
    drawImageOnCanvas();
});

size_512x512.addEventListener('click', () => {
    sizeButton.forEach(button => {
        button.classList.remove('active_button');
    });
    changeSizeCanvas(512);
    drawImageOnCanvas();
});

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
    let pixelSize = 512 / storedMatrix.length;

    for (let i = pixelSize, count = 0; i <= 512; i += pixelSize) {
        if (offsetX <= i) {
            pixel.x = count;
            break;
        }
        count++;
    }
    for (let i = pixelSize, count = 0; i <= 512; i += pixelSize) {
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