const EN_LANG_INDEX = 1;
const RU_LANG_INDEX = 3;

const ROW1 = [
    ['Backquote', '`', '~', 'ё', 'Ё'],
    ['Digit1', '1', '!', '1', '!'],
    ['Digit2', '2', '@', '2', '"'],
    ['Digit3', '3', '#', '3', '№'],
    ['Digit4', '4', '$', '4', ';'],
    ['Digit5', '5', '%', '5', '%'],
    ['Digit6', '6', '^', '6', ':'],
    ['Digit7', '7', '&', '7', '?'],
    ['Digit8', '8', '*', '8', '*'],
    ['Digit9', '9', '(', '9', '('],
    ['Digit0', '0', ')', '0', ')'],
    ['Minus', '-', '_', '-', '_'],
    ['Equal', '=', '+', '=', '+'],
    ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace']
]
const ROW2 = [
    ['Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
    ['KeyQ', 'q', 'Q', 'й', 'Й'],
    ['KeyW', 'w', 'W', 'ц', 'Ц'],
    ['KeyE', 'e', 'E', 'у', 'У'],
    ['KeyR', 'r', 'R', 'к', 'К'],
    ['KeyT', 't', 'T', 'е', 'Е'],
    ['KeyY', 'y', 'Y', 'н', 'Н'],
    ['KeyU', 'u', 'U', 'г', 'Г'],
    ['KeyI', 'i', 'I', 'ш', 'Ш'],
    ['KeyO', 'o', 'O', 'щ', 'Щ'],
    ['KeyP', 'p', 'P', 'з', 'З'],
    ['BracketLeft', '[', '{', 'х', 'Х'],
    ['BracketRight', ']', '}', 'ъ', 'Ъ'],
    ['Backslash', '\\', '|', '\\', '/']
]

const ROW3 = [
    ['CapsLock', 'CapsLock', 'CapsLock', 'CapsLock', 'CapsLock'],
    ['KeyA', 'a', 'A', 'ф', 'Ф'],
    ['KeyS', 's', 'S', 'ы', 'Ы'],
    ['KeyD', 'd', 'D', 'в', 'В'],
    ['KeyF', 'f', 'F', 'а', 'А'],
    ['KeyG', 'g', 'G', 'п', 'П'],
    ['KeyH', 'h', 'H', 'р', 'Р'],
    ['KeyJ', 'j', 'J', 'о', 'О'],
    ['KeyK', 'k', 'K', 'л', 'Л'],
    ['KeyL', 'l', 'L', 'д', 'Д'],
    ['Semicolon', ';', ':', 'ж', 'Ж'],
    ['Quotes', '\'', '"', 'э', 'Э'],
    ['Enter', 'Enter', 'Enter', 'Enter', 'Enter']
]

const ROW4 = [
    ['ShiftLeft Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
    ['KeyZ', 'z', 'Z', 'я', 'Я'],
    ['KeyX', 'x', 'X', 'ч', 'Ч'],
    ['KeyC', 'c', 'C', 'с', 'С'],
    ['KeyV', 'v', 'V', 'м', 'М'],
    ['KeyB', 'b', 'B', 'и', 'И'],
    ['KeyN', 'n', 'N', 'т', 'Т'],
    ['KeyM', 'm', 'M', 'ь', 'Ь'],
    ['Comma', ',', '<', 'б', 'Б'],
    ['Period', '.', '>', 'ю', 'Ю'],
    ['Slash', '/', '?', '.', ','],
    ['ArrowUp', '↑', '↑', '↑', '↑'],
    ['ShiftRight Shift', 'Shift', 'Shift', 'Shift', 'Shift']
]

const ROW5 = [
    ['ControlLeft Control', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl'],
    ['MetaLeft', 'Win', 'Win', 'Win', 'Win'],
    ['AltLeft Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
    ['Space', ' ', ' ', ' ', ' '],
    ['AltRight Alt', 'Alt', 'Alt', 'Alt', 'Alt'],
    ['ArrowLeft', '←', '←', '←', '←'],
    ['ArrowDown', '↓', '↓', '↓', '↓'],
    ['ArrowRight', '→', '→', '→', '→'],
    ['ControlRight Control', 'Ctrl', 'Ctrl', 'Ctrl', 'Ctrl']
]

const keyboardArr = [ROW1, ROW2, ROW3, ROW4, ROW5];

let msg = '';
let shiftState = false;
let capsState = false;

if (localStorage.lang === undefined) {
    localStorage.lang = EN_LANG_INDEX;
}

function renderKeyboard() {
    window.onload = function () {
        let textArea = document.createElement('textarea');
        let keyboard = document.createElement('div');
        document.body.append(textArea);
        document.body.append(keyboard);
        textArea.className = 'text_area';
        keyboard.className = 'keyboard';

        textArea.blur();

        keyboardArr.forEach((rowArr, index) => {
            let row = document.createElement('div');
            keyboard.append(row);
            createRow(`row${index + 1}`, row, rowArr);
        })
    }
}

function createRow(rowName, rowWrapper, rowValue) {
    rowWrapper.className = rowName + ' row';
    rowValue.forEach(elem => {
        let key = document.createElement('div');
        rowWrapper.append(key);
        key.innerText = elem[localStorage.lang];
        key.className = elem[0] + ' key';
    });
}

function changeRegister(rowName, rowValue, shiftState, capsState) {
    let registerIndex = shiftState ? Number(localStorage.lang) + 1 : localStorage.lang;
    if (capsState) {
        registerIndex = shiftState ? localStorage.lang : Number(localStorage.lang) + 1;
    }
    let row = document.querySelector(`.${rowName}`);
    row.childNodes.forEach((key, index) => {
        key.innerText = rowValue[index][registerIndex];
    })
}

function print(input, key, keyValue, keyboardType, selectionText) {
    key.classList.add('active_key');

    switch (keyValue) {
        case 'Backspace':
            if (selectionText.start === selectionText.end) {
                msg = input.value.slice(0, selectionText.end - 1);
            }
            else {
                msg = input.value.slice(0, selectionText.start) + input.value.slice(selectionText.end);
            }
            break;
        case 'Enter':
            msg = input.value + '\n';
            break;
        case 'Tab':
            msg = input.value + '\t';
            break;
        case 'CapsLock':
            capsState = !capsState;
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            if (keyboardType === 'physical') {
                shiftState = true;
            }
            if (keyboardType === 'virtual') {
                shiftState = !shiftState;
            }
            break;
        case 'Space':
            msg = input.value + ' ';
            break;
        case 'ControlLeft':
        case 'ControlRight':
        case 'AltLeft':
        case 'AltRight':
            break;
        case 'MetaLeft':
            localStorage.lang = localStorage.lang == EN_LANG_INDEX ? RU_LANG_INDEX : EN_LANG_INDEX;
            break;
        default:
            if (keyboardType === 'physical') {
                msg = input.value + key.innerText;
            }
            if (keyboardType === 'virtual') {
                msg = input.value + document.querySelector('.' + keyValue).innerText;
                shiftState = false;
                document.querySelectorAll('.Shift').forEach(elem => {
                    elem.classList.remove('active_key');
                });
            }
            break;
    }
    input.value = msg;
    changeRegister('row1', ROW1, shiftState);
    changeRegister('row2', ROW2, shiftState, capsState);
    changeRegister('row3', ROW3, shiftState, capsState);
    changeRegister('row4', ROW4, shiftState, capsState);
}

renderKeyboard();

document.addEventListener('keydown', function (event) {
    let textArea = document.querySelector('.text_area');
    let rows = document.querySelectorAll('.key');
    textArea.blur();
    let selectionText = {
        start: textArea.selectionStart,
        end: textArea.selectionEnd
    }
    rows.forEach(key => {
        if (key.className.includes(event.code)) {
            let keyValue = event.code;
            let keyboardType = 'physical';
            print(textArea, key, keyValue, keyboardType, selectionText);
        }
    })
});

document.addEventListener('keyup', function (event) {

    let rows = document.querySelectorAll('.key');
    rows.forEach(key => {
        if (key.className.includes(event.code)) {
            key.classList.remove('active_key');
        }
        if (event.code.includes('Shift')) {
            shiftState = false;
        }
        if (event.code.includes('CapsLock') && capsState) {
            key.querySelector('.CapsLock').classList.add('active_key');
        }
    })
    changeRegister('row1', ROW1, shiftState);
    changeRegister('row2', ROW2, shiftState, capsState);
    changeRegister('row3', ROW3, shiftState, capsState);
    changeRegister('row4', ROW4, shiftState, capsState);
});
 
let body = document.querySelector('body');
body.addEventListener('mousedown', function (event) {
    let textArea = document.querySelector('.text_area');
    let value = event.target.className.split(' ')[0];
    if (event.target.className.includes('key') && event.target.className !== 'keyboard') {
        let keyboardType = 'virtual';
        let selectionText = {
            start: textArea.selectionStart,
            end: textArea.selectionEnd
        }
        print(textArea, event.target, value, keyboardType, selectionText);
    }
});

body.addEventListener('mouseup', function (event) {
    if (event.target.className.includes('key') && event.target.className !== 'keyboard') {
        event.target.classList.remove('active_key');
    }
    if (shiftState) {
        event.target.classList.add('active_key');
    }
    if (event.target.className.includes('CapsLock') && capsState) {
        event.target.classList.add('active_key');
    }
});