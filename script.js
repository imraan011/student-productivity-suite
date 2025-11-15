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
  DailyPlanner = document.querySelector(".daily-plannerarea").innerHTML =
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

function motivation() {
  let motivationquote = document.querySelector(".moti-1 h2");
  let motivationauthor = document.querySelector(".moti-1 h3");

  async function quote() {
    let response = await fetch(
      "https://api.quotable.io/random?tags=money|inspirational|success|study"
    );

    let data = await response.json();
    motivationquote.innerHTML = data.content;
    motivationauthor.innerHTML = "-- " + data.author;
  }
  quote();
}

motivation();

function pomodoroTimer(){
  let time = document.querySelector(".time h1");
let start = document.querySelector(".start");
let pause = document.querySelector(".pause");
let reset = document.querySelector(".reset");
let isworksession = true;
let message = document.querySelector(".timer .message")
let timetext = document.querySelector(".time h1")
let interval = null;


let totalsecond = 25 * 60;
function updateTimer() {
  let minute = Math.floor(totalsecond / 60);
  let second = Math.floor(totalsecond % 60);
  time.innerHTML = `${String(minute).padStart("2", "0")}:${String(
    second
  ).padStart("2", "0")}`;
}

function startTimer() {
  clearInterval(interval);

  if (isworksession) {
    interval = setInterval(() => {
      if (totalsecond > 0) {
        totalsecond--;
        updateTimer();
      } else {
        isworksession = false;
        clearInterval(interval);
        totalsecond = 5 * 60;
        message.innerHTML="Take break 😊"
        time.innerHTML = "05:00"
      }
    }, 10);


  } else {
    interval = setInterval(() => {
      if (totalsecond > 0) {
        totalsecond--;
        updateTimer();
      } else {
        isworksession = true;
        clearInterval(interval);
        totalsecond = 25 * 60;message.innerHTML=" focus back &#128200;"
        time.innerHTML = "25:00"
      }
    }, 10);
  }
}

function pauseTimer() {
  clearInterval(interval);
}
function resetTimer() {
  clearInterval(interval);
  totalsecond = 25 * 60;
  updateTimer();
}
start.addEventListener("click", startTimer);

pause.addEventListener("click", pauseTimer);
reset.addEventListener("click", resetTimer);

}

pomodoroTimer()

let weatherApi = "beb05046555d40cb9aa141714251511"
let city = "new delhi"
async function weather(){
  response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${weatherApi}&q=${city}`)
  let data = await response.json()
  console.log(data);
}
weather()

