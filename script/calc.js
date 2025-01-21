import { renderNavBar } from "./navbar.js";

calc();
renderNavBar();

function calc(){
for (let i = 0; i < document.querySelectorAll('button').length; i+=1) {
  document.querySelectorAll('button')[i].addEventListener('click', btnClick)
  
}

document.querySelector('.remove').addEventListener('click', remove)
function btnClick() {
  const value = this.innerHTML

  if (value === '=') {
    solve();
  }else if (value === 'C') {
    clear();
  }else{
    handleCalc(value);
  }
  
  
}
document.addEventListener('keydown', (event)=>{
  //const dis = document.querySelector('#display')
  const {key} = event
  if (key >= '0' && key <= '9' || key === '+' || key === '-' || key === '*' || key === '/' || key === '.' || key === '(' || key === ')' ){
    handleCalc(key);
  }else if (key === 'Enter') {
    solve();
  }else if (key === 'Backspace') {
    remove();
  }
  
  console.log(event);
})
function handleCalc(value) {
 
  const disp = document.querySelector('#display1') ;
  disp.value += value;
  disp.classList.add('view')
  localStorage.setItem('calculate', disp.value)
  
}

//localStorage.getItem('calculation') || '';
function solve() {
    const equation = localStorage.getItem('calculate') || ''; 
    const result = new Function (`return ${equation}`)();
    document.querySelector('#display2').value = result;
    document.querySelector('#display2').classList.add('view2')
    localStorage.setItem('calculate', result);
}
function clear() {
   const disp = document.querySelector('#display1');
    disp.value = '';
   const disp2 = document.querySelector('#display2')
    disp2.value = ''
    localStorage.setItem('calculate', '')
  
}



function remove(){
  let displayValue = localStorage.getItem('calculate') || ''; 
  displayValue = displayValue.split('');
  displayValue.pop();
  displayValue = displayValue.join('');
  localStorage.setItem('calculate', displayValue)
  document.querySelector('#display1').value = displayValue;
}
}


