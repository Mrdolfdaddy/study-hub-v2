// Study Hub 3.0
// Learning Planner


let plans = loadPlans();



document.addEventListener("DOMContentLoaded", () => {

    loadPlanner();

});





function loadPlanner(){


    plans = loadPlans();


    const container = document.getElementById("plannerContainer");


    if(!container) return;


    renderPlanner(getCurrentPlan());


}







function renderPlanner(plan){


    const container = document.getElementById("plannerContainer");


    if(!container) return;



    let html = `


<div class="planner-card">


<div class="planner-header">

<h2>${plan.name}</h2>

</div>





<table class="learning-table">


<thead>

<tr>

<th>Subject</th>

<th>Monday</th>

<th>Tuesday</th>

<th>Wednesday</th>

<th>Thursday</th>

<th>Friday</th>

</tr>

</thead>


<tbody>

`;





plan.subjects.forEach((subject,index)=>{


html += `


<tr>


<td class="subject-box">


<h3>${subject.title}</h3>


<label>🎯 Goal</label>

<textarea

placeholder="What are you learning?"

onchange="updateDescription(${index},this.value)"

>${subject.description || ""}</textarea>



<label>🔗 Resources</label>

<textarea

placeholder="Spotify, Google Docs, ChatGPT links..."

onchange="updateResources(${index},this.value)"

>${subject.resources || ""}</textarea>



<label>📝 Notes</label>

<textarea

placeholder="Notes..."

onchange="updateNotes(${index},this.value)"

>${subject.notes || ""}</textarea>



</td>



<td>

${makeCheckbox(index,"Monday",subject.days.Monday)}

</td>


<td>

${makeCheckbox(index,"Tuesday",subject.days.Tuesday)}

</td>


<td>

${makeCheckbox(index,"Wednesday",subject.days.Wednesday)}

</td>


<td>

${makeCheckbox(index,"Thursday",subject.days.Thursday)}

</td>


<td>

${makeCheckbox(index,"Friday",subject.days.Friday)}

</td>


</tr>


`;



});





html += `

</tbody>

</table>


</div>

`;



container.innerHTML = html;


}









function makeCheckbox(subject,day,value){


return `

<label class="big-check">


<input

type="checkbox"

${value ? "checked" : ""}

onchange="toggleDay(${subject}, '${day}', this.checked)"

>


<span class="check-box">

${value ? "✓" : ""}

</span>


</label>

`;

}









function toggleDay(subject,day,value){


let plan = getCurrentPlan();


plan.subjects[subject].days[day] = value;


savePlans(plans);


renderPlanner(plan);


}








function updateDescription(index,value){


let plan=getCurrentPlan();


plan.subjects[index].description=value;


savePlans(plans);


}





function updateResources(index,value){


let plan=getCurrentPlan();


plan.subjects[index].resources=value;


savePlans(plans);


}





function updateNotes(index,value){


let plan=getCurrentPlan();


plan.subjects[index].notes=value;


savePlans(plans);


}








function createPlan(){


let name = prompt("Enter plan name");


if(!name) return;



let newPlan = {

id:Date.now(),

name:name,

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


loadPlanner();


}
