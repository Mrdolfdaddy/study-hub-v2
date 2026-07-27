// Study Hub 3.0
// Storage System


const STORAGE_KEY = "studyHubPlans";




// Create a subject

function createSubject(name){

    return {

        title:name,

        description:"",

        notes:"",

        days:{

            Monday:false,

            Tuesday:false,

            Wednesday:false,

            Thursday:false,

            Friday:false

        }

    };

}






// Default plan

const defaultPlan = {

    id:Date.now(),

    name:"Week 1",

    startDate:"",

    endDate:"",

    studentNotes:"",

    teacherNotes:"",

    subjects:[

        createSubject("Reading"),

        createSubject("Writing"),

        createSubject("Numeracy"),

        createSubject("Careers Education"),

        createSubject("Respectful Relationships"),

        createSubject("Brain Warm Up"),

        createSubject("Brain Break")

    ]

};






// Load plans

function loadPlans(){


    const saved =
    localStorage.getItem(STORAGE_KEY);



    if(saved){

        return JSON.parse(saved);

    }



    const plans=[defaultPlan];


    savePlans(plans);


    return plans;


}







// Save plans

function savePlans(plans){


    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(plans)

    );


}







// Current plan

function getCurrentPlanID(){


    return localStorage.getItem(
        "currentPlan"
    );


}







function setCurrentPlanID(id){


    localStorage.setItem(

        "currentPlan",

        id

    );


}







// Get active plan

function getCurrentPlan(){


    const plans =
    loadPlans();



    let id =
    getCurrentPlanID();



    if(!id){


        setCurrentPlanID(
            plans[0].id
        );


        return plans[0];


    }




    return plans.find(

        plan => plan.id == id

    ) || plans[0];


}