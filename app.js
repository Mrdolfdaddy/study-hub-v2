// =========================
// STUDY HUB 3.0
// APP CONTROLS
// =========================



document.addEventListener("DOMContentLoaded", () => {


    updateDate();

    updateClock();

    loadSettings();


    setInterval(updateClock,1000);


});








// PAGE SWITCHING


function showPage(page){


    document.querySelectorAll(".page")
    .forEach(section=>{


        section.classList.remove("active");


    });



    document.getElementById(page)
    .classList.add("active");





    document.querySelectorAll(".nav-btn")
    .forEach(btn=>{


        btn.classList.remove("active");


    });



    event.target.classList.add("active");



}








// DATE


function updateDate(){


    let date = new Date();


    let element =
    document.getElementById("date");


    if(element){


        element.textContent =
        date.toDateString();


    }


}








// CLOCK


function updateClock(){


    let clock =
    document.getElementById("clock");



    if(clock){


        clock.textContent =
        new Date()
        .toLocaleTimeString();


    }


}









// THEME


function toggleTheme(){


    document.body.classList.toggle("dark");


    saveSettings();


}









// FONT


function changeFont(font){


    document.body.style.fontFamily =
    font;


    localStorage.setItem(
        "studyFont",
        font
    );


}








// ACCENT COLOUR


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








// SETTINGS SAVE


function saveSettings(){


    localStorage.setItem(

        "studyDark",

        document.body.classList.contains("dark")

    );


}








function loadSettings(){



    let font =
    localStorage.getItem("studyFont");



    let accent =
    localStorage.getItem("studyAccent");



    let dark =
    localStorage.getItem("studyDark");





    if(font){


        document.body.style.fontFamily =
        font;



        let select =
        document.getElementById("fontSelect");



        if(select){

            select.value = font;

        }


    }






    if(accent){


        document.documentElement
        .style.setProperty(
            "--accent",
            accent
        );


        let picker =
        document.getElementById("accentPicker");


        if(picker){

            picker.value = accent;

        }


    }







    if(dark === "true"){


        document.body.classList.add("dark");


    }



}








// RESET


function clearData(){


    if(confirm("Delete all Study Hub data?")){


        localStorage.clear();


        location.reload();


    }


}
