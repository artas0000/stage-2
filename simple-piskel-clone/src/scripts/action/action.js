import {
    setCurrentColor
} from '../tool/color.js';
import {
    setCurrentTool,
    setPixelSize,
    renderPixelSize
} from '../tool/tools.js';
import {
    storedActiveFrame,
    addFrame,
    deleteFrame,
    copyFrame,
    renderFrames,
    setActiveFrame
} from '../frames/frame.js';
import {
    drawMatrix,
    storedMatrixList,
    mainCanvas
} from '../canvas/canvas.js';
import {
    fullScreen
} from '../animation/animation.js';
import {
    saveAsGIF
} from '../animation/saveAnimationAsGIF.js';
import {
    saveAsAPNG
} from '../animation/saveAnimationAsAPNG.js';
import {
    openCloseModalWindow
} from '../modalWindow/modalWindow.js'

if (localStorage.activeTool === undefined) {
    localStorage.activeTool = 'pencil';
}

const colorCurrent = document.querySelector('#current');
const colorPrev = document.querySelector('#prev');
const colorCurrentLabel = document.querySelector("label[for=current]");
const colorPrevLabel = document.querySelector("label[for=prev]");
const INCREMENT = 1;
const DECREMENT = -1;

export let activeTool = localStorage.activeTool;

export let keyboardShortcuts = {
    bucket: 'KeyB',
    bucketAll: 'KeyA',
    eyedropper: 'KeyC',
    pencil: 'KeyP',
    eraser: 'KeyE',
    swapColors: 'KeyX',
    pixelSizeIncrement: 'BracketRight',
    pixelSizeDecrement: 'BracketLeft',
    addNewFrame: 'KeyN',
    deleteFrame: 'Delete',
    duplicateFrame: 'KeyD',
    nextFrame: 'ArrowDown',
    prevFrame: 'ArrowUp',
    saveGif: 'KeyG',
    saveApng: 'KeyS',
    fullScreen: 'KeyF',
    keyboardShortcutsWindow: 'KeyH'
}

document.addEventListener('keydown', function (event) {
    switch (event.code) {
        case keyboardShortcuts.bucket:
            activeTool = 'bucket';
            setCurrentTool();
            break;
        case keyboardShortcuts.eyedropper:
            activeTool = 'eyedropper';
            setCurrentTool();
            break;
        case keyboardShortcuts.pencil:
            activeTool = 'pencil';
            setCurrentTool();
            break;
        case keyboardShortcuts.bucketAll:
            activeTool = 'bucket_all';
            setCurrentTool();
            break;
        case keyboardShortcuts.eraser:
            activeTool = 'eraser';
            setCurrentTool();
            break;
        case keyboardShortcuts.addNewFrame:
            addFrame();
            break;
        case keyboardShortcuts.deleteFrame:
            deleteFrame(storedActiveFrame);
            break;
        case keyboardShortcuts.duplicateFrame:
            copyFrame(storedActiveFrame);
            break;
        case keyboardShortcuts.swapColors:
            setCurrentColor(colorPrev.value);
            break;
        case keyboardShortcuts.keyboardShortcutsWindow:
            openCloseModalWindow();
            break;
        case keyboardShortcuts.nextFrame:
            setActiveFrame(INCREMENT);
            break;
        case keyboardShortcuts.prevFrame:
            setActiveFrame(DECREMENT);
            break;
        case keyboardShortcuts.pixelSizeIncrement:
            setPixelSize(INCREMENT);
            renderPixelSize();
            break;
        case keyboardShortcuts.pixelSizeDecrement:
            setPixelSize(DECREMENT);
            renderPixelSize();
            break;
        case keyboardShortcuts.saveGif:
            saveAsGIF();
            break;
        case keyboardShortcuts.saveApng:
            saveAsAPNG();
            break;
        case keyboardShortcuts.fullScreen:
            fullScreen();
            break;
        default:
            break;
    }
    renderFrames();
    drawMatrix(mainCanvas, storedMatrixList[storedActiveFrame]);
});

document.querySelector('.bucket').addEventListener('click', function (event) {
    activeTool = 'bucket';
    setCurrentTool();
});

document.querySelector('.bucket_all').addEventListener('click', function (event) {
    activeTool = 'bucket_all';
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

document.querySelector('.eraser').addEventListener('click', function (event) {
    activeTool = 'eraser';
    setCurrentTool();
});

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

document.querySelector('.swap_color').addEventListener('click', function (event) {
    setCurrentColor(colorPrev.value);
});

document.querySelector('.prev_color').addEventListener('click', function (event) {
    setCurrentColor(colorPrev.value);
});