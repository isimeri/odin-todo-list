const todoForm = document.getElementById("todo-form") ;
const titleInput = document.getElementById("todo-title-input");
const descInput = document.getElementById("todo-desc-input");
const dateInput = document.getElementById("todo-date-input");
const projInput = document.getElementById("todo-proj-input");
const projectList = document.querySelector(".projects-list");
const projectForm = document.getElementById("project-form");
const projectNameInput = document.getElementById("project-name-input")

function displayTodos(list){
  const ul = document.querySelector("#todo-list-container > ul");
  const html = list.map(todo => {
    let str = `<li data-id="${todo.id}" class="todo-item ${todo.todoDone ? `status-done` : ``} ${todo.todoPrio === "low" ? `prio-low` : todo.todoPrio === "medium" ? `prio-medium` : `prio-high`}">`;
    str += `
    <div class="todo-header">
      <p class="todo-title">${todo.todoTitle}</p>
      <span>
        <button class="edit-todo-btn"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete-todo-btn"><i class="fa-solid fa-trash"></i></button>
      <span>
    </div>
    <p class="todo-desc">${todo.todoDesc}</p>
    <p class="todo-proj">Project ${todo.todoProj}</p>
    <div class="todo-footer">
      <div><p class="todo-date">Due date: ${todo.todoDate}</p>
      <p class="todo-prio">Priority: ${todo.todoPrio}</p></div>
      <label class="todo-done-label">Done? <input type="checkbox" name="todoDone" class="todo-done" ${todo.todoDone ? `checked` : ``}></label>
    </div></li>`;
    return str;
  }); 

  ul.innerHTML = html.join("");
}
    
function fillFormFields(todoObj)
{ 
  const prioInput = document.getElementById(`prio-${todoObj.todoPrio}-input`);
  todoForm.dataset.id = todoObj.id;
  titleInput.value = todoObj.todoTitle;
  descInput.value = todoObj.todoDesc;
  dateInput.value = todoObj.todoDate;
  prioInput.checked = true;
}
function clearFormFields()
{ 
  const radioInputs = todoForm.querySelectorAll("input[type=radio]");
  todoForm.dataset.id = "";
  titleInput.value = "";
  descInput.value = "";
  dateInput.value = "";
  radioInputs.forEach(radio => { radio.checked = false; });
}

function clearProjectForm(){
  projectNameInput.value = ""
}

function displayProjects(list){
  const html = list.map(proj => {
    const capitalize = proj[0].toUpperCase() + proj.slice(1);
    let str = `<button class="project-btn sidebar-btn" id="${proj}">${capitalize}</button>`;
    return str;
  });
  projectList.innerHTML = html.join("");
}

function highlightProject(proj){
  const projElem = document.querySelector(`.sidebar-btn#${proj}`);
  projElem.classList.add("active-btn");
}

  
  
  
export {displayTodos, fillFormFields, clearFormFields, displayProjects, clearProjectForm, highlightProject};