// =========================
// STUDY HUB 4.3
// PROJECTS
// =========================


let projects = [];



// =========================
// LOAD PROJECTS
// =========================


document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

});



function loadProjects() {

    projects =
        JSON.parse(
            localStorage.getItem("studyHubProjects")
        ) || [];


    // Recalculate every project
    projects.forEach(project => {

        updateProgress(project);

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

    let name =
        prompt("Project name:");


    if (!name) return;



    projects.push({

        id: Date.now(),

        name: name,

        description: "",

        progress: 0,

        tasks: []

    });



    saveProjects();

    renderProjects();

    updateDashboard();

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



    // IMPORTANT:
    // Recalculate progress BEFORE displaying cards

    projects.forEach(project => {

        updateProgress(project);

    });



    saveProjects();



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
        projects.map(project => `


        <div class="project-card card">


            <h2>
                🚀 ${project.name}
            </h2>



            <div class="project-progress">

                <div
                    class="progress-fill"
                    style="width:${project.progress}%"
                ></div>

            </div>



            <p>
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

            >${project.description}</textarea>



            <h3>
                Tasks
            </h3>



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


        `).join("");

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
        (task, index) => `

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
                    ${task.text}
                </span>

            </label>

        `
    ).join("");

}



// =========================
// ADD TASK
// =========================


function addTask(id) {


    let text =
        prompt("Task name:");


    if (!text) return;



    let project =
        projects.find(
            p => p.id === id
        );


    if (!project) return;



    project.tasks.push({

        text: text,

        done: false

    });



    // Recalculate immediately
    updateProgress(project);



    saveProjects();

    renderProjects();

    updateDashboard();

}



// =========================
// TOGGLE TASK
// =========================


function toggleTask(id, index) {


    let project =
        projects.find(
            p => p.id === id
        );


    if (!project) return;



    if (!project.tasks[index]) return;



    project.tasks[index].done =
        !project.tasks[index].done;



    // Recalculate immediately
    updateProgress(project);



    saveProjects();

    renderProjects();

    updateDashboard();

}



// =========================
// UPDATE PROJECT PROGRESS
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


function updateDescription(
    id,
    value
) {


    let project =
        projects.find(
            p => p.id === id
        );


    if (!project) return;



    project.description =
        value;



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

    updateDashboard();

}
