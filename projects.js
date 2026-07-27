// =========================
// STUDY HUB 4.1
// PROJECTS
// =========================


let projects = [];





document.addEventListener("DOMContentLoaded", () => {

    loadProjects();

});







function loadProjects(){

    projects = JSON.parse(
        localStorage.getItem("studyHubProjects")
    ) || [];


    renderProjects();

}








function saveProjects(){

    localStorage.setItem(
        "studyHubProjects",
        JSON.stringify(projects)
    );

}








function createProject(){


    let name = prompt("Project name:");



    if(!name) return;




    let project = {


        id: Date.now(),


        name:name,


        description:"",


        progress:0,


        tasks:[]


    };



    projects.push(project);



    saveProjects();


    renderProjects();


}








function renderProjects(){


    let container =
    document.getElementById("projectsContainer");



    if(!container) return;




    if(projects.length === 0){


        container.innerHTML = `

        <div class="card">

        <h2>No Projects Yet</h2>

        <p>Create your first project 🚀</p>

        </div>

        `;


        return;


    }







    container.innerHTML = projects.map(project => {



        return `


        <div class="project-card card">


            <h2>🚀 ${project.name}</h2>



            <div class="progress-bar">


                <div class="progress-fill"

                style="width:${project.progress}%">

                </div>


            </div>



            <p>${project.progress}% Complete</p>





            <textarea

            placeholder="Description"

            onchange="updateProjectDescription(${project.id}, this.value)"

            >${project.description}</textarea>






            <h3>Tasks</h3>




            ${renderTasks(project)}





            <button onclick="addTask(${project.id})">

            ➕ Add Task

            </button>



            <button onclick="deleteProject(${project.id})">

            🗑 Delete

            </button>



        </div>


        `;


    }).join("");



}









function renderTasks(project){



    if(project.tasks.length === 0){

        return "<p>No tasks yet</p>";

    }





    return project.tasks.map((task,index)=>{


        return `


        <label class="project-task">


        <input

        type="checkbox"

        ${task.done ? "checked":""}

        onchange="toggleTask(${project.id},${index})"


        >


        ${task.text}


        </label>


        <br>


        `;


    }).join("");



}








function addTask(id){


    let task =
    prompt("Task name:");



    if(!task) return;




    let project =
    projects.find(p=>p.id===id);



    project.tasks.push({

        text:task,

        done:false

    });



    updateProgress(project);


    saveProjects();


    renderProjects();


}









function toggleTask(id,index){



    let project =
    projects.find(p=>p.id===id);



    project.tasks[index].done =
    !project.tasks[index].done;



    updateProgress(project);


    saveProjects();


    renderProjects();



}








function updateProgress(project){



    if(project.tasks.length===0){


        project.progress=0;


        return;


    }





    let completed =
    project.tasks.filter(
        task=>task.done
    ).length;




    project.progress =
    Math.round(
        (completed/project.tasks.length)*100
    );



}








function updateProjectDescription(id,value){



    let project =
    projects.find(p=>p.id===id);



    project.description=value;



    saveProjects();



}








function deleteProject(id){



    projects =
    projects.filter(
        project=>project.id!==id
    );



    saveProjects();


    renderProjects();


}
