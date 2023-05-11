function getToastHtml(title, content) {
    return `
        <div class="toast position-absolute top-0 start-50 translate-middle-x border-over mt-2">
            <div class="toast-header">
                <img src="img/warning.ico" class="size-16">
                <strong class="ms-2 me-auto">${title}</strong>
                <button class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${content}
            </div>
        </div>
    `;
}

function showToast(title, content) {
    const html = getToastHtml(title, content);
    let element = parseElement(html);
    document.body.firstElementChild.append(element);
    const toast = new bootstrap.Toast(element, {"delay": 3000});
    element.addEventListener('hidden.bs.toast', () => element.remove());
    toast.show();
}