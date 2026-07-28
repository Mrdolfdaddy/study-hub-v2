// =========================
// STUDY HUB 4.2
// BACKUP SYSTEM
// =========================



function exportBackup(){


    let backup = {


        date: new Date().toISOString(),


        planner:
        localStorage.getItem("studyHubPlans"),



        projects:
        localStorage.getItem("studyHubProjects"),



        theme:
        localStorage.getItem("studyHubTheme")



    };





    let file = new Blob(

        [
            JSON.stringify(
                backup,
                null,
                2
            )
        ],

        {
            type:"application/json"
        }

    );





    let link =
    document.createElement("a");



    link.href =
    URL.createObjectURL(file);



    link.download =
    "Study-Hub-Backup.json";



    link.click();



}








function importBackup(event){



    let file =
    event.target.files[0];



    if(!file) return;





    let reader =
    new FileReader();





    reader.onload = function(e){



        let backup =
        JSON.parse(
            e.target.result
        );





        if(backup.planner){

            localStorage.setItem(
                "studyHubPlans",
                backup.planner
            );

        }





        if(backup.projects){

            localStorage.setItem(
                "studyHubProjects",
                backup.projects
            );

        }





        if(backup.theme){

            localStorage.setItem(
                "studyHubTheme",
                backup.theme
            );

        }





        alert(
            "Backup restored! Refreshing..."
        );



        location.reload();



    };





    reader.readAsText(file);



}
