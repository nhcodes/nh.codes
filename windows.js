//html

function getWindowHtml(application) {
    return `
            <div class="d-flex flex-column bg-gray border-over position-absolute height-3 width-3 z-2" onclick="onClickWindow('${application.id}')">

                <div class="d-flex flex-row bg-blue align-items-center m-1 p-1 border-under">

                    <img src="${application.iconPath}" alt="Icon for ${application.title}" class="size-16 m-1"/>

                    <span class="flex-fill text-white text-truncate ms-1">${application.title}</span>

                    <button class="bg-gray p-0 ms-1 border-over size-16" onclick="onClickMinimizeWindow('${application.id}')">
                        <img src="img/minimize.ico" class="size-12 m-auto d-block"/>
                    </button>
                    <button class="bg-gray p-0 ms-1 border-over size-16" onclick="onClickMaximizeWindow('${application.id}')">
                        <img src="img/maximize.ico" class="size-12 m-auto d-block"/>
                    </button>
                    <button class="bg-gray p-0 ms-1 border-over size-16" onclick="onClickCloseWindow('${application.id}')">
                        <img src="img/close.ico" class="size-12 m-auto d-block"/>
                    </button>

                </div>

                <div class="d-flex flex-column flex-fill bg-white m-1 border-under overflow-auto">
                    ${application.contentHtml}
                </div>

            </div>
        `;
}

function getTaskHtml(application) {
    return `
            <button class="d-flex flex-row align-items-center m-1 p-1 bg-gray border-under" onclick="onClickTask('${application.id}')">
                <img src="${application.iconPath}" alt="Icon for ${application.title}" class="size-16">
                <span class="ms-1">${application.title}</span>
            </button>
        `;
}

function getIconHtml(application) {
    return `
            <button class="d-flex flex-column align-items-center p-0 m-2 bg-transparent border-0" style="width: 100px" onclick="onClickIcon('${application.id}')">
                <img src="${application.iconPath}" alt="Icon for ${application.title}" class="size-48">
                <div class="text-white text-truncate small">${application.title}</div>
            </button>
        `;
}

function getPortfolioWindowHtml() {
    return `
        <div class="list-group list-group-flush text-wrap">
            <a class="list-group-item list-group-item-action d-flex flex-row align-items-center" href="https://tvratin.gs/" target="_blank">
                <img src="img/letter.ico" class="size-32 m-1 me-3"/>
                <div class="d-flex flex-column">
                    <span class="">tvratin.gs</span>
                    <span class="small text-muted">Fullstack Webapplication advanced search for tv shows and episodes and episode rating heatmap generation</span>
                    <span class="small text-muted">Technologies: Java, SQLite, HTML, Bootstrap, Javascript</span>
                    <button class="btn btn-link link-secondary" onclick="" title="view code on github">
                        <img src="img/github.ico"></img>
                    </button>
                </div>
            </a>
            <a class="list-group-item list-group-item-action d-flex flex-row align-items-center" href="https://tvratin.gs/" target="_blank">
                <img src="img/letter.ico" class="size-32 m-1 me-3"/>
                <div class="d-flex flex-column">
                    <span class="">nh.codes</span>
                    <span class="small text-muted">My personal website - the page you're currently on</span>
                    <span class="small text-muted">Technologies: HTML, Bootstrap, Javascript</span>
                </div>
            </a>
            <a class="list-group-item list-group-item-action d-flex flex-row align-items-center" href="https://tvratin.gs/" target="_blank">
                <img src="img/letter.ico" class="size-32 m-1 me-3"/>
                <div class="d-flex flex-column">
                    <span class="">nh.codes</span>
                    <span class="small text-muted">My personal website - the page you're currently on</span>
                    <span class="small text-muted">Technologies: HTML, Bootstrap, Javascript</span>
                </div>
            </a>
        </div>
    `;
}

//js

class Application {

    constructor(id, title, iconPath, action) {
        this.id = id;
        this.title = title;
        this.iconPath = iconPath;
        this.action = action;
    }

    doAction() {
        this.action();
    }

}

class WindowApplication extends Application {

    constructor(id, title, iconPath, contentHtml, action = () => {}) {
        super(id, title, iconPath, action);
        this.contentHtml = contentHtml;
        this.windowElement = undefined;
        this.taskElement = undefined;
    }

    isWindowOpen() {
        return (this.windowElement !== undefined || this.taskElement !== undefined);
    }

    openWindow() {
        if (this.isWindowOpen()) return;
        let windowElement = parseElement(getWindowHtml(this));
        windowElement.style.left = `${pixelsFromTopLeft}px`;
        windowElement.style.top = `${pixelsFromTopLeft}px`;
        makeDraggable(windowElement);
        pixelsFromTopLeft += 25;
        let taskElement = parseElement(getTaskHtml(this));
        this.windowElement = windowElement;
        this.taskElement = taskElement;
        desktopElement.append(windowElement);
        taskbarElement.append(taskElement);
        this.focusWindow(true);
    }

    closeWindow() {
        this.windowElement.remove();
        this.windowElement = undefined;
        this.taskElement.remove();
        this.taskElement = undefined;
    }

    minimizeWindow() {
        const isMinimized = this.windowElement.classList.toggle("window-minimized");
        if (isMinimized) {
            setClasses(this.taskElement, "border-over", "border-under");
        } else {
            setClasses(this.taskElement, "border-under", "border-over");
        }
        this.focusWindow(!isMinimized);
    }

    maximizeWindow() {
        this.windowElement.classList.toggle("window-maximized");
    }

    focusWindow(focus) {
        if (!this.isWindowOpen()) return;
        const taskElement = this.taskElement;
        const windowElement = this.windowElement;
        const windowBarElement = this.windowElement.firstElementChild;
        if (focus) {
            setClasses(taskElement, "border-under", "border-over");
            setClasses(windowElement, "z-2", "z-1");
            setClasses(windowBarElement, "bg-blue", "bg-darkgray");
            applications.forEach((application) => {
                if (application === this) return;
                if (!(application instanceof WindowApplication)) return;
                if (!application.isWindowOpen()) return;
                application.focusWindow(false);
            });
        } else {
            setClasses(taskElement, "border-over", "border-under");
            setClasses(windowElement, "z-1", "z-2");
            setClasses(windowBarElement, "bg-darkgray", "bg-blue");
        }
    }

}

class ActionApplication extends Application {

    constructor(id, title, iconPath, action) {
        super(id, title, iconPath, action);
    }

}

//js

const applications = [
    new WindowApplication("bin", "Recycle Bin", "img/recycle_bin.ico", "<span class='m-auto'>0 objects</span>"),
    new ActionApplication("pc", "My Computer", "img/computer.ico", () => {
        window.open("https://nh.codes/");
    }),
    new WindowApplication("portfolio", "My Portfolio", "img/briefcase.ico", getPortfolioWindowHtml()),
    new WindowApplication("folder", "Some Folder", "img/folder.ico", "<span>lorem ipsum</span>"),
    new WindowApplication("mail", "Mail", "img/letter.ico", "<a class='m-auto user-select-all' href='mailto:contact@nhcodes.com'>contact@nhcodes.com</a>"),
    new ActionApplication("github", "Github", "img/github.ico", () => {
        window.open("https://github.com/nhcodes");
    }),
    new ActionApplication("playstore", "Play Store", "img/playstore.ico", () => {
        alert("todo");
    }),
    /*
    new WindowApplication("flappy", "Flappy Bird", "img/flappybird.png", getFlappyBirdHtml(), () => {
        startFlappyBird()
    }),
    new ActionApplication("rps", "RockPaperScissors", "img/rock_paper_scissors.ico", () => {
        startRockPaperScissors();
    }),*/
];

let pixelsFromTopLeft = 50;

function initApplications(desktopElement) {
    for (const application of applications) {
        let iconElement = parseElement(getIconHtml(application));
        makeDraggable(iconElement);
        desktopElement.append(iconElement);
    }
}

function getApplicationById(applicationId) {
    return applications.find((application) => application.id === applicationId);
}

//events

function onClickIcon(applicationId) {
    let application = getApplicationById(applicationId);
    if (application instanceof ActionApplication) {
        application.doAction();
    } else if (application instanceof WindowApplication) {
        application.openWindow();
        application.doAction();
    }
}

function onClickTask(applicationId) {
    let application = getApplicationById(applicationId);
    application.focusWindow(true);
}

function onClickWindow(applicationId) {
    let application = getApplicationById(applicationId);
    application.focusWindow(true);
}

function onClickMinimizeWindow(applicationId) {
    let application = getApplicationById(applicationId);
    application.minimizeWindow();
}

function onClickMaximizeWindow(applicationId) {
    let application = getApplicationById(applicationId);
    application.maximizeWindow();
}

function onClickCloseWindow(applicationId) {
    let application = getApplicationById(applicationId);
    application.closeWindow();
}