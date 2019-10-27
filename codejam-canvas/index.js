const canvas = document.querySelector(".canvas");
const size_4x4 = document.querySelector(".size_4x4");
const size_32x32 = document.querySelector(".size_32x32");
const png = document.querySelector(".png");

const ctx = canvas.getContext('2d');
canvas.height = 512;
canvas.width = 512;

function drawPnd() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const img = new Image();
    img.src = './data/image.png';
    img.onload = function () {
        ctx.drawImage(img, 0, 0, canvas.height, canvas.width);
    }
}

function readTextFile(file, callback) {
    const rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function drawMatrix(size) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    readTextFile("./data/matrix.json", function (text) {
        const arrays = JSON.parse(text);
        let data = size === 4 ? arrays[0] : arrays[1];
        let heightPixel = canvas.height / data.length;
        let widthPixel = canvas.width / data[0].length;
        let y = 0;
        let x = 0;
        data.forEach(element => {
            element.forEach(e => {
                ctx.fillStyle = size === 4 ? `#${e}` : `rgba(${e[0]}, ${e[1]}, ${e[2]}, ${e[3] / 255})`;
                ctx.fillRect(x, y, widthPixel, heightPixel);
                x += widthPixel;
            });
            x = 0;
            y += heightPixel;
        });
    });
}

size_32x32.addEventListener('click', function () {
    drawMatrix(32)
});
size_4x4.addEventListener('click', function () {
    drawMatrix(4)
});
png.addEventListener('click', drawPnd);