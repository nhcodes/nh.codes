function getSelectRectangleHtml() {
    return `
        <div style="position: absolute; border: 1px dotted #000; background-color: rgba(255, 255, 255, 0.3); pointer-events: none"></div>
    `;
}

let selectorElement = null;

function enableSelectRectangle(element) {
    element.onmousedown = (downEvent) => {

        const startSelectionX = downEvent.clientX;
        const startSelectionY = downEvent.clientY;

        selectorElement = parseElement(getSelectRectangleHtml());
        selectorElement.style.left = `${startSelectionX}px`;
        selectorElement.style.top = `${startSelectionY}px`;
        element.append(selectorElement);

        document.documentElement.onmousemove = (moveEvent) => {
            const currentSelectionX = moveEvent.clientX;
            const currentSelectionY = moveEvent.clientY;
            const selectionWidth = Math.abs(currentSelectionX - startSelectionX);
            const selectionHeight = Math.abs(currentSelectionY - startSelectionY);
            selectorElement.style.width = `${selectionWidth}px`;
            selectorElement.style.height = `${selectionHeight}px`;
            selectorElement.style.left = `${Math.min(startSelectionX, currentSelectionX)}px`;
            selectorElement.style.top = `${Math.min(startSelectionY, currentSelectionY)}px`;
        };

        document.documentElement.onmouseup = (upEvent) => {
            document.documentElement.onmousemove = null;
            document.documentElement.onmouseup = null;
            element.onmouseup = null;
            selectorElement.remove();
            selectorElement = null;
        };

    };
}