import {
    keyboardShortcuts
} from './action.js';

let tooltipElem;

const bucket = document.querySelector('.bucket');
const eyedropper = document.querySelector('.eyedropper');
const pencil = document.querySelector('.pencil');
const bucketAll = document.querySelector('.bucket_all');
const eraser = document.querySelector('.eraser');
const swapColors = document.querySelector('.swap_color');
const openButton = document.querySelector('.open_button');
const sizeButton = document.querySelectorAll('.size_button');
const saveAsGifButton = document.querySelector('.save_as_gif');
const saveAsApngButton = document.querySelector('.save_as_apng');
const HALF = 2;
const PADDING = 5

export function setTooltip(elem, text, key) {
    elem.dataset.tooltip = `${text} (${key})`;
}

export function addTooltip() {
    setTooltip(bucket, 'Fill bucket', keyboardShortcuts.bucket);
    setTooltip(eyedropper, 'Choose color', keyboardShortcuts.eyedropper);
    setTooltip(pencil, 'Pencil', keyboardShortcuts.pencil);
    setTooltip(bucketAll, 'Fill all pixel', keyboardShortcuts.bucketAll);
    setTooltip(eraser, 'Eraser', keyboardShortcuts.eraser);
    setTooltip(swapColors, 'Swap color', keyboardShortcuts.swapColors);
    setTooltip(openButton, 'Keyboard shortcuts', keyboardShortcuts.keyboardShortcutsWindow);
    sizeButton.forEach((elem) => {
        setTooltip(elem, 'Change canvas size', 'canvas will be cleared');
    });
    setTooltip(saveAsGifButton, 'Save animation as .gif', keyboardShortcuts.saveGif);
    setTooltip(saveAsApngButton, 'Save animation as .apng', keyboardShortcuts.saveApng);
}

document.onmouseover = (event) => {
    let target = event.target;

    let tooltipHtml = target.dataset.tooltip;
    if (!tooltipHtml && target.tagName !== 'HTML') {
        tooltipHtml = target.parentNode.dataset.tooltip;
        target = target.parentNode;
    }
    if (!tooltipHtml) return;

    tooltipElem = document.createElement('div');
    tooltipElem.className = 'tooltip';
    tooltipElem.innerHTML = tooltipHtml;
    document.body.append(tooltipElem);

    let coords = target.getBoundingClientRect();

    let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / HALF;
    if (left < 0) left = 0;

    let top = coords.top - tooltipElem.offsetHeight - PADDING;
    if (top < 0) {
        top = coords.top + target.offsetHeight + PADDING;
    }

    tooltipElem.style.left = left + 'px';
    tooltipElem.style.top = top + 'px';
};

document.onmouseout = (e) => {
    removeTooltip();
};

document.onclick = (e) => {
    removeTooltip();
};

function removeTooltip() {
    if (tooltipElem) {
        tooltipElem.remove();
        tooltipElem = null;
    }
}