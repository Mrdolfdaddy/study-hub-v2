// =========================
// STUDY HUB 4.5
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


    if (button &&
        button.classList.contains("nav-btn")) {

        button.classList.add("active");

    }

}


// =========================
// DATE
// =========================

function updateDate() {

    const element =
        document.getElementById("date");


    if (element) {

        element.textContent =
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

    updateProjectStats();

    updatePlannerStats();

    updateOverallProgress();

    updateDashboardTasks();

}


// =========================
// PROJECT STATS
// =========================

function updateProjectStats() {

    const projects =
        JSON.parse(
            localStorage.getItem(
                "studyHubProjects"
            )
        ) || [];


    const count =
        document.getElementById(
            "projectCount"
        );


    const text =
        document.getElementById(
            "projectProgressText"
        );


    if (count) {

        count.textContent =
            projects.length +
            (
                projects.length === 1
                    ? " Project"
                    : " Projects"
            );

    }


    if (!text) return;


    if (projects.length === 0) {

        text.textContent =
            "Create your first project.";

        return;

    }


    let totalTasks = 0;

    let completedTasks = 0;


    projects.forEach(project => {

        if (!project.tasks) return;


        totalTasks +=
            project.tasks.length;


        project.tasks.forEach(task => {

            if (task.done) {

                completedTasks++;

            }

        });

    });


    if (totalTasks === 0) {

        text.textContent =
            "No project tasks yet.";

        return;

    }


    const percent =
        Math.round(
            (completedTasks / totalTasks) * 100
        );


    text.textContent =
        percent +
        "% complete • " +
        completedTasks +
        " / " +
        totalTasks +
        " tasks";

}


// =========================
// PLANNER STATS
// =========================

function getPlannerStats() {

    const plans =
        JSON.parse(
            localStorage.getItem(
                "studyHubPlans"
            )
        ) || [];


    let total = 0;

    let completed = 0;


    plans.forEach(plan => {

        if (!plan.subjects) return;


        plan.subjects.forEach(subject => {

            if (!subject.days) return;


            Object.values(
                subject.days
            ).forEach(done => {

                total++;


                if (done) {

                    completed++;

                }

            });

        });

    });


    return {

        total: total,

        completed: completed,

        remaining:
            total - completed

    };

}


// =========================
// PLANNER DISPLAY
// =========================

function updatePlannerStats() {

    const stats =
        getPlannerStats();


    const completed =
        document.getElementById(
            "plannerCompleted"
        );


    const remaining =
        document.getElementById(
            "plannerRemaining"
        );


    const progress =
        document.getElementById(
            "plannerProgress"
        );


    if (completed) {

        completed.textContent =
            stats.completed;

    }


    if (remaining) {

        remaining.textContent =
            stats.remaining;

    }


    if (progress) {

        const percent =
            stats.total > 0
                ? Math.round(
                    (
                        stats.completed /
                        stats.total
                    ) * 100
                )
                : 0;


        progress.textContent =
            percent + "%";

    }

}


// =========================
// OVERALL PROGRESS
// =========================

function updateOverallProgress() {

    const projects =
        JSON.parse(
            localStorage.getItem(
                "studyHubProjects"
            )
        ) || [];


    const planner =
        getPlannerStats();


    let projectTotal = 0;

    let projectCompleted = 0;


    projects.forEach(project => {

        if (!project.tasks) return;


        projectTotal +=
            project.tasks.length;


        project.tasks.forEach(task => {

            if (task.done) {

                projectCompleted++;

            }

        });

    });


    const total =
        projectTotal +
        planner.total;


    const completed =
        projectCompleted +
        planner.completed;


    const percent =
        total > 0
            ? Math.round(
                (completed / total) * 100
            )
            : 0;


    const progress =
        document.getElementById(
            "dashboardProgress"
        );


    const fill =
        document.getElementById(
            "dashboardProgressFill"
        );


    const text =
        document.getElementById(
            "progressText"
        );


    if (progress) {

        progress.textContent =
            percent + "%";

    }


    if (fill) {

        fill.style.width =
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
// DASHBOARD TASKS
// =========================

function updateDashboardTasks() {

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

        if (!project.tasks) return;


        project.tasks.forEach(task => {

            if (!task.done) {

                tasks.push({

                    text: task.text,

                    project: project.name

                });

            }

        });

    });


    if (tasks.length === 0) {

        container.innerHTML = `

            <div class="dashboard-empty">

                🎉

                <div>

                    <strong>
                        You're all caught up!
                    </strong>

                    <p>
                        No unfinished project tasks.
                    </p>

                </div>

            </div>

        `;

        return;

    }


    container.innerHTML =
        tasks
        .slice(0, 8)
        .map(task => `

            <div class="dashboard-task">

                <div class="dashboard-task-icon">
                    ☐
                </div>

                <div>

                    <strong>
                        ${escapeDashboardText(task.text)}
                    </strong>

                    <small>
                        🚀 ${escapeDashboardText(task.project)}
                    </small>

                </div>

            </div>

        `)
        .join("");


    if (tasks.length > 8) {

        container.innerHTML += `

            <p class="dashboard-more">

                + ${tasks.length - 8}
                more tasks

            </p>

        `;

    }

}


// =========================
// SAFE DASHBOARD TEXT
// =========================

function escapeDashboardText(text) {

    if (!text) return "";

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


// =========================
// THEME
// =========================

function toggleTheme() {

    document.body.classList.toggle("dark");

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
// LOAD SETTINGS
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
