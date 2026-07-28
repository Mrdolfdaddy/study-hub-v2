// =========================
// STUDY HUB 4.3
// APP CONTROLS + DASHBOARD
// =========================



document.addEventListener("DOMContentLoaded", () => {

    updateDate();

    updateClock();

    loadSettings();

    updateDashboard();


    setInterval(updateClock,1000);


});







// =========================
// PAGE SWITCHING
// =========================


function showPage(page, button){


    document.querySelectorAll(".page")
    .forEach(section=>{

        section.classList.remove("active");

    });



    let selected =
    document.getElementById(page);



    if(selected){

        selected.classList.add("active");

    }




    document.querySelectorAll(".nav-btn")
    .forEach(btn=>{

        btn.classList.remove("active");

    });



    if(button){

        button.classList.add("active");

    }


}









// =========================
// DATE
// =========================


function updateDate(){


    let date =
    document.getElementById("date");


    if(date){

        date.textContent =
        new Date().toDateString();

    }


}









// =========================
// CLOCK
// =========================


function updateClock(){


    let clock =
    document.getElementById("clock");



    if(clock){

        clock.textContent =
        new Date().toLocaleTimeString();

    }


}









// =========================
// DASHBOARD
// =========================


function updateDashboard(){


    updateProjectCount();

    updateProgress();

    updateTasks();


}








function updateProjectCount(){


    let projects =
    JSON.parse(
        localStorage.getItem("studyHubProjects")
    ) || [];



    let element =
    document.getElementById("projectCount");



    if(element){


        element.textContent =
        projects.length +
        (projects.length === 1 ? " Project" : " Projects");


    }


}









function updateProgress(){


    let projects =
    JSON.parse(
        localStorage.getItem("studyHubProjects")
    ) || [];



    let total = 0;

    let completed = 0;



    projects.forEach(project=>{


        if(project.tasks){


            total += project.tasks.length;



            project.tasks.forEach(task=>{


                if(task.done){

                    completed++;

                }


            });


        }


    });





    let percent = 0;



    if(total > 0){

        percent =
        Math.round(
            (completed / total) * 100
        );

    }






    let progress =
    document.getElementById(
        "dashboardProgress"
    );



    let text =
    document.getElementById(
        "progressText"
    );





    if(progress){

        progress.textContent =
        percent + "%";

    }




    if(text){


        text.textContent =
        completed +
        " / " +
        total +
        " tasks completed";


    }



}









function updateTasks(){


    let container =
    document.getElementById(
        "todayTasks"
    );



    if(!container) return;





    let projects =
    JSON.parse(
        localStorage.getItem("studyHubProjects")
    ) || [];



    let tasks = [];





    projects.forEach(project=>{


        if(project.tasks){


            project.tasks.forEach(task=>{


                if(!task.done){

                    tasks.push(task.text);

                }


            });


        }


    });






    if(tasks.length === 0){


        container.innerHTML =
        "<p>🎉 No unfinished tasks!</p>";

        return;


    }





    container.innerHTML = tasks
    .slice(0,5)
    .map(task=>`

        <p>☐ ${task}</p>

    `)
    .join("");

}









// =========================
// THEME
// =========================


function toggleTheme(){


    document.body.classList.toggle("dark");


    saveSettings();


}









// =========================
// FONT
// =========================


function changeFont(font){


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


function changeAccent(color){


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


function saveSettings(){


    localStorage.setItem(

        "studyDark",

        document.body.classList.contains("dark")

    );


}









function loadSettings(){



    let font =
    localStorage.getItem(
        "studyFont"
    );



    let accent =
    localStorage.getItem(
        "studyAccent"
    );



    let dark =
    localStorage.getItem(
        "studyDark"
    );






    if(font){


        document.body.style.fontFamily =
        font;


    }





    if(accent){


        document.documentElement
        .style.setProperty(
            "--accent",
            accent
        );


    }






    if(dark === "true"){


        document.body.classList.add("dark");


    }



}









// =========================
// RESET
// =========================


function clearData(){


    if(confirm("Delete all Study Hub data?")){


        localStorage.clear();


        location.reload();


    }


}
