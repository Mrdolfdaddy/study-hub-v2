// =========================
// STUDY HUB 4.3
// APP CONTROLS + DASHBOARD
// =========================


document.addEventListener("DOMContentLoaded", () => {

    updateDate();

    updateClock();

    loadSettings();

    updateDashboard();

    setInterval(updateClock, 1000);

});


// =========================
// PAGE SWITCHING
// =========================

function showPage(page, button) {

    document.querySelectorAll(".page")
        .forEach(section => {

            section.classList.remove("active");

        });


    const selected =
        document.getElementById(page);


    if (selected) {

        selected.classList.add("active");

    }


    document.querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    if (button) {

        button.classList.add("active");

    }


    // Refresh dashboard whenever it is opened
    if (page === "dashboard") {

        updateDashboard();

    }


    // Refresh projects whenever they are opened
    if (
        page === "projects" &&
        typeof loadProjects === "function"
    ) {

        loadProjects();

    }

}


// =========================
// DATE
// =========================

function updateDate() {

    const date =
        document.getElementById("date");


    if (date) {

        date.textContent =
            new Date().toDateString();

    }

}


// =========================
// CLOCK
// =========================

function updateClock() {

    const clock =
        document.getElementById("clock");


    if (clock) {

        clock.textContent =
            new Date().toLocaleTimeString();

    }

}


// =========================
// DASHBOARD
// =========================

function updateDashboard() {

    updateProjectCount();

    updateProgress();

    updateTasks();

}


// =========================
// PROJECT COUNT
// =========================

function updateProjectCount() {

    const projects =
        JSON.parse(
            localStorage.getItem(
                "studyHubProjects"
            )
        ) || [];


    const element =
        document.getElementById(
            "projectCount"
        );


    if (element) {

        element.textContent =
            projects.length +
            (
                projects.length === 1
                    ? " Project"
                    : " Projects"
            );

    }

}


// =========================
// DASHBOARD PROGRESS
// =========================

function updateProgress() {

    const projects =
        JSON.parse(
            localStorage.getItem(
                "studyHubProjects"
            )
        ) || [];


    let total = 0;

    let completed = 0;


    projects.forEach(project => {

        if (!Array.isArray(project.tasks)) {
            return;
        }


        total += project.tasks.length;


        project.tasks.forEach(task => {

            if (task.done === true) {

                completed++;

            }

        });

    });


    let percent = 0;


    if (total > 0) {

        percent =
            Math.round(
                (
                    completed /
                    total
                ) * 100
            );

    }


    const progress =
        document.getElementById(
            "dashboardProgress"
        );


    const text =
        document.getElementById(
            "progressText"
        );


    if (progress) {

        progress.textContent =
            percent + "%";

    }


    if (text) {

        text.textContent =
            completed +
            " / " +
            total +
            " tasks completed";

    }

}


// =========================
// TODAY'S TASKS
// =========================

function updateTasks() {

    const container =
        document.getElementById(
            "todayTasks"
        );


    if (!container) return;


    const projects =
        JSON.parse(
            localStorage.getItem(
                "studyHubProjects"
            )
        ) || [];


    const tasks = [];


    projects.forEach(project => {

        if (!Array.isArray(project.tasks)) {
            return;
        }


        project.tasks.forEach(
            (task, index) => {

                if (!task.done) {

                    tasks.push({

                        projectId: project.id,

                        taskIndex: index,

                        text: task.text

                    });

                }

            }
        );

    });


    if (tasks.length === 0) {

        container.innerHTML =
            "<p>🎉 No unfinished tasks!</p>";

        return;

    }


    container.innerHTML =
        tasks
            .slice(0, 10)
            .map(task => `

                <label
                    style="
                        display:flex;
                        align-items:center;
                        gap:12px;
                        margin:12px 0;
                        cursor:pointer;
                    "
                >

                    <input

                        type="checkbox"

                        style="
                            width:22px;
                            height:22px;
                            cursor:pointer;
                        "

                        onchange="
                            completeDashboardTask(
                                ${task.projectId},
                                ${task.taskIndex}
                            )
                        "

                    >

                    <span>

                        ${escapeDashboardHTML(
                            task.text
                        )}

                    </span>

                </label>

            `)
            .join("");

}


// =========================
// COMPLETE DASHBOARD TASK
// =========================

function completeDashboardTask(
    projectId,
    taskIndex
) {

    const projects =
        JSON.parse(
            localStorage.getItem(
                "studyHubProjects"
            )
        ) || [];


    const project =
        projects.find(
            project =>
                project.id === projectId
        );


    if (!project) return;


    if (!Array.isArray(project.tasks)) {
        return;
    }


    const task =
        project.tasks[taskIndex];


    if (!task) return;


    // Mark task complete
    task.done = true;


    // Recalculate project progress
    if (project.tasks.length === 0) {

        project.progress = 0;

    } else {

        const completed =
            project.tasks.filter(
                task => task.done === true
            ).length;


        project.progress =
            Math.round(
                (
                    completed /
                    project.tasks.length
                ) * 100
            );

    }


    // Save everything
    localStorage.setItem(
        "studyHubProjects",
        JSON.stringify(projects)
    );


    // Update Dashboard immediately
    updateDashboard();


    // Update Projects immediately
    if (
        typeof loadProjects ===
        "function"
    ) {

        loadProjects();

    }

}


// =========================
// THEME
// =========================

function toggleTheme() {

    document.body.classList.toggle(
        "dark"
    );


    saveSettings();

}


// =========================
// FONT
// =========================

function changeFont(font) {

    document.body.style.fontFamily =
        font;


    localStorage.setItem(
        "studyFont",
        font
    );

}


// =========================
// ACCENT COLOUR
// =========================

function changeAccent(color) {

    document.documentElement
        .style.setProperty(
            "--accent",
            color
        );


    localStorage.setItem(
        "studyAccent",
        color
    );

}


// =========================
// SETTINGS SAVE
// =========================

function saveSettings() {

    localStorage.setItem(

        "studyDark",

        document.body.classList.contains(
            "dark"
        )

    );

}


// =========================
// SETTINGS LOAD
// =========================

function loadSettings() {

    const font =
        localStorage.getItem(
            "studyFont"
        );


    const accent =
        localStorage.getItem(
            "studyAccent"
        );


    const dark =
        localStorage.getItem(
            "studyDark"
        );


    if (font) {

        document.body.style.fontFamily =
            font;

    }


    if (accent) {

        document.documentElement
            .style.setProperty(
                "--accent",
                accent
            );

    }


    if (dark === "true") {

        document.body.classList.add(
            "dark"
        );

    }

}


// =========================
// RESET
// =========================

function clearData() {

    if (
        confirm(
            "Delete all Study Hub data?"
        )
    ) {

        localStorage.clear();

        location.reload();

    }

}


// =========================
// ESCAPE HTML
// =========================

function escapeDashboardHTML(value) {

    if (
        value === null ||
        value === undefined
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}
