const colorCurrent = document.querySelector('#current');
const colorPrev = document.querySelector('#prev');
const colorCurrentLabel = document.querySelector("label[for=current]");
const colorPrevLabel = document.querySelector("label[for=prev]");

export function setCurrentColor(color) {
    colorPrevLabel.style.background = colorCurrentLabel.style.background;
    colorCurrentLabel.style.background = color;
    colorPrev.value = colorCurrent.value;
    colorCurrent.value = color;
    localStorage.prevColor = colorPrev.value;
    localStorage.currentColor = colorCurrent.value;
}