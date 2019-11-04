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
    ['Backspace', '\b', '\b', '\b', '\b']
]

let msg = '';

window.onload = function () {
    let textArea = document.createElement('textarea');
    document.body.appendChild(textArea);
    textArea.className = 'text_area';
    textArea.focus();
    let row1 = document.createElement('div');
    document.body.appendChild(row1);
    row1.className = 'row1';
    ROW1.forEach(elem => {
        let key = document.createElement('div');
        row1.append(key);
        key.innerText = elem[1];
        key.className = elem[0] + ' key';
    });
}

document.addEventListener('keydown', function (event) {
    const textArea = document.querySelector('.text_area');
    const rows = document.querySelectorAll('.key');
    rows.forEach((key, index) => {
        if (event.key === 'Shift') {
            key.innerText = ROW1[index][2];
        }
        if (key.className.includes(event.code)) {
            key.style.background = '#346bd1';
            msg += key.innerText;
            textArea.innerText = msg;
        }
    })
});

document.addEventListener('keyup', function (event) {
    const rows = document.querySelectorAll('.key');
    rows.forEach((key, index) => {
        if (event.key === 'Shift') {
            key.innerText = ROW1[index][1];
        }
        if (key.className.includes(event.code)) {
            key.style.background = '#6094f3';
        }
    })
});

let form = document.querySelector('body');

form.onclick = function (event) {
    const textArea = document.querySelector('.text_area');
    msg += document.querySelector('.' + event.target.className.split(' ')).innerText;
    textArea.innerText = msg;
    console.log(document.querySelector('.' + event.target.className.split(' ')));
};