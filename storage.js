// Study Hub 3.0
// Storage System + Default Resources


const STORAGE_KEY = "studyHubPlans";




// Permanent links that are always available

const defaultResources = [

    {
        name:"🤖 ChatGPT",
        url:"https://chat.openai.com"
    },

    {
        name:"🎵 Spotify",
        url:"https://spotify.com"
    },

    {
        name:"📄 Google Docs",
        url:"https://docs.google.com"
    },

    {
        name:"▶️ YouTube",
        url:"https://youtube.com"
    }

];







function createSubject(name){


    return {


        title:name,


        description:"",


        notes:"",


        resources:[...defaultResources],



        days:{


            Monday:false,

            Tuesday:false,

            Wednesday:false,

            Thursday:false,

            Friday:false


        }


    };


}








const defaultPlan = {


    id:Date.now(),


    name:"Week 1",


    weekStart:"",


    weekEnd:"",


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








function loadPlans(){



    let saved = localStorage.getItem(STORAGE_KEY);



    if(saved){


        return JSON.parse(saved);


    }



    let plans = [defaultPlan];



    savePlans(plans);



    return plans;


}








function savePlans(plans){



    localStorage.setItem(

        STORAGE_KEY,

        JSON.stringify(plans)

    );


}








function getCurrentPlan(){



    let plans = loadPlans();



    return plans[0];



}








function getDefaultResources(){


    return [...defaultResources];


}
