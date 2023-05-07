function getImageElement(imagePath) {
    const imageElement = new Image();
    imageElement.src = imagePath;
    return imageElement;
}

function getRandomNumberBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function getRandomNumber(max) {
    return Math.random() * max;
}

function setClasses(element, classToAdd, classToRemove) {
    element.classList.add(classToAdd);
    element.classList.remove(classToRemove);
}

function parseElement(html) {
    return parseElements(html)[0];
}

function parseElements(html) {
    let div = document.createElement("div");
    div.innerHTML = html;
    return div.children;
}