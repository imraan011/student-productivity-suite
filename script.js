function openpages() {
  var cards = document.querySelectorAll(".events");
  var fulleventpage = document.querySelectorAll(".fullevent");
  cards.forEach(function (e) {
    e.addEventListener("click", function () {
      fulleventpage[e.id].style.display = "block";
    });
  });

  var closebtn = document.querySelectorAll(".back");
  closebtn.forEach(function (e) {
    e.addEventListener("click", function () {
      fulleventpage[e.id].style.display = "none";
    });
  });
}
openpages();

function todolist() {
  var curtask = [];
  if (localStorage.getItem("curtask")) {
    curtask = JSON.parse(localStorage.getItem("curtask"));
  } else {
    console.log("empty hai bro");
  }
  function rendertask() {
    localStorage.setItem("curtask", JSON.stringify(curtask));

    var tasklist = document.querySelector(".taskslist");

    var sum = "";

    curtask.forEach((e, id) => {
      sum += `<div class="flex task justify-between">
                  <h2>
                    ${e.taskname}
                    <span class="${e.important}">imp</span>
                  </h2>
                  <button id=${id} ><i class="ri-check-double-line"></i></button>
                </div>`;
    });

    tasklist.innerHTML = sum;

    document.querySelectorAll(".task button").forEach(function (e) {
      e.addEventListener("click", function () {
        curtask.splice(e.id, 1);
        rendertask();
      });
    });
  }
  rendertask();

  let form = document.querySelector(".taskadd form");
  var taskinput = document.querySelector(".taskinp");
  var impcheck = document.querySelector("#check");
  var tasktextareainput = document.querySelector("#textareainp");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    curtask.push({
      taskname: taskinput.value,
      taskdets: tasktextareainput.value,
      important: impcheck.checked,
    });

    taskinput.value = "";
    tasktextareainput.value = "";
    impcheck.checked = false;

    rendertask();
  });
}
todolist();

function DailyPlanner() {
  var hours = Array.from(
    { length: 18 },
    (_, idx) => `${idx + 6}:00 - ${idx + 7}:00`
  );

  var dayplandata = JSON.parse(localStorage.getItem("dayplandata")) || {};

  var wholehours = "";
  hours.forEach(function (e, id) {
    let saveddata = dayplandata[id] || "";

    wholehours += `<div class="plans" >
    <h5>${e}</h5>
    <input id=${id} type="text" placeholder=""   value = ${
      dayplandata[id] || ""
    } >  
    </div>`;
  });
  dayplanner = document.querySelector(".daily-plannerarea").innerHTML =
    wholehours;

  var dayplannerinput = document.querySelectorAll(".plans input");
  dayplannerinput.forEach(function (e) {
    e.addEventListener("input", function () {
      dayplandata[e.id] = e.value;
      localStorage.setItem("dayplandata", JSON.stringify(dayplandata));
    });
  });
}

DailyPlanner();
