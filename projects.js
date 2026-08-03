// =========================
// STUDY HUB 4.3
// PROJECTS
// =========================

let projects = [];


// =========================
// LOAD
// =========================

document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

});


function loadProjects() {

    projects =
        JSON.parse(
            localStorage.getItem("studyHubProjects")
        ) || [];


    // Make sure every project has valid data
    projects.forEach(project => {

        if (!Array.isArray(project.tasks)) {
            project.tasks = [];
        }

        updateProgress(project);

    });


    saveProjects();

    renderProjects();

}


// =========================
// SAVE
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

    let name = prompt("Project name:");

    if (!name) return;


    let project = {

        id: Date.now(),

        name: name,

        description: "",

        progress: 0,

        tasks: []

    };


    projects.push(project);

    saveProjects();

    renderProjects();

    if (typeof updateDashboard === "function") {
        updateDashboard();
    }

}


// =========================
// RENDER PROJECTS
// =========================

function renderProjects() {

    let container =
        document.getElementById(
            "projectsContainer"
        );


    if (!container) return;


    // ALWAYS recalculate before displaying
    projects.forEach(project => {

        updateProgress(project);

    });


    if (projects.length === 0) {

        container.innerHTML = `

            <div class="card">

                <h2>No Projects Yet 🚀</h2>

                <p>Create your first project.</p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        projects.map(project => {

            return `

                <div class="project-card card">

                    <h2>
                        🚀 ${escapeHTML(project.name)}
                    </h2>


                    <div class="project-progress">

                        <div
                            class="progress-fill"
                            style="width:${project.progress}%"
                        ></div>

                    </div>


                    <p class="project-progress-text">

                        ${project.progress}% Complete

                    </p>


                    <textarea
                        placeholder="Description"
                        onchange="
                            updateDescription(
                                ${project.id},
                                this.value
                            )
                        "
                    >${escapeHTML(project.description || "")}</textarea>


                    <h3>Tasks</h3>


                    <div class="project-tasks">

                        ${renderTasks(project)}

                    </div>


                    <button
                        onclick="addTask(${project.id})"
                    >
                        ➕ Add Task
                    </button>


                    <button
                        onclick="deleteProject(${project.id})"
                    >
                        🗑 Delete
                    </button>

                </div>

            `;

        }).join("");


    saveProjects();

}


// =========================
// RENDER TASKS
// =========================

function renderTasks(project) {

    if (
        !project.tasks ||
        project.tasks.length === 0
    ) {

        return "<p>No tasks yet</p>";

    }


    return project.tasks.map(
        (task, index) => {

            return `

                <label class="project-check">

                    <input
                        type="checkbox"
                        ${task.done ? "checked" : ""}
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
    ).join("");

}


// =========================
// ADD TASK
// =========================

function addTask(id) {

    let text = prompt("Task name:");

    if (!text) return;


    let project =
        projects.find(
            project => project.id === id
        );


    if (!project) return;


    project.tasks.push({

        text: text,

        done: false

    });


    updateProgress(project);

    saveProjects();

    renderProjects();


    if (typeof updateDashboard === "function") {
        updateDashboard();
    }

}


// =========================
// TOGGLE TASK
// =========================

function toggleTask(id, index) {

    let project =
        projects.find(
            project => project.id === id
        );


    if (!project) return;


    let task =
        project.tasks[index];


    if (!task) return;


    // Toggle task
    task.done = !task.done;


    // Recalculate project
    updateProgress(project);


    // Save immediately
    saveProjects();


    // Redraw Projects immediately
    renderProjects();


    // Redraw Dashboard immediately
    if (typeof updateDashboard === "function") {
        updateDashboard();
    }

}


// =========================
// UPDATE PROGRESS
// =========================

function updateProgress(project) {

    if (
        !project.tasks ||
        project.tasks.length === 0
    ) {

        project.progress = 0;

        return;

    }


    let completed =
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


// =========================
// UPDATE DESCRIPTION
// =========================

function updateDescription(id, value) {

    let project =
        projects.find(
            project => project.id === id
        );


    if (!project) return;


    project.description = value;

    saveProjects();

}


// =========================
// DELETE PROJECT
// =========================

function deleteProject(id) {

    projects =
        projects.filter(
            project =>
                project.id !== id
        );


    saveProjects();

    renderProjects();


    if (typeof updateDashboard === "function") {
        updateDashboard();
    }

}


// =========================
// ESCAPE HTML
// =========================

function escapeHTML(value) {

    if (value === null || value === undefined) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}
