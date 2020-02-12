import {} from './animationSaveScripts/LZWEncoder.js';
import {} from './animationSaveScripts/NeuQuant.js';
import {} from './animationSaveScripts/GIFEncoder.js';
import {} from './animationSaveScripts/b64.js';
import {
    framesList
} from '../frames/frame.js';
import {
    FPS
} from './animation.js';

const saveAsGifButton = document.querySelector('.save_as_gif');
const MILLISECOND_IN_SECOND = 1000;

let encoder = new GIFEncoder();

saveAsGifButton.addEventListener('click', saveAsGIF);

export function saveAsGIF() {
    encoder.setRepeat(0);
    encoder.setDelay(MILLISECOND_IN_SECOND / FPS);
    encoder.start();
    framesList.forEach((frame) => {
        const context = frame.canvasElem.getContext('2d');
        encoder.addFrame(context);
    });
    encoder.finish();
    encoder.download("animation.gif");
}