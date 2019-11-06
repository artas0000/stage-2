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
    ['KeyA', 'a', 'A', '1', 'Ё'],
    ['KeyS', 's', 'S', '2', 'Ё'],
    ['KeyD', 'd', 'D', '3', 'Ё'],
    ['KeyF', 'f', 'F', '4', 'Ё'],
    ['KeyG', 'g', 'G', '5', 'Ё'],
    ['KeyH', 'h', 'H', '6', 'Ё'],
    ['KeyJ', 'j', 'J', '7', 'Ё'],
    ['KeyK', 'k', 'K', '8', 'Ё'],
    ['KeyL', 'l', 'L', '9', 'Ё'],
    ['Semicolon', ';', ':', '0', 'Ё'],
    ['Quotes', '\'', '"', '-', '_'],
    ['Enter', 'Enter', 'Enter', 'Enter', 'Enter']
]

const ROW4 = [
    ['ShiftLeft Shift', 'Shift', 'Shift', 'Shift', 'Shift'],
    ['KeyZ', 'z', 'Z', '1', 'Ё'],
    ['KeyX', 'x', 'X', '2', 'Ё'],
    ['KeyC', 'c', 'C', '3', 'Ё'],
    ['KeyV', 'v', 'V', '4', 'Ё'],
    ['KeyB', 'b', 'B', '5', 'Ё'],
    ['KeyN', 'n', 'N', '6', 'Ё'],
    ['KeyM', 'm', 'M', '7', 'Ё'],
    ['Comma', ',', '<', '8', 'Ё'],
    ['Period', '.', '>', '9', 'Ё'],
    ['Slash', '/', '?', '0', 'Ё'],
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

let msg = '';
let shiftState = false;
let capsState = false;

window.onload = function () {
    let textArea = document.createElement('textarea');
    let keyboard = document.createElement('div');
    document.body.append(textArea);
    document.body.append(keyboard);
    textArea.className = 'text_area';
    keyboard.className = 'keyboard';

    textArea.blur();

    let row1 = document.createElement('div');
    let row2 = document.createElement('div');
    let row3 = document.createElement('div');
    let row4 = document.createElement('div');
    let row5 = document.createElement('div');
    keyboard.append(row1);
    keyboard.append(row2);
    keyboard.append(row3);
    keyboard.append(row4);
    keyboard.append(row5);
    createRow('row1', row1, ROW1);
    createRow('row2', row2, ROW2);
    createRow('row3', row3, ROW3);
    createRow('row4', row4, ROW4);
    createRow('row5', row5, ROW5);
}

function createRow(rowName, rowWrapper, rowValue) {
    rowWrapper.className = rowName + ' row';
    rowValue.forEach(elem => {
        let key = document.createElement('div');
        rowWrapper.append(key);
        key.innerText = elem[1];
        key.className = elem[0] + ' key';
    });
}

function changRegister(rowName, rowValue, shiftState, capsState) {
    let registerIndex = 1;
    if (shiftState) {
        registerIndex = 2;
    }
    if (capsState && !shiftState) {
        registerIndex = 2;
    } else if (capsState && shiftState) {
        registerIndex = 1;
    }
    const row = document.querySelector(`.${rowName}`);
    row.childNodes.forEach((key, index) => {
        key.innerText = rowValue[index][registerIndex];
    })
}

document.addEventListener('keydown', function (event) {
    const textArea = document.querySelector('.text_area');
    textArea.blur();

    const rows = document.querySelectorAll('.key');
    rows.forEach(key => {
        if (key.className.includes(event.code)) {
            key.style.borderRadius = '20px';
            key.style.background = '#346bd1';
            let value = event.code;
            switch (value) {
                case 'Backspace':
                    msg = textArea.value.slice(0, -1);
                    break;
                case 'Enter':
                    msg = textArea.value + '\n';
                    break;
                case 'Tab':
                    textArea.focus();
                    msg = textArea.value + '\t';
                    textArea.blur();
                    break;
                case 'CapsLock':
                    capsState = capsState ? false : true;
                    break;
                case 'ShiftLeft':
                    shiftState = true;
                    break;
                case 'ShiftRight':
                    shiftState = true;
                    break;
                case 'Space':
                    msg = textArea.value + ' ';
                    break;
                case 'ControlLeft':
                    break;
                case 'ControlRight':
                    break;
                case 'AltLeft':
                    break;
                case 'AltRight':
                    break;
                default:
                    msg = textArea.value + key.innerText;
                    break;
            }
            textArea.value = msg;
            changRegister('row1', ROW1, shiftState);
            changRegister('row2', ROW2, shiftState, capsState);
            changRegister('row3', ROW3, shiftState, capsState);
            changRegister('row4', ROW4, shiftState, capsState);
        }
    })
});

document.addEventListener('keyup', function (event) {

    const rows = document.querySelectorAll('.key');
    rows.forEach(key => {
        if (key.className.includes(event.code)) {
            key.style.borderRadius = '7px';
            key.style.background = '#6094f3';
        }
        if (event.code.includes('Shift')) {
            shiftState = false;
        }
    })
    changRegister('row1', ROW1, shiftState);
    changRegister('row2', ROW2, shiftState, capsState);
    changRegister('row3', ROW3, shiftState, capsState);
    changRegister('row4', ROW4, shiftState, capsState);
});

let body = document.querySelector('body');
body.addEventListener('mousedown', function (event) {
    const textArea = document.querySelector('.text_area');
    let value = event.target.className.split(' ')[0];
    if (event.target.className.includes('key') && event.target.className !== 'keyboard') {
        event.target.style.borderRadius = '20px';
        event.target.style.background = '#346bd1';
        switch (value) {
            case 'Backspace':
                msg = textArea.value.slice(0, -1);
                break;
            case 'Enter':
                msg = textArea.value + '\n';
                break;
            case 'Tab':
                msg = textArea.value + '\t';
                break;
            case 'CapsLock':
                capsState = capsState ? false : true;
                break;
            case 'ShiftLeft':
                shiftState = shiftState ? false : true;
                break;
            case 'ShiftRight':
                shiftState = shiftState ? false : true;
                break;
            case 'Space':
                msg = textArea.value + ' ';
                break;
            case 'ControlLeft':
                break;
            case 'ControlRight':
                break;
            case 'AltLeft':
                break;
            case 'AltRight':
                break;
            default:
                msg = textArea.value + document.querySelector('.' + value).innerText;
                shiftState = false;
                document.querySelectorAll('.Shift').forEach(elem => {
                    elem.style.borderRadius = '7px';
                    elem.style.background = '#6094f3';
                });
                break;
        }
        
        changRegister('row1', ROW1, shiftState);
        changRegister('row2', ROW2, shiftState, capsState);
        changRegister('row3', ROW3, shiftState, capsState);
        changRegister('row4', ROW4, shiftState, capsState);
        textArea.value = msg;
    }
});

body.addEventListener('mouseup', function (event) {
    if (event.target.className.includes('key') && event.target.className !== 'keyboard') {
        event.target.style.borderRadius = '7px';
        event.target.style.background = '#6094f3';
    }
    if (shiftState) {
        event.target.style.borderRadius = '20px';
        event.target.style.background = '#346bd1';
    }
    if (event.target.className.includes('CapsLock') && capsState) {
        event.target.style.borderRadius = '20px';
        event.target.style.background = '#346bd1';
    }
});