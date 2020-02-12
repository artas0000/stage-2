const UPNG = require('UPNG-js');
const download = require('downloadjs');
const saveAsApngButton = document.querySelector('.save_as_apng');

import {
    framesList
} from '../frames/frame.js';
import {
    FPS
} from './animation.js';

const CANVAS_SIZE = 512;
const MILLISECOND_IN_SECOND = 1000;

saveAsApngButton.addEventListener('click', saveAsAPNG);

export function saveAsAPNG() {
    let arrayBuffer = [];
    let arrayFrameTime = new Array(framesList.length).fill(MILLISECOND_IN_SECOND / FPS);
    framesList.forEach((frame) => {
        const context = frame.canvasElem.getContext('2d');
        let imageData = context.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        let buffer = imageData.data.buffer;
        arrayBuffer.push(buffer);
    });
    let apng = UPNG.encode(arrayBuffer, CANVAS_SIZE, CANVAS_SIZE, 0, arrayFrameTime);
    download(apng, 'animation.apng', 'apng');
}