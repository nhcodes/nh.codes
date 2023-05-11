//html

//todo fix event.stopPropagation
function getWindowHtml(application) {
    return `
            <div class="d-flex flex-column bg-gray border-over position-absolute top-50 start-50 translate-middle z-2 mh-100" onclick="onClickWindow('${application.id}')">

                <div class="d-flex flex-row bg-blue align-items-center m-1 p-1 border-under">

                    <img src="${application.iconPath}" alt="Icon for ${application.title}" class="size-16 m-1"/>

                    <span class="flex-fill text-white text-truncate ms-1">${application.title}</span>

                    <button class="bg-gray p-0 ms-1 border-over size-16" onclick="event.stopPropagation(); onClickMinimizeWindow('${application.id}')">
                        <img src="img/minimize.ico" class="size-12 m-auto d-block"/>
                    </button>
                    <button class="bg-gray p-0 ms-1 border-over size-16" onclick="event.stopPropagation(); onClickMaximizeWindow('${application.id}')">
                        <img src="img/maximize.ico" class="size-12 m-auto d-block"/>
                    </button>
                    <button class="bg-gray p-0 ms-1 border-over size-16" onclick="event.stopPropagation(); onClickCloseWindow('${application.id}')">
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
    return (application instanceof LinkApplication) ?
        `
            <a class="d-flex flex-column align-items-center p-0 m-2 text-decoration-none" style="width: 100px" href="${application.url}" target="_blank">
                <img src="${application.iconPath}" alt="Icon for ${application.title}" class="size-48">
                <div class="text-white text-truncate small">${application.title}</div>
            </a>
        ` :
        `
            <button class="d-flex flex-column align-items-center p-0 m-2 bg-transparent border-0" style="width: 100px" onclick="onClickIcon('${application.id}')">
                <img src="${application.iconPath}" alt="Icon for ${application.title}" class="size-48">
                <div class="text-white text-truncate small">${application.title}</div>
            </button>
        `;
}

function getPortfolioWindowHtml() {
    return `
        <div class="list-group list-group-flush text-wrap">
            <div class="list-group-item list-group-item-action d-flex flex-row align-items-center">
                <img src="img/letter.ico" class="size-32 m-1 me-3"/>
                <div class="d-flex flex-column">
                    <span class="">tvratin.gs</span>
                    <span class="small text-muted">Fullstack Webapplication advanced search for tv shows and episodes and episode rating heatmap generation</span>
                    <span class="small text-muted">Technologies: Java, SQLite, HTML, Bootstrap, Javascript</span>
                    <button class="btn btn-link link-secondary" onclick="" title="view code on github">
                        <img src="img/github.ico">
                    </button>
                </div>
            </div>
            <div class="list-group-item list-group-item-action d-flex flex-row align-items-center">
                <img src="img/letter.ico" class="size-32 m-1 me-3"/>
                <div class="d-flex flex-column">
                    <span class="">nh.codes</span>
                    <span class="small text-muted">My personal website - the page you're currently on</span>
                    <span class="small text-muted">Technologies: HTML, Bootstrap, Javascript</span>
                </div>
            </div>
            <div class="list-group-item list-group-item-action d-flex flex-row align-items-center">
                <img src="img/letter.ico" class="size-32 m-1 me-3"/>
                <div class="d-flex flex-column">
                    <span class="">nh.codes</span>
                    <span class="small text-muted">My personal website - the page you're currently on</span>
                    <span class="small text-muted">Technologies: HTML, Bootstrap, Javascript</span>
                </div>
            </div>
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
        this.isWindowOpen = false;
        this.isWindowFocused = false;
        this.isWindowMinimized = false;
        this.isWindowMaximized = false;
    }

    openWindow() {
        if (this.isWindowOpen) return;
        this.isWindowOpen = true;
        let windowElement = parseElement(getWindowHtml(this));
        makeDraggable(windowElement);
        let taskElement = parseElement(getTaskHtml(this));
        this.windowElement = windowElement;
        this.taskElement = taskElement;
        desktopElement.append(windowElement);
        taskbarElement.append(taskElement);
        this.focusWindow(true);
    }

    closeWindow() {
        if(!this.isWindowOpen) return;
        this.isWindowOpen = false;
        this.windowElement.remove();
        this.windowElement = undefined;
        this.taskElement.remove();
        this.taskElement = undefined;
    }

    minimizeWindow() {
        if(this.isWindowMinimized) return;
        this.isWindowMinimized = true;
        this.windowElement.classList.add("window-minimized");
        this.focusWindow(false);
    }

    unMinimizeWindow() {
        if(!this.isWindowMinimized) return;
        this.isWindowMinimized = false;
        this.windowElement.classList.remove("window-minimized");
        this.focusWindow(true);
    }

    maximizeWindow() {
        if(this.isWindowMaximized) return;
        this.isWindowMaximized = true;
        this.windowElement.classList.add("window-maximized");
    }

    unMaximizeWindow() {
        if(!this.isWindowMaximized) return;
        this.isWindowMaximized = false;
        this.windowElement.classList.remove("window-maximized");
    }

    focusWindow(focus) {
        if (!this.isWindowOpen) return;
        const taskElement = this.taskElement;
        const windowElement = this.windowElement;
        const windowBarElement = this.windowElement.firstElementChild;
        if (focus) {
            this.isWindowFocused = true;
            toggleClasses(taskElement, "border-under", "border-over");
            toggleClasses(windowElement, "z-2", "z-1");
            toggleClasses(windowBarElement, "bg-blue", "bg-darkgray");
            applications.forEach((application) => {
                if (application === this) return;
                if (!(application instanceof WindowApplication)) return;
                application.focusWindow(false);
            });
        } else {
            this.isWindowFocused = false;
            toggleClasses(taskElement, "border-over", "border-under");
            toggleClasses(windowElement, "z-1", "z-2");
            toggleClasses(windowBarElement, "bg-darkgray", "bg-blue");
        }
    }

}

class ButtonApplication extends Application {

    constructor(id, title, iconPath, action) {
        super(id, title, iconPath, action);
    }

}

class LinkApplication extends Application {

    constructor(id, title, iconPath, url, action) {
        super(id, title, iconPath, action);
        this.url = url;
    }

}

//js

const applications = [
    new WindowApplication("bin", "Recycle Bin", "img/recycle_bin.ico", "<span class='m-5 text-center'>0 objects</span>"),
    new LinkApplication("pc", "My Computer", "img/computer.ico", "https://nh.codes/"),
    new WindowApplication("portfolio", "My Portfolio", "img/briefcase.ico", getPortfolioWindowHtml()),
    new WindowApplication("folder", "Some Folder", "img/folder.ico", "<span>lorem ipsum</span>"),
    new WindowApplication("mail", "Mail", "img/letter.ico", "<a class='m-5 user-select-all' href='mailto:contact@nh.codes'>contact@nh.codes</a>"),
    new LinkApplication("github", "Github", "img/gh.png", "https://github.com/nhcodes"),
    new ButtonApplication("playstore", "Play Store", "img/gps.png", () => {
        alert("todo");
    }),
    new LinkApplication("stackoverflow", "Stack Overflow", "img/sof.png", "https://stackoverflow.com/users/10570201"),
    /*
    new WindowApplication("flappy", "Flappy Bird", "img/flappybird.png", getFlappyBirdHtml(), () => {
        startFlappyBird()
    }),
    new ButtonApplication("rps", "RockPaperScissors", "img/rock_paper_scissors.ico", () => {
        startRockPaperScissors();
    }),*/
];

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
    if (application instanceof WindowApplication) {
        application.openWindow();
    }
    application.doAction();
}

function onClickTask(applicationId) {
    let application = getApplicationById(applicationId);
    if(application.isWindowMinimized) {
        application.unMinimizeWindow();
    }/* else {
        application.minimizeWindow();
    }*/
    if(!application.isWindowFocused) {
        application.focusWindow(true);
    }
}

function onClickWindow(applicationId) {
    let application = getApplicationById(applicationId);
    application.focusWindow(true);
}

function onClickMinimizeWindow(applicationId) {
    let application = getApplicationById(applicationId);
    if(application.isWindowMinimized) {
        application.unMinimizeWindow();
    } else {
        application.minimizeWindow();
    }
}

function onClickMaximizeWindow(applicationId) {
    let application = getApplicationById(applicationId);
    if(application.isWindowMaximized) {
        application.unMaximizeWindow();
    } else {
        application.maximizeWindow();
    }
}

function onClickCloseWindow(applicationId) {
    let application = getApplicationById(applicationId);
    application.closeWindow();
}