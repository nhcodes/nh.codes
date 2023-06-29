function makeDraggable(element, dragElement = element) {
    dragElement.onmousedown = (downEvent) => {

        const boundingClientRect = element.getBoundingClientRect();
        const offsetX = downEvent.clientX - boundingClientRect.left;
        const offsetY = downEvent.clientY - boundingClientRect.top;

        document.documentElement.onmousemove = (moveEvent) => {
            const newPositionX = moveEvent.clientX - offsetX;
            const newPositionY = moveEvent.clientY - offsetY;
            element.style.left = `${newPositionX}px`;
            element.style.top = `${newPositionY}px`;
        };

        document.documentElement.onmouseup = (upEvent) => {
            document.documentElement.onmousemove = null;
            document.documentElement.onmouseup = null;
            dragElement.onmouseup = null;
        };

        downEvent.stopPropagation();

    };
}