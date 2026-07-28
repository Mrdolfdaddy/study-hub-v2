// =========================
// STUDY HUB 4.3
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

    updateDashboardProgress();

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


    projects.push({

        id:Date.now(),

        name:name,

        description:"",

        progress:0,

        tasks:[]

    });


    saveProjects();

    renderProjects();

    updateDashboardProgress();

}







function renderProjects(){


    let container =
    document.getElementById("projectsContainer");


    if(!container) return;



    if(projects.length === 0){

        container.innerHTML = `

        <div class="card">

        <h2>No Projects Yet 🚀</h2>

        <p>Create your first project.</p>

        </div>

        `;

        return;

    }







    container.innerHTML = projects.map(project => `


<div class="project-card card">


<h2>🚀 ${project.name}</h2>


<div class="project-progress">


<div class="progress-fill"

style="width:${project.progress}%">

</div>


</div>


<p>${project.progress}% Complete</p>




<textarea

placeholder="Description"

onchange="updateDescription(${project.id},this.value)"

>${project.description}</textarea>





<h3>Tasks</h3>



<div class="project-tasks">

${renderTasks(project)}

</div>





<button onclick="addTask(${project.id})">

➕ Add Task

</button>



<button onclick="deleteProject(${project.id})">

🗑 Delete

</button>



</div>



`).join("");

}





function renderTasks(project){


if(project.tasks.length === 0){

return "<p>No tasks yet</p>";

}





return project.tasks.map((task,index)=>`


<label class="project-check">


<input

type="checkbox"

${task.done ? "checked":""}

onchange="toggleTask(${project.id},${index})"

>


<span>

${task.text}

</span>


</label>



`).join("");

}









function addTask(id){


let text = prompt("Task name:");

if(!text) return;



let project =
projects.find(p=>p.id===id);



project.tasks.push({

text:text,

done:false

});



updateProgress(project);


saveProjects();

renderProjects();

updateDashboardProgress();


}









function toggleTask(id,index){


let project =
projects.find(p=>p.id===id);



project.tasks[index].done =
!project.tasks[index].done;



updateProgress(project);


saveProjects();

renderProjects();

updateDashboardProgress();


}









function updateProgress(project){


if(project.tasks.length === 0){

project.progress = 0;

return;

}



let completed =
project.tasks.filter(
task=>task.done
).length;



project.progress =
Math.round(
(completed / project.tasks.length) * 100
);


}









function updateDescription(id,value){


let project =
projects.find(p=>p.id===id);


project.description=value;


saveProjects();


}









function deleteProject(id){


projects =
projects.filter(
project=>project.id !== id
);


saveProjects();


renderProjects();

updateDashboardProgress();


}









// =========================
// DASHBOARD SYNC
// =========================


function updateDashboardProgress(){


let totalTasks = 0;

let completedTasks = 0;



projects.forEach(project=>{


project.tasks.forEach(task=>{


totalTasks++;


if(task.done){

completedTasks++;

}


});


});



let percentage = 0;



if(totalTasks > 0){

percentage =
Math.round(
(completedTasks / totalTasks) * 100
);

}




let progressText =
document.getElementById("progressText");


if(progressText){

progressText.innerText =
percentage + "%";

}




let progressCircle =
document.getElementById("progressCircle");


if(progressCircle){

progressCircle.style.setProperty(
"--progress",
percentage + "%"
);

}



}
