// Study Hub 3.0
// Main App Controller


document.addEventListener("DOMContentLoaded", () => {

    updateClock();

    setInterval(updateClock, 1000);

});




// Page navigation

function showPage(page){


    document
    .querySelectorAll(".page")
    .forEach(section=>{

        section.classList.remove("active");

    });



    const selected =
    document.getElementById(page);



    if(selected){

        selected.classList.add("active");

    }



    document
    .querySelectorAll(".nav-btn")
    .forEach(button=>{

        button.classList.remove("active");

    });


}







// Dark mode toggle

function toggleTheme(){


    document.body.classList.toggle("light");


    localStorage.setItem(

        "theme",

        document.body.classList.contains("light")
        ? "light"
        : "dark"

    );


}







// Load saved theme

window.onload = () => {


    const theme =
    localStorage.getItem("theme");


    if(theme === "light"){

        document.body.classList.add("light");

    }


};







// Clock

function updateClock(){


    const date =
    document.getElementById("date");


    const clock =
    document.getElementById("clock");



    const now = new Date();



    if(date){

        date.textContent =
        now.toLocaleDateString();

    }



    if(clock){

        clock.textContent =
        now.toLocaleTimeString();

    }


}