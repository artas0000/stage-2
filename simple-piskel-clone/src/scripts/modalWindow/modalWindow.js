import {keyboardShortcuts} from '../action/action.js'

const modal = document.querySelector('.modal_window');
const modalOverlay = document.querySelector('.modal_overlay');
const closeButton = document.querySelector('.close_button');
const openButton = document.querySelector('.open_button');
const cheatsheetKey = document.querySelectorAll('.cheatsheet_key');

closeButton.addEventListener('click', openCloseModalWindow);

openButton.addEventListener('click', () => {
    openCloseModalWindow();
    renderCheatsheetKey();
});

export function openCloseModalWindow() {
    modal.classList.toggle('closed');
    modalOverlay.classList.toggle('closed');
}

function renderCheatsheetKey() {
    let keys = Object.keys(keyboardShortcuts);
    cheatsheetKey.forEach((elem, index) => {
        elem.innerText = keyboardShortcuts[keys[index]];
    });
}