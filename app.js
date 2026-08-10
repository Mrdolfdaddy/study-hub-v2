// =========================
// STUDY HUB 4.5
// APP CONTROLS + DASHBOARD
// =========================


// =========================
// STARTUP
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

function showPage(page, button = null) {

    // Hide every page
    document.querySelectorAll(".page")
        .forEach(section => {

            section.classList.remove("active");

        });


    // Show selected page
    const selectedPage =
        document.getElementById(page);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    // Remove active state from sidebar
    document.querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove("active");

        });


    // Only activate sidebar button
    if (
        button &&
        button.classList.contains("nav-btn")
    ) {

        button.classList.add("active");

    }


    // Refresh dashboard whenever we return to it
    if (page === "dashboard") {

        updateDashboard();

    }

}


// =========================
// DATE
// =========================

function updateDate() {

    const element =
        document.getElementById("date");


    if (!element) return;


    element.textContent =
        new Date().toDateString();

}


// =========================
// CLOCK
// =========================

function updateClock() {

    const clock =
        document.getElementById("clock");


    if (!clock) return;


    clock.textContent =
        new Date().toLocaleTimeString();

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
// GET PROJECTS
// =========================

function getDashboardProjects() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "studyHubProjects"
            )
        ) || [];

    } catch (error) {

        console.error(
            "Could not load projects:",
            error
        );

        return [];

    }

}


// =========================
// PROJECT STATS
// =========================

function updateProjectStats() {

    const projects =
        getDashboardProjects();


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

        if (!Array.isArray(project.tasks)) {
            return;
        }


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
            (
                completedTasks /
                totalTasks
            ) * 100
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

    let plans = [];


    try {

        plans =
            JSON.parse(
                localStorage.getItem(
                    "studyHubPlans"
                )
            ) || [];

    } catch (error) {

        console.error(
            "Could not load planner:",
            error
        );

    }


    let totalSessions = 0;

    let completedSessions = 0;


    plans.forEach(plan => {

        if (!Array.isArray(plan.subjects)) {
            return;
        }


        plan.subjects.forEach(subject => {

            if (!subject.days) {
                return;
            }


            Object.values(
                subject.days
            ).forEach(done => {

                totalSessions++;


                if (done) {

                    completedSessions++;

                }

            });

        });

    });


    return {

        total: totalSessions,

        completed: completedSessions,

        remaining:
            totalSessions -
            completedSessions

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
//
// IMPORTANT:
// Only REAL PROJECT TASKS are
// counted here.
//
// Planner checkboxes are
// study sessions, not tasks.
//

function updateOverallProgress() {

    const projects =
        getDashboardProjects();


    let totalTasks = 0;

    let completedTasks = 0;


    projects.forEach(project => {

        if (!Array.isArray(project.tasks)) {
            return;
        }


        totalTasks +=
            project.tasks.length;


        project.tasks.forEach(task => {

            if (task.done) {

                completedTasks++;

            }

        });

    });


    const percent =
        totalTasks > 0
            ? Math.round(
                (
                    completedTasks /
                    totalTasks
                ) * 100
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

        if (totalTasks === 0) {

            text.textContent =
                "No project tasks yet";

        } else {

            text.textContent =
                completedTasks +
                " / " +
                totalTasks +
                " tasks completed";

        }

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
        getDashboardProjects();


    const tasks = [];


    projects.forEach(project => {

        if (!Array.isArray(project.tasks)) {
            return;
        }


        project.tasks.forEach(
            (task, index) => {

                if (!task.done) {

                    tasks.push({

                        text: task.text,

                        project: project.name,

                        projectId: project.id,

                        taskIndex: index

                    });

                }

            }
        );

    });


    // Nothing left
    if (tasks.length === 0) {

        container.innerHTML = `

            <div class="dashboard-empty">

                <div class="dashboard-empty-icon">
                    ✓
                </div>

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

            <label
                class="dashboard-task"
                data-project-id="${task.projectId}"
                data-task-index="${task.taskIndex}"
            >

                <span class="dashboard-task-checkbox">

                    <input
                        type="checkbox"
                        onchange="
                            completeDashboardTask(
                                ${task.projectId},
                                ${task.taskIndex},
                                this
                            )
                        "
                    >

                    <span class="dashboard-checkmark">
                        ✓
                    </span>

                </span>


                <span class="dashboard-task-info">

                    <strong>
                        ${escapeDashboardText(
                            task.text
                        )}
                    </strong>

                    <small>
                        🚀 ${escapeDashboardText(
                            task.project
                        )}
                    </small>

                </span>

            </label>

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
// COMPLETE DASHBOARD TASK
// =========================

function completeDashboardTask(
    projectId,
    taskIndex,
    checkbox
) {

    const projects =
        getDashboardProjects();


    const project =
        projects.find(
            p => p.id == projectId
        );


    if (!project) return;


    if (!Array.isArray(project.tasks)) {
        return;
    }


    const task =
        project.tasks[taskIndex];


    if (!task) return;


    // Mark complete
    task.done = true;


    // Recalculate project progress
    updateProjectProgressFromDashboard(
        project
    );


    // Save
    localStorage.setItem(
        "studyHubProjects",
        JSON.stringify(projects)
    );


    // Add completed animation
    const taskElement =
        checkbox.closest(
            ".dashboard-task"
        );


    if (taskElement) {

        taskElement.classList.add(
            "dashboard-task-completing"
        );

    }


    // Wait for animation, then refresh
    setTimeout(() => {

        updateDashboard();

    }, 450);

}


// =========================
// PROJECT PROGRESS
// =========================

function updateProjectProgressFromDashboard(
    project
) {

    if (
        !Array.isArray(project.tasks) ||
        project.tasks.length === 0
    ) {

        project.progress = 0;

        return;

    }


    const completed =
        project.tasks.filter(
            task => task.done
        ).length;


    project.progress =
        Math.round(
            (
                completed /
                project.tasks.length
            ) * 100
        );

}


// =========================
// SAFE TEXT
// =========================

function escapeDashboardText(text) {

    if (!text) return "";


    return String(text)
        .replace(/&/g, "&amp;")
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
