let taskList = [];

const entryElement = document.querySelector("#entry");
const badElement = document.querySelector("#bad");
const totalHrInWeek = 24 * 7;

const handleOnSubmit = (e) => {
  const newTask = new FormData(e);

  const task = newTask.get("task");
  const hr = newTask.get("hr");

  const obj = {
    id: randomStr(),
    task,
    hr,
    type: "entry",
  };
  const ttl = total();

  if (ttl + +hr > totalHrInWeek) {
    return alert("you have exceeded your total available 168 hrs in a week");
  }
  taskList.push(obj);

  displayEntryTask();
  total();

  // To clear the values from form after adding new task
  document.querySelectorAll(".form-control")[0].value =
    document.querySelectorAll(".form-control")[1].value = "";
};

//To display Task Entry list
const displayEntryTask = () => {
  let str = ``;

  const entryArg = taskList.filter((task) => task.type === "entry");

  entryArg.map((item, i) => {
    str += `<tr>
    <th scope="row"> ${i + 1}</th>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td><button class="btn btn-sm btn-danger" onclick='handleOnDelete("${
      item.id
    }")'><i class="fa-solid fa-trash"></i></button>
    <button class="btn btn-sm btn-success"
   onclick="switchTask('${item.id}', 'bad')"
   >
     <i class="fa-solid fa-arrow-right"></i>
   </button>
 </td>


    
    </tr>`;
  });
  entryElement.innerHTML = str;
};

// to display Bad list
const displayBadTask = () => {
  let str = ``;

  const entryArg = taskList.filter((task) => task.type === "bad");

  entryArg.map((item, i) => {
    str += `
    <tr>
    <td scope="row">${i + 1}</td>
    <td>${item.task}</td>
    <td>${item.hr}</td>
    <td>
    <button class="btn btn-sm btn-warning" onclick='switchTask("${
      item.id
    }","entry")'><i class="fa-solid fa-arrow-left"></i></button>
    <button class="btn btn-sm btn-danger" onclick="handleOnDelete('${
      item.id
    }')"><i class="fa-solid fa-trash"></i></button>
    </td>

    </tr>
    `;
  });
  badElement.innerHTML = str;
};

// to delete the whole object from taskList
const handleOnDelete = (id) => {
  console.log(id);
  if (window.confirm("Do you want to delete a list")) {
    taskList = taskList.filter((item) => id !== item.id);
    displayBadTask();
    displayEntryTask();
    total();
  }
};

//to switch task from Entry list and Bad list
const switchTask = (id, type) => {
  console.log(id, type);

  taskList = taskList.map((item) => {
    if (item.id === id) {
      //item.id is from taskList and id is from switchTask
      item.type = type; // changing the type, whereas, type is comming from switchTask
    }
    return item;
  });
  displayEntryTask();
  displayBadTask();
  total();
};

// to generate random string for id of an object/task of tasklist
const randomStr = () => {
  const str = "qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm";
  const charLength = 10;

  let id = "";
  for (let i = 0; i < charLength; i++) {
    const ranNumber = Math.trunc(Math.random() * str.length);

    id += str[ranNumber];
  }

  return id;
};

// to calculate total hour of task
const total = () => {
  const ttll = taskList.reduce((acc, item) => acc + +item.hr, 0);
  document.getElementById("total").innerText = ttll;

  const badttll = taskList.reduce(
    (acc, item) => (item.type === "bad" ? acc + +item.hr : acc),
    0
  );
  document.getElementById("badTotal").innerText = badttll;

  return ttll;
};
