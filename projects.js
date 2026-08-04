// =========================
// STUDY HUB 4.3
// PROJECTS - REBUILT
// =========================


let projects = [];


// =========================
// START
// =========================

document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

});


// =========================
// LOAD PROJECTS
// =========================

function loadProjects() {

    try {

        const saved =
            localStorage.getItem(
                "studyHubProjects"
            );


        projects =
            saved
                ? JSON.parse(saved)
                : [];


        if (!Array.isArray(projects)) {

            projects = [];

        }


    } catch (error) {

        console.error(
            "Could not load projects:",
            error
        );

        projects = [];

    }


    // Make sure all projects have proper data
    projects.forEach(project => {

        if (!Array.isArray(project.tasks)) {

            project.tasks = [];

        }


        if (
            typeof project.description !==
            "string"
        ) {

            project.description = "";

        }


        calculateProjectProgress(project);

    });


    saveProjects();

    renderProjects();

}


// =========================
// SAVE PROJECTS
// =========================

function saveProjects() {

    localStorage.setItem(

        "studyHubProjects",

        JSON.stringify(projects)

    );

}


// =========================
// CREATE PROJECT
// =========================

function createProject() {

    const name =
        prompt("Project name:");


    if (!name || !name.trim()) {

        return;

    }


    const project = {

        id: Date.now(),

        name: name.trim(),

        description: "",

        progress: 0,

        tasks: []

    };


    projects.push(project);


    saveProjects();

    renderProjects();

    refreshDashboard();

}


// =========================
// RENDER PROJECTS
// =========================

function renderProjects() {

    const container =
        document.getElementById(
            "projectsContainer"
        );


    if (!container) {

        return;

    }


    // Recalculate EVERYTHING before drawing
    projects.forEach(project => {

        calculateProjectProgress(project);

    });


    if (projects.length === 0) {

        container.innerHTML = `

            <div class="card">

                <h2>
                    No Projects Yet 🚀
                </h2>

                <p>
                    Create your first project.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        projects
            .map(project =>
                createProjectHTML(project)
            )
            .join("");


    // Save recalculated percentages
    saveProjects();

}


// =========================
// PROJECT HTML
// =========================

function createProjectHTML(project) {

    const taskCount =
        project.tasks.length;


    const completedCount =
        project.tasks.filter(
            task => task.done === true
        ).length;


    return `

        <div
            class="project-card card"
            data-project-id="${project.id}"
        >

            <h2>
                🚀 ${escapeHTML(project.name)}
            </h2>


            <div class="project-progress">

                <div
                    class="progress-fill"
                    style="width:${project.progress}%"
                ></div>

            </div>


            <p class="project-percentage">

                ${project.progress}% Complete

                ${
                    taskCount > 0
                        ? `(${completedCount}/${taskCount})`
                        : ""
                }

            </p>


            <textarea
                class="project-description"
                placeholder="Description"
                data-project-id="${project.id}"
            >${escapeHTML(
                project.description
            )}</textarea>


            <h3>
                Tasks
            </h3>


            <div class="project-tasks">

                ${
                    taskCount === 0
                        ? "<p>No tasks yet</p>"
                        : project.tasks
                            .map(
                                (task, index) =>
                                    createTaskHTML(
                                        project,
                                        task,
                                        index
                                    )
                            )
                            .join("")
                }

            </div>


            <button
                type="button"
                onclick="
                    addTask(${project.id})
                "
            >

                ➕ Add Task

            </button>


            <button
                type="button"
                onclick="
                    deleteProject(${project.id})
                "
            >

                🗑 Delete

            </button>

        </div>

    `;

}


// =========================
// TASK HTML
// =========================

function createTaskHTML(
    project,
    task,
    index
) {

    return `

        <label
            class="project-check"
        >

            <input

                type="checkbox"

                class="project-task-checkbox"

                ${
                    task.done
                        ? "checked"
                        : ""
                }

                onchange="
                    toggleTask(
                        ${project.id},
                        ${index}
                    )
                "

            >

            <span>

                ${escapeHTML(task.text)}

            </span>

        </label>

    `;

}


// =========================
// ADD TASK
// =========================

function addTask(projectId) {

    const project =
        projects.find(
            p => p.id === projectId
        );


    if (!project) {

        return;

    }


    const text =
        prompt("Task name:");


    if (!text || !text.trim()) {

        return;

    }


    project.tasks.push({

        text: text.trim(),

        done: false

    });


    calculateProjectProgress(project);

    saveProjects();

    renderProjects();

    refreshDashboard();

}


// =========================
// TOGGLE TASK
// =========================

function toggleTask(
    projectId,
    taskIndex
) {

    const project =
        projects.find(
            p => p.id === projectId
        );


    if (!project) {

        return;

    }


    const task =
        project.tasks[taskIndex];


    if (!task) {

        return;

    }


    // Toggle
    task.done =
        !task.done;


    // Recalculate immediately
    calculateProjectProgress(project);


    // Save immediately
    saveProjects();


    // Redraw project immediately
    renderProjects();


    // Redraw dashboard immediately
    refreshDashboard();

}


// =========================
// CALCULATE PROGRESS
// =========================

function calculateProjectProgress(
    project
) {

    if (
        !project.tasks ||
        project.tasks.length === 0
    ) {

        project.progress = 0;

        return 0;

    }


    const completed =
        project.tasks.filter(
            task => task.done === true
        ).length;


    const percentage =
        Math.round(
            (
                completed /
                project.tasks.length
            ) * 100
        );


    project.progress =
        percentage;


    return percentage;

}


// =========================
// DESCRIPTION
// =========================

function updateDescription(
    projectId,
    value
) {

    const project =
        projects.find(
            p => p.id === projectId
        );


    if (!project) {

        return;

    }


    project.description =
        value;


    saveProjects();

}


// =========================
// DELETE PROJECT
// =========================

function deleteProject(
    projectId
) {

    const confirmed =
        confirm(
            "Delete this project?"
        );


    if (!confirmed) {

        return;

    }


    projects =
        projects.filter(
            project =>
                project.id !== projectId
        );


    saveProjects();

    renderProjects();

    refreshDashboard();

}


// =========================
// DASHBOARD REFRESH
// =========================

function refreshDashboard() {

    if (
        typeof updateDashboard ===
        "function"
    ) {

        updateDashboard();

    }

}


// =========================
// DESCRIPTION AUTO-SAVE
// =========================

document.addEventListener(
    "change",
    event => {

        if (
            !event.target.classList.contains(
                "project-description"
            )
        ) {

            return;

        }


        const projectId =
            Number(
                event.target.dataset.projectId
            );


        updateDescription(
            projectId,
            event.target.value
        );

    }
);


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(value) {

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
