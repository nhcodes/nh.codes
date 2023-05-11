function makeDraggable(element) {
    element.onmousedown = (downEvent) => {

        const offsetX = downEvent.offsetX;
        const offsetY = downEvent.offsetY;
        /*element.style.left = (downEvent.clientX - offsetX) + "px";
        element.style.top = (downEvent.clientY - offsetY) + "px";
        element.classList.add("position-absolute");*/


        document.documentElement.onmousemove = (moveEvent) => {
            const newPositionX = moveEvent.clientX - offsetX;
            const newPositionY = moveEvent.clientY - offsetY;
            element.style.left = newPositionX + "px";
            element.style.top = newPositionY + "px";
            element.classList.remove("top-50", "start-50", "translate-middle"); //todo
        };

        document.documentElement.onmouseup = (upEvent) => {
            document.documentElement.onmousemove = null;
            document.documentElement.onmouseup = null;
            element.onmouseup = null;
        };

        downEvent.stopPropagation();

    };
}