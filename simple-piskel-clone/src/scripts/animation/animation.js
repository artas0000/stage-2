import {
    storedMatrixList,
    drawMatrix
} from '../canvas/canvas.js';
import {
    storedCountFrame
} from '../frames/frame.js';

export const animationCanvas = document.querySelector('.animation_canvas');
const FPSRange = document.querySelector('#FPS_range');
const FPSLabel = document.querySelector('.FPS_label');
const fullscreenButton =  document.querySelector('.fullscreen_button');
const CANVAS_SIZE = 512;
const MILLISECOND_IN_SECOND = 1000;

export let FPS = FPSRange.value;
FPSLabel.innerText = `FPS: ${FPS}`;

FPSRange.addEventListener('input', () => {
    FPS = FPSRange.value;
    FPSLabel.innerText = `FPS: ${FPS}`;
    startAnimating(FPS);
});
animationCanvas.width = CANVAS_SIZE;
animationCanvas.height = CANVAS_SIZE;

let stepFrame = 0;

export function zeroingStepFrame() {
    stepFrame = 0;
}

var stop = false;
let fpsInterval, startTime, now, then, elapsed;

function animate() {
    if (stop) {
        return;
    }
    requestAnimationFrame(animate);
    now = Date.now();
    elapsed = now - then;
    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        drawMatrix(animationCanvas, storedMatrixList[stepFrame]);
        if (stepFrame < storedCountFrame - 1) {
            stepFrame += 1;
        } else {
            stepFrame = 0;
        }
    }
}

startAnimating(FPS);

function startAnimating(fps) {
    fpsInterval = MILLISECOND_IN_SECOND / fps;
    then = Date.now();
    startTime = then;
    animate();
}

fullscreenButton.addEventListener('click', fullScreen);

export function fullScreen() {
    if ("fullscreenEnabled" in document || "webkitFullscreenEnabled" in document) {
        if (document.fullscreenEnabled || document.webkitFullscreenEnabled) {
            console.log("User allows fullscreen");
            let element = animationCanvas;
            if ("requestFullscreen" in element) {
                element.requestFullscreen();
            } else if ("webkitRequestFullscreen" in element) {
                element.webkitRequestFullscreen();
            }
        }
    } else {
        console.log("User doesn't allow full screen");
    }
}

function screenChange() {
    if (document.fullscreenElement || document.webkitFullscreenElement) {
        console.log("Current full screen element is : " + (document.fullscreenElement || document.webkitFullscreenElement))
    } else {
        if ("exitFullscreen" in document) {
            document.exitFullscreen();
        } else if ("webkitExitFullscreen" in document) {
            document.webkitExitFullscreen();
        }
    }
}

document.addEventListener("fullscreenchange", screenChange);
document.addEventListener("webkitfullscreenchange", screenChange);
