//html

//todo fix event.stopPropagation
function getWindowHtml(application) {
    return `
            <div class="d-flex flex-column bg-gray border-over position-absolute z-5 mh-100 col-12 col-sm-10 col-md-8 col-lg-6" onclick="onClickWindow('${application.id}')">

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
                
                ${conditional(application.showBottomBar, `
                    <div class="d-flex flex-row bg-gray m-1 mt-0">
                        <span class="border-under flex-fill px-2">0 objects</span>
                        <span class="border-under px-2">0 bytes</span>
                    </div>
                `, ``)}

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
            <a class="d-flex flex-column align-items-center p-0 m-2 text-decoration-none z-4 icon-hover" style="width: 100px" href="${application.url}" target="_blank">
                <img src="${application.iconPath}" alt="Icon for ${application.title}" class="size-48">
                <div class="text-white text-truncate small">${application.title}</div>
            </a>
        ` :
        `
            <button class="d-flex flex-column align-items-center p-0 m-2 bg-transparent border-0 z-4 icon-hover" style="width: 100px" onclick="onClickIcon('${application.id}')">
                <img src="${application.iconPath}" alt="Icon for ${application.title}" class="size-48">
                <div class="text-white text-truncate small">${application.title}</div>
            </button>
        `;
}

const portfolioEntries = [
    {
        "key": "tvratings",
        "name": "tvratin.gs",
        "description": "Fullstack Webapplication to discover the best TV shows and episodes.",
        "technologies": ["Java", "HTML", "JavaScript", "CSS", "Bootstrap", "SQLite", "REST API"],
        "url": "https://tvratin.gs",
        "github": "https://github.com/nhcodes/tvratings-frontend",
        "preview": "https://github.com/nhcodes/tvratings-frontend/assets/120429276/27627206-1f46-400d-9c4e-b2251fa29168"
    },
    {
        "key": "itube",
        "name": "iTube",
        "description": "YouTube Downloader for Android.",
        "technologies": ["Kotlin", "Jetpack Compose", "AndroidX"],
        "url": "https://github.com/nhcodes/iTube",
        "github": "https://github.com/nhcodes/iTube",
        "preview": "https://github.com/nhcodes/iTube/assets/120429276/23f04aca-c86b-422d-80c0-a806eb4f7e9b"
    },
    {
        "key": "timelapsed",
        "name": "Timelapsed",
        "description": "Create high-quality timelapse videos on your old Android phone.",
        "technologies": ["Kotlin", "Coroutines", "Jetpack Compose", "AndroidX", "MVVM"],
        "url": "https://github.com/nhcodes/Timelapsed",
        "github": "https://github.com/nhcodes/Timelapsed",
        "preview": "https://github.com/nhcodes/Timelapsed/assets/120429276/93685096-b4c0-4f1e-a2fb-ed78699bc1c2"
    },
    {
        "key": "streambrowser",
        "name": "StreamBrowser",
        "description": "Android browser app with automatic stream detection, an integrated video player and Chromecast support.",
        "technologies": ["Java", "Room", "ExoPlayer", "AndroidX", "MVVM"],
        "url": "https://github.com/nhcodes/StreamBrowser",
        "github": "https://github.com/nhcodes/StreamBrowser",
        "preview": "https://github.com/nhcodes/StreamBrowser/assets/120429276/45c0f433-e3f4-493c-af25-1977531f33d4"
    },
    {
        "key": "plutusbot",
        "name": "PlutusBot (private)",
        "description": "Trading Bot with an integrated candle-downloader, backtesting, indicators, strategies, realtime-orderbook-data, multiple brokers/exchanges, user interface, and more.",
        "technologies": ["Kotlin", "Compose Multiplatform", "SQLite", "REST API"],
        "url": "https://github.com/nhcodes/PlutusBot",
        "github": "https://github.com/nhcodes/PlutusBot",
        "preview": undefined
    },
    {
        "key": "nhcodes",
        "name": "nh.codes",
        "description": "My personal website - the website you're currently on.",
        "technologies": ["HTML", "JavaScript", "CSS", "Bootstrap"],
        "url": "https://nh.codes",
        "github": "https://github.com/nhcodes/nh.codes",
        "preview": undefined
    }
]

function getPortfolioWindowHtml() {
    return `
        <div class="list-group list-group-flush text-wrap">
            ${loop(portfolioEntries, entry => `
                <button class="list-group-item list-group-item-action d-flex flex-column" data-bs-toggle="modal" data-bs-target="#MODAL_${entry.key}">
                    <span>${entry.name}</span>
                    <span class="small text-muted">${entry.description}</span>
                    <div>
                        ${loop(entry.technologies, technology => `
                            <span class="badge text-bg-primary">${technology}</span>
                        `)}
                    </div>
                </button>
                ${getPortfolioEntryModalHtml(entry)}
            `)}
        </div>
    `;
}

function getPortfolioEntryModalHtml(portfolioEntry) {
    return `
        <div class="modal fade" id="MODAL_${portfolioEntry.key}" tabindex="-1">
            <div class="modal-dialog modal-fullscreen">
                <div class="modal-content bg-turquoise">
                    <div class="modal-body d-flex flex-column justify-content-center align-items-center">
                        ${conditional(portfolioEntry.preview !== undefined, `
                            <video src="${portfolioEntry.preview}" class="h-100" controls loop/>
                        `, `
                            <span>No preview available.</span>
                        `)}
                    </div>
                    <div class="modal-footer">
                        <button class="border-over bg-gray text-reset p-1 m-2" data-bs-dismiss="modal">Close</button>
                        <a class="border-over bg-gray text-decoration-none text-reset p-1 m-2" href="${portfolioEntry.github}" target="_blank">Code on Github</a>
                        <a class="border-over bg-gray text-decoration-none text-reset p-1 m-2" href="${portfolioEntry.url}" target="_blank">Download/Open</a>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getWelcomeWindowHtml() {
    return `
        <div class="d-flex flex-column p-3">
            <h3>Hello world!</h3><br>
            <span class="text-wrap">Welcome to my personal website! Feel free to explore my portfolio, visit my GitHub, 
            or reach out via email at <a class="user-select-all" href='mailto:contact@nh.codes'>contact@nh.codes</a>.
            <br><br>Best regards,<br> Nick</span>
            <button class="bg-gray border-over mx-auto my-1" onclick="getApplicationById('welcome').closeWindow();">OK</button>
        </div>
    `;
}

function getRecycleBinWindowHtml() {
    return `
        <div class="d-flex flex-column overflow-x-auto">
            <div class="d-flex flex-row">
                <span class="border-over bg-gray flex-fill px-2">Name</span>
                <span class="border-over bg-gray flex-fill px-2">Original Location</span>
                <span class="border-over bg-gray flex-fill px-2">Date Deleted</span>
                <span class="border-over bg-gray flex-fill px-2">Type</span>
                <span class="border-over bg-gray flex-fill px-2">Size</span>
            </div>
            <div class="flex-fill d-flex flex-row" style="height: 200px">
                
            </div>
        </div>
    `;
}

function getEmptyWindowHtml() {
    return `
        <div class="d-flex flex-column overflow-x-auto">
            <div class="flex-fill d-flex flex-row" style="height: 200px">
                
            </div>
        </div>
    `;
}

function getMailWindowHtml() {
    return `<a class='m-5 user-select-all text-center' href='mailto:contact@nh.codes'>contact@nh.codes</a>`;
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

    constructor(id, title, iconPath, action, contentHtml, showBottomBar = false) {
        super(id, title, iconPath, action);
        this.contentHtml = contentHtml;
        this.showBottomBar = showBottomBar;
        this.windowElement = undefined;
        this.taskElement = undefined;
        this.isWindowOpen = false;
        this.isWindowFocused = false;
        this.isWindowMinimized = false;
        this.isWindowMaximized = false;
    }

    openWindow() {
        if (this.isWindowOpen) {
            this.focusWindow(true);
            return;
        }
        this.isWindowOpen = true;
        let windowElement = parseElement(getWindowHtml(this));
        makeDraggable(windowElement, windowElement.firstElementChild);
        let taskElement = parseElement(getTaskHtml(this));
        this.windowElement = windowElement;
        this.taskElement = taskElement;
        desktopElement.append(windowElement);
        taskbarElement.append(taskElement);
        this.focusWindow(true);

        const xPosition = (desktopElement.offsetWidth - windowElement.offsetWidth) / 2;
        const yPosition = (desktopElement.offsetHeight - windowElement.offsetHeight) / 2;
        windowElement.style.left = `${xPosition}px`;
        windowElement.style.top = `${yPosition}px`;

    }

    closeWindow() {
        if (!this.isWindowOpen) return;
        this.isWindowOpen = false;
        this.windowElement.remove();
        this.windowElement = undefined;
        this.taskElement.remove();
        this.taskElement = undefined;
    }

    minimizeWindow() {
        if (this.isWindowMinimized) return;
        this.isWindowMinimized = true;
        this.windowElement.classList.add("window-minimized");
        this.focusWindow(false);
    }

    unMinimizeWindow() {
        if (!this.isWindowMinimized) return;
        this.isWindowMinimized = false;
        this.windowElement.classList.remove("window-minimized");
        this.focusWindow(true);
    }

    maximizeWindow() {
        if (this.isWindowMaximized) return;
        this.isWindowMaximized = true;
        this.windowElement.classList.add("window-maximized");
    }

    unMaximizeWindow() {
        if (!this.isWindowMaximized) return;
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
            toggleClasses(windowElement, "z-5", "z-4");
            toggleClasses(windowBarElement, "bg-blue", "bg-darkgray");
            applications.forEach((application) => {
                if (application === this) return;
                if (!(application instanceof WindowApplication)) return;
                application.focusWindow(false);
            });
        } else {
            this.isWindowFocused = false;
            toggleClasses(taskElement, "border-over", "border-under");
            toggleClasses(windowElement, "z-4", "z-5");
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

    constructor(id, title, iconPath, action, url) {
        super(id, title, iconPath, action);
        this.url = url;
    }

}

//js

const applications = [
    new WindowApplication("bin", "Recycle Bin", "img/recycle_bin.ico", () => {}, getRecycleBinWindowHtml(), true),
    new WindowApplication("pc", "My Computer", "img/computer.ico", () => {}, getEmptyWindowHtml(), true),
    new WindowApplication("portfolio", "My Portfolio", "img/briefcase.ico", () => {}, getPortfolioWindowHtml()),
    //new WindowApplication("folder", "New Folder", "img/folder.ico", () => {}, getEmptyWindowHtml(), true),
    new WindowApplication("email", "Email", "img/letter.ico", () => {}, getMailWindowHtml()),
    new WindowApplication("welcome", "Welcome", "img/help.ico", () => {}, getWelcomeWindowHtml()),
    new LinkApplication("github", "Github", "img/github.ico", () => {}, "https://github.com/nhcodes"),
    new LinkApplication("stackoverflow", "Stack Overflow", "img/stackoverflow.ico", () => {}, "https://stackoverflow.com/users/10570201"),
    new ButtonApplication("linkedin", "LinkedIn", "img/linkedin.ico", () => { showToast("Info", "Coming soon.") }),
    //new ButtonApplication("playstore", "Play Store", "img/playstore.ico", () => { showToast("Info", "Coming soon.") }),
];

function initApplications(desktopElement) {
    for (const application of applications) {
        let iconElement = parseElement(getIconHtml(application));
        //makeDraggable(iconElement);
        desktopElement.append(iconElement);
    }
    getApplicationById("welcome").openWindow();
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
    if (application.isWindowMinimized) {
        application.unMinimizeWindow();
    }/* else {
        application.minimizeWindow();
    }*/
    if (!application.isWindowFocused) {
        application.focusWindow(true);
    }
}

function onClickWindow(applicationId) {
    let application = getApplicationById(applicationId);
    application.focusWindow(true);
}

function onClickMinimizeWindow(applicationId) {
    let application = getApplicationById(applicationId);
    if (application.isWindowMinimized) {
        application.unMinimizeWindow();
    } else {
        application.minimizeWindow();
    }
}

function onClickMaximizeWindow(applicationId) {
    let application = getApplicationById(applicationId);
    if (application.isWindowMaximized) {
        application.unMaximizeWindow();
    } else {
        application.maximizeWindow();
    }
}

function onClickCloseWindow(applicationId) {
    let application = getApplicationById(applicationId);
    application.closeWindow();
}