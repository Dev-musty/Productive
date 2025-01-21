import { renderNavBar } from "./navbar.js";
const taskName = document.querySelector('.text');
const taskDate = document.querySelector('.date');
const addTask = document.querySelector('.add-task');
const taskList = document.querySelector('.tasks');
const remainTask = document.querySelector('.task-amount');


renderNavBar();



addTask.addEventListener('click',handleTask);



 let task = JSON.parse(localStorage.getItem('folder' ))|| [
 ];

function taskOperation(){
let taskItemHTML = '';

task.forEach((taskItem, index)=>{
  
  taskItemHTML += taskItemHTML = `
  <div class = "todo">
    <span><input type="checkbox" id="check" data-index = '${index}'></span>
    <span class="item">${taskItem.name}</span>
    
    <button id="remove" >x</button>
  </div>
    <p class="item-date">${taskItem.date}</p>
    <hr>
  
  `;
 
    taskList.addEventListener('click',(e)=>{
      const {target} = e
      
      if(target.classList.contains('remove')){
        task.splice(index, 1);
        taskOperation();
        remain();
      };

    });
 
});


taskList.innerHTML = taskItemHTML;


const check = document.querySelectorAll('#check')
check.forEach((checkBtn)=>{
  checkBtn.addEventListener('click',(e)=>{
    const {target} = e;
    const {index} =  target.dataset;
    const item =document.querySelectorAll('.item')[index];
    item.classList.toggle('done-task');
    saveTask();
    remain();
});
});


saveTask();
remain();
}





function saveTask(){
  localStorage.setItem('folder', JSON.stringify(task));
 //clearStorage();
}


function handleTask() {
  const taskNameValue = taskName.value
  const dueDate = taskDate.value
  if (taskNameValue === '' && dueDate === '') {
    alert('Please enter a task name and due date')
  }else{
    task.push({
      name:taskNameValue,
      date:dueDate
    });
    

    taskName.value = '';
    taskOperation();
    saveTask();
    clearStorage();
  }
}
taskOperation();
//saveTask();

// remaing task
function remain(){
  const items = document.querySelectorAll('.item');
    if (items.length === 0) {
        remainTask.innerHTML = '';
        return;
    }
  if (document.querySelector('.item').classList.contains('done-task')){
    remainTask.innerHTML = `${task.length - 1} / ${task.length } Left`;
  }else if(!document.querySelector('.item').classList.contains('done-task')) {
    remainTask.innerHTML = `${task.length} / ${task.length } Left`;
  }
}

const clearLocalStorage = document.querySelector('.clear');
function clearStorage(){
  //clearLocalStorage.classList.add('clear-list');
  if (task.length > 0){
    clearLocalStorage.classList.add('clear-list');
  }else{
    clearLocalStorage.classList.remove('clear-list');
  }
  // taskOperation();
}
clearStorage();
clearLocalStorage.addEventListener('click', ()=> {
  localStorage.removeItem('folder');
  task = [];
  taskOperation();
  clearStorage();
  remain();
 }) ;


// day and date
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
const date = new Date();
const day = date.getDate();
const month = monthNames[date.getMonth()];
const year = date.getFullYear();
const hours = date.getHours();
const minutes = date.getMinutes();
// display date and time
const dayDate = document.querySelector('#day-date');
const dayTime = document.querySelector('#day-time')
dayDate.innerHTML = `${day}, ${month} ${year}`;
dayTime.innerHTML = `${hours}:${minutes}`;

//clear local storage
//const clearLocalStorage = document.querySelector('.clear');
