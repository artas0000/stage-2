const ROW1 = [
    ['Backquote', '`', '~', 'ё', 'Ё'],
    ['Digit1', '1', '!', '1', 'Ё'],
    ['Digit2', '2', '@', '2', 'Ё'],
    ['Digit3', '3', '#', '3', 'Ё'],
    ['Digit4', '4', '$', '4', 'Ё'],
    ['Digit5', '5', '%', '5', 'Ё'],
    ['Digit6', '6', '^', '6', 'Ё'],
    ['Digit7', '7', '&', '7', 'Ё'],
    ['Digit8', '8', '*', '8', 'Ё'],
    ['Digit9', '9', '(', '9', 'Ё'],
    ['Digit0', '0', ')', '0', 'Ё'],
    ['Minus', '-', '_', '-', '_'],
    ['Equal', '=', '+', '=', '+'],
    ['Backspace', 'Backspace', 'Backspace', 'Backspace', 'Backspace']
]
const ROW2 = [
    ['Tab', 'Tab', 'Tab', 'Tab', 'Tab'],
    ['KeyQ', 'q', 'Q', '1', 'Ё'],
    ['KeyW', 'w', 'W', '2', 'Ё'],
    ['KeyE', 'e', 'E', '3', 'Ё'],
    ['KeyR', 'r', 'R', '4', 'Ё'],
    ['KeyT', 't', 'T', '5', 'Ё'],
    ['KeyY', 'y', 'Y', '6', 'Ё'],
    ['KeyU', 'u', 'U', '7', 'Ё'],
    ['KeyI', 'i', 'I', '8', 'Ё'],
    ['KeyO', 'o', 'O', '9', 'Ё'],
    ['KeyP', 'p', 'P', '0', 'Ё'],
    ['BracketLeft', '[', '{', '-', '_'],
    ['BracketRight', ']', '}', '=', '+'],
    ['Backslash', '\\', '|', '\\', '/']
]

let msg = '';

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
    keyboard.append(row1);
    keyboard.append(row2);
    createRow('row1', row1, ROW1);
    createRow('row2', row2, ROW2);
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

document.addEventListener('keydown', function (event) {
    const textArea = document.querySelector('.text_area');
    textArea.blur();

    const row1 = document.querySelector('.row1');
    row1.childNodes.forEach((key, index) => {
        if (event.key === 'Shift') {
            key.innerText = ROW1[index][2];
        }
    })
    const row2 = document.querySelector('.row2');
    row2.childNodes.forEach((key, index) => {
        if (event.key === 'Shift') {
            key.innerText = ROW2[index][2];
        }
    })

    const rows = document.querySelectorAll('.key');
    rows.forEach(key => {
        if (key.className.includes(event.code)) {
            key.style.borderRadius = '16px';
            key.style.background = '#346bd1';
            if (!key.className.includes('Backspace') && !key.className.includes('Tab')) {
                msg = textArea.value + key.innerText;
            }
            if (key.className.includes('Backspace')) {
                msg = textArea.value.slice(0, -1);
            }
            if (key.className.includes('Tab')) {
                textArea.focus();
                msg = textArea.value + '\t';
                textArea.blur();
            }
            textArea.value = msg;
        }
    })
});

document.addEventListener('keyup', function (event) {
    const row1 = document.querySelector('.row1');
    row1.childNodes.forEach((key, index) => {
        if (event.key === 'Shift') {
            key.innerText = ROW1[index][1];
        }
    })
    const row2 = document.querySelector('.row2');
    row2.childNodes.forEach((key, index) => {
        if (event.key === 'Shift') {
            key.innerText = ROW2[index][1];
        }
    })

    const rows = document.querySelectorAll('.key');
    rows.forEach(key => {
        if (key.className.includes(event.code)) {
            key.style.borderRadius = '7px';
            key.style.background = '#6094f3';
        }
    })
});

let body = document.querySelector('body');
body.addEventListener('mousedown', function (event) {
    const textArea = document.querySelector('.text_area');
    let clickedKeyClass = event.target.className.split(' ');

    if (event.target.className.includes('key')) {
        if (!clickedKeyClass.includes('Backspace') && !clickedKeyClass.includes('Tab')) {
            msg = textArea.value + document.querySelector('.' + clickedKeyClass).innerText;
        }
        if (clickedKeyClass.includes('Backspace')) {
            msg = textArea.value.slice(0, -1);
        }
        if (clickedKeyClass.includes('Tab')) {
            msg = textArea.value + '\t';
        }

        event.target.style.borderRadius = '16px';
        event.target.style.background = '#346bd1';
        textArea.value = msg;
    }
});

body.addEventListener('mouseup', function (event) {
    if (event.target.className.includes('key')) {
        event.target.style.borderRadius = '7px';
        event.target.style.background = '#6094f3';
    }
});