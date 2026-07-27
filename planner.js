// Study Hub 3.0
// Learning Planner System


let plans = loadPlans();




// Start planner

document.addEventListener(
"DOMContentLoaded",
()=>{

    loadPlanner();

});







// Load planner

function loadPlanner(){


    const selector =
    document.getElementById("planSelector");


    if(!selector) return;



    plans = loadPlans();



    selector.innerHTML="";



    plans.forEach(plan=>{


        let option =
        document.createElement("option");


        option.value = plan.id;


        option.textContent = plan.name;


        selector.appendChild(option);


    });



    const current =
    getCurrentPlan();



    selector.value =
    current.id;



    renderPlanner(current);


}







// Display planner

function renderPlanner(plan){


    const container =
    document.getElementById("plannerContainer");


    if(!container) return;



    container.innerHTML="";



    let html = `


<div class="card">


<h2>${plan.name}</h2>


<table class="learning-table">


<tr>

<th>Subject</th>

<th>Monday</th>

<th>Tuesday</th>

<th>Wednesday</th>

<th>Thursday</th>

<th>Friday</th>

</tr>



`;





plan.subjects.forEach((subject,index)=>{


html += `


<tr>


<td>


<h3>
${subject.title}
</h3>


<textarea

placeholder="Learning goal..."

onchange="updateDescription(${index},this.value)"

>${subject.description}</textarea>



<textarea

placeholder="Notes..."

onchange="updateNotes(${index},this.value)"

>${subject.notes}</textarea>



</td>



${createCheckbox(index,"Monday",subject.days.Monday)}

${createCheckbox(index,"Tuesday",subject.days.Tuesday)}

${createCheckbox(index,"Wednesday",subject.days.Wednesday)}

${createCheckbox(index,"Thursday",subject.days.Thursday)}

${createCheckbox(index,"Friday",subject.days.Friday)}



</tr>


`;



});



html += `

</table>


<h3>📝 Student Notes</h3>


<textarea

placeholder="Student notes..."

onchange="updateStudentNotes(this.value)"

>${plan.studentNotes || ""}</textarea>



<h3>👨‍🏫 Teacher Notes</h3>


<textarea

placeholder="Teacher notes..."

onchange="updateTeacherNotes(this.value)"

>${plan.teacherNotes || ""}</textarea>



</div>

`;



container.innerHTML = html;


}








// Create checkbox

function createCheckbox(subject,day,value){


return `


<td>


<input

type="checkbox"

${value ? "checked":""}

onchange="toggleDay(${subject},'${day}',this.checked)"

>


</td>


`;


}








// Update description

function updateDescription(index,value){


let plan =
getCurrentPlan();


plan.subjects[index].description=value;


savePlans(plans);


}







// Update notes

function updateNotes(index,value){


let plan =
getCurrentPlan();


plan.subjects[index].notes=value;


savePlans(plans);


}








// Toggle checkbox

function toggleDay(subject,day,value){


let plan =
getCurrentPlan();


plan.subjects[subject].days[day]=value;


savePlans(plans);


}








// Student notes

function updateStudentNotes(value){


let plan =
getCurrentPlan();


plan.studentNotes=value;


savePlans(plans);


}







// Teacher notes

function updateTeacherNotes(value){


let plan =
getCurrentPlan();


plan.teacherNotes=value;


savePlans(plans);


}








// New week

function createPlan(){


let name =
prompt("Name your week:");



if(!name) return;




let newPlan={


id:Date.now(),


name:name,


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



plans.push(newPlan);



savePlans(plans);



setCurrentPlanID(newPlan.id);



loadPlanner();


}








// Change week

function changePlan(id){


setCurrentPlanID(id);


renderPlanner(
getCurrentPlan()
);


}