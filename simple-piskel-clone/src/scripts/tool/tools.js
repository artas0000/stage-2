import {activeTool} from '../action/action.js';

const DOUBLING_NUMBER = 2;
const DEFAULT_PIXEL_SIZE  = 1;
const MAX_PIXEL_SIZE  = 4;

if (localStorage.pixelSize === undefined) {
    localStorage.pixelSize = DEFAULT_PIXEL_SIZE;
}

export let currentPixelSize = localStorage.pixelSize;

export function setCurrentTool() {
    document.querySelectorAll('.tool').forEach(selector => {
        selector.style.color = '#0000008a';
    });
    document.querySelector(`.${activeTool}`).style.color = '#0000ff';
}

export function fillArea(x, y, newColor, oldColor, matrix) {
    let size = matrix.length;
    let color = '';
    if (x >= 0 && x < size && y >= 0 && y < size) {
        color = matrix[y][x];
    }
    if (x >= 0 && x < size && y >= 0 && y < size && color == oldColor && color != newColor) {
        matrix[y][x] = newColor;

        fillArea(x + 1, y, newColor, oldColor, matrix);
        fillArea(x - 1, y, newColor, oldColor, matrix);
        fillArea(x, y + 1, newColor, oldColor, matrix);
        fillArea(x, y - 1, newColor, oldColor, matrix);
    }
}

export function fillSameColor(newColor, oldColor, matrix) {
    let size = matrix.length;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (matrix[i][j] === oldColor) {
                matrix[i][j] = newColor
            };
        }
    }
}

export function drawPixel(x, y, pixelSize, color, matrix) {
    for (let i = 0; i < pixelSize; i++) {
        for (let j = 0; j < pixelSize; j++) {
            if (j + y < matrix.length && i + x < matrix.length)
            matrix[j + y][i + x] = color;
        }
    }
}

export function drawLine(xStart, xEnd, yStart, yEnd, color, matrix) {
    let deltaX = Math.abs(xEnd - xStart);
    let deltaY = Math.abs(yEnd - yStart);
    let signX = xStart < xEnd ? 1 : -1;
    let signY = yStart < yEnd ? 1 : -1;
    let deltaXY = deltaX - deltaY;
    drawPixel(xEnd, yEnd, currentPixelSize, color, matrix);
    while (xStart != xEnd || yStart != yEnd) {
        drawPixel(xStart, yStart, currentPixelSize, color, matrix);
        let doubleDeltaXY = deltaXY * DOUBLING_NUMBER;

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

export function setPixelSize(increment) {
    let possibleSize = Number(currentPixelSize) + increment;
    if (possibleSize <= MAX_PIXEL_SIZE && possibleSize >= DEFAULT_PIXEL_SIZE) {
        currentPixelSize = possibleSize;
    }
}

export function renderPixelSize() {
    document.querySelectorAll('.pixel_size button').forEach((elem) => {
        elem.classList.remove('active__pixel_size');
    });
    document.querySelector(`.pixel_${currentPixelSize}`).classList.add('active__pixel_size');
}

document.querySelector('.pixel_size').addEventListener('click', (event) => {
    let elem = event.target;
    if (elem.tagName === 'DIV') {
        elem = elem.parentNode;
    }
    document.querySelectorAll('.pixel_size button').forEach((elem) => {
        elem.classList.remove('active__pixel_size');
    });
    currentPixelSize = Number(elem.className.slice(-1));
    elem.classList.add('active__pixel_size');
});