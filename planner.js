// Study Hub 3.0
// Planner with Week Selector


let plans = [];

let currentPlanId = null;



document.addEventListener("DOMContentLoaded", () => {

    loadPlanner();

});





function loadPlanner(){


    plans = loadPlans();


    const selector = document.getElementById("planSelector");


    if(selector){


        selector.innerHTML = "";


        plans.forEach(plan=>{


            let option = document.createElement("option");


            option.value = plan.id;


            option.textContent = plan.name;


            selector.appendChild(option);


        });


        currentPlanId = plans[0].id;


        selector.value = currentPlanId;


    }



    renderPlanner(getCurrentPlan());

}







function getCurrentPlan(){


    return plans.find(
        plan => plan.id == currentPlanId
    ) || plans[0];


}







function changePlan(id){


    currentPlanId = Number(id);


    renderPlanner(getCurrentPlan());


}







function renderPlanner(plan){


    const container =
    document.getElementById("plannerContainer");



    if(!container || !plan) return;



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



<textarea

placeholder="Goal"

onchange="updateDescription(${index},this.value)"

>${subject.description || ""}</textarea>




<div class="resources">


<h4>🔗 Resources</h4>


${renderResources(subject)}


</div>





<textarea

placeholder="Notes"

onchange="updateNotes(${index},this.value)"

>${subject.notes || ""}</textarea>



</td>





<td>${makeCheckbox(index,"Monday",subject.days.Monday)}</td>

<td>${makeCheckbox(index,"Tuesday",subject.days.Tuesday)}</td>

<td>${makeCheckbox(index,"Wednesday",subject.days.Wednesday)}</td>

<td>${makeCheckbox(index,"Thursday",subject.days.Thursday)}</td>

<td>${makeCheckbox(index,"Friday",subject.days.Friday)}</td>



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








function renderResources(subject){


if(!subject.resources) return "";


return subject.resources.map(resource=>{


return `


<a href="${resource.url}" target="_blank">

${resource.name}

</a>


`;



}).join("<br>");



}







function makeCheckbox(subject,day,value){


return `

<label class="big-check">


<input

type="checkbox"

${value ? "checked":""}

onchange="toggleDay(${subject},'${day}',this.checked)"

>


<span class="check-box">

${value ? "✓":""}

</span>


</label>

`;

}








function toggleDay(subject,day,value){


let plan=getCurrentPlan();


plan.subjects[subject].days[day]=value;


savePlans(plans);


renderPlanner(plan);


}








function updateDescription(index,value){


let plan=getCurrentPlan();


plan.subjects[index].description=value;


savePlans(plans);


}








function updateNotes(index,value){


let plan=getCurrentPlan();


plan.subjects[index].notes=value;


savePlans(plans);


}








function createPlan(){


let name = prompt("Week name?");


if(!name) return;



let plan = {


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



plans.push(plan);


savePlans(plans);


loadPlanner();


}
