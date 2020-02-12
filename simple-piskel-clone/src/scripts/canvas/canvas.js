export const mainCanvas = document.querySelector(".canvas");
const sizeButton = document.querySelectorAll('.size_button');
const CANVAS_SIZE = 512;
const DEFAULT_MATRIX_SIZE  = 32;

if (localStorage.matrixList === undefined) {
    let matrixList = [];
    matrixList.push(addClearMatrix(DEFAULT_MATRIX_SIZE));
    localStorage.matrixList = JSON.stringify(matrixList);
}

export let storedMatrixList = JSON.parse(localStorage.matrixList);


mainCanvas.height = CANVAS_SIZE;
mainCanvas.width = CANVAS_SIZE;

export function addClearMatrix(size) {
    return new Array(size).fill().map(() => {
        const arr = new Array(size).fill('#ffffff00');
        return arr;
    });
}

export function drawMatrix(canvas, matrix) {
    const ctx = canvas.getContext('2d');
    ctx.imageSmoothingEnabled = false;
    let heightPixel = canvas.height / matrix.length;
    let widthPixel = canvas.width / matrix.length;
    let y = 0;
    let x = 0;
    ctx.clearRect(x, y, canvas.width, canvas.height)
    matrix.forEach(element => {
        element.forEach(e => {
            ctx.fillStyle = e;
            ctx.fillRect(x, y, widthPixel, heightPixel);
            x += widthPixel;
        });
        x = 0;
        y += heightPixel;
    });
}

export function changeSizeCanvas(widthMatrix) {
    sizeButton.forEach(button => {
        if (button.className.includes(widthMatrix + 'x' + widthMatrix)) {
            button.classList.add('active_button');
        }
    })
    for (let i = 0; i < storedMatrixList.length; i++) {
        storedMatrixList[i] = addClearMatrix(widthMatrix);
    }
}

export function findPixel(offsetX, offsetY, matrix) {
    let pixel = {
        x: 0,
        y: 0
    }
    let pixelSize = CANVAS_SIZE / matrix.length;

    for (let i = pixelSize, count = 0; i <= CANVAS_SIZE; i += pixelSize) {
        if (offsetX <= i) {
            pixel.x = count;
            break;
        }
        count++;
    }
    for (let i = pixelSize, count = 0; i <= CANVAS_SIZE; i += pixelSize) {
        if (offsetY <= i) {
            pixel.y = count;
            break;
        }
        count++;
    }
    return pixel;
}