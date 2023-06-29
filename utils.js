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

function toggleClasses(element, classToAdd, classToRemove) {
    element.classList.add(classToAdd);
    element.classList.remove(classToRemove);
}