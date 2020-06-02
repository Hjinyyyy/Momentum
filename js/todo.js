// Making a To Do List part
const toDoForm = document.querySelector(".js-toDoForm"),
      toDoInput = toDoForm.querySelector("input"),
      toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = 'toDos';

// const toDos = [];
let toDos = [];

// function filterFn(toDo){
//   return toDo.id === 1
// }

function deleteToDo(event){
  // console.log(event.target.parentNode);
  const btn = event.target,
        li = btn.parentNode;
        // cleanToDos = toDos.filter(filterFn);
  toDoList.removeChild(li);
  const cleanToDos = toDos.filter(function(toDo){
    console.log(toDo.id, li.id);
    return toDo.id !== parseInt(li.id);
  });  
  console.log(cleanToDos);
  toDos = cleanToDos;
  saveToDos();
}

function saveToDos(){
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text){
  // console.log(text);
  const li = document.createElement("li"),
        delBtn = document.createElement("button"), 
        span = document.createElement("span"),
        newId = toDos.length + 1;
  delBtn.innerText = "❌";
  delBtn.addEventListener("click", deleteToDo);
  span.innerText = text;
  li.appendChild(delBtn);
  li.appendChild(span);  
  li.id = newId;
  toDoList.appendChild(li);
  const toDoObj = {
    text: text,
    id: newId
  };
  toDos.push(toDoObj);
  saveToDos();
}

function toDoHandleSubmit(event){
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  toDoInput.value = "";
}

// function toDoSomething(toDo){
//   console.log(toDo.text);
// }

function loadToDos(){
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if(loadedToDos !== null){    
    // console.log(loadedToDos);
    const parsedToDos = JSON.parse(loadedToDos);
    // console.log(parsedToDos);
    // parsedToDos.forEach(toDoSomething);
    parsedToDos.forEach(function(toDo){
      // console.log(toDo.text);
      paintToDo(toDo.text);
    });
  }
}

function toDoInit(){
  loadToDos();
  toDoForm.addEventListener("submit", toDoHandleSubmit);
}
toDoInit();