import {saveTodo, addTodo, findTodoByID, getList, findTodosByProject, findTodosByDate, setTodoStatus, getTodoStatus, deleteTodo, setLastId, getLastId} from "./js/todo.js";
import { displayTodos, fillFormFields, clearFormFields, displayProjects, clearProjectForm, highlightProject} from "./js/DOMStuff.js";
import {addProject,getProjects,clearProjects,getActiveProject,setActiveProject} from "./js/project.js";
import { setActiveFilter, getActiveFilter } from "./js/filter.js";
import {saveToStorage, loadFromStorage} from "./js/storage.js";
 
const todoForm = document.getElementById("todo-form");
const todoContainer = document.querySelector("#todo-list-container");
const addTodoBtn = document.querySelector(".new-todo-btn");
const todoFormWrapper = document.querySelector(".form-wrapper");
const projectsList = document.querySelector(".projects-list");
const newProjectBtn = document.querySelector(".new-project-btn");
const projectForm = document.getElementById("project-form");
const projectFormCancelBtn = document.querySelector(".cancel-project-form-btn");
const sidebar = document.querySelector(".sidebar");
const allTasksBtn = document.querySelector(".quick-btn#all");
const todayTasksBtn = document.querySelector(".quick-btn#today");
 
//============================================functii=============================================

function init(){
  const {projects, todos, lastId} = loadFromStorage();

  if(projects?.length > 0){
    clearProjects();
    projects.forEach(proj => {
      addProject(proj);
    });
  }

  if(todos?.length > 0){
    todos.forEach(todo => {
      addTodo(todo)
    });
  }

  setLastId(lastId);

  displayProjects(getProjects());
  highlightProject(getActiveProject());
  displayFilteredTodos();
}

//afiseaza todo relevante in functie de criteriul de filtrare
function displayFilteredTodos(){
  let filteredTodos;

  if(getActiveFilter() === ""){
    filteredTodos = findTodosByProject(getActiveProject());
  } else if(getActiveFilter() === "all"){
    filteredTodos = getList();
  } else if (getActiveFilter() === "today"){
    const today = (new Date()).toISOString().split("T")[0];
    filteredTodos = findTodosByDate(today);
  }

  displayTodos(filteredTodos);
}

//========================================event-listenere===========================================

//cand dau submit la formularul de todo, se updateaza in spate si in DOM
todoForm.addEventListener("submit", e => {
  e.preventDefault();

  const todoId = parseInt(todoForm.dataset.id);
  const formdata = new FormData(todoForm);
  saveTodo(formdata,todoId);

  saveToStorage(getProjects(), getList(), getLastId());
  clearFormFields();
  todoFormWrapper.classList.add("hidden");
  displayFilteredTodos()
});

//event listener cu mai multe scopuri
todoContainer.addEventListener("click", e => {

  //cand bifez sau debifez "done" pe un todo, se actualizeaza in DOM si in spate
  if(e.target.classList.contains("todo-done")){
    const newStatus = e.target.checked;
    const id = e.target.closest(".todo-item").dataset.id;

    setTodoStatus(id, newStatus);
    saveToStorage(getProjects(), getList(), getLastId());
    const todoElem = e.target.closest(".todo-item");

    if(getTodoStatus(id) === true){
      todoElem.classList.add("status-done");
    } else {
      todoElem.classList.remove("status-done");
    }
  }//cand apas "delete", se sterge din spate si se actualizeaza DOM
  else if(e.target.closest(".delete-todo-btn")){

    const id = e.target.closest(".todo-item").dataset.id;
    deleteTodo(id);
    saveToStorage(getProjects(), getList(), getLastId());
    displayFilteredTodos();
  }//cand apas "edit", se deschide formularul de todo si se populeaza cu informatiile din todo
  else if(e.target.closest(".edit-todo-btn")){

    const todoId = parseInt(e.target.closest(".todo-item").dataset.id);
    const todoObj = findTodoByID(todoId);
    todoFormWrapper.classList.remove("hidden");
    fillFormFields(todoObj);
  }
});

 
//afiseaza formularul de todo cand fac click pe addTodoBtn
addTodoBtn.addEventListener("click", e => {
  if(todoFormWrapper.classList.contains("hidden")){
    todoFormWrapper.classList.remove("hidden");
  }
});
 
//ascunde forumlarul de todo cand fac click in afara lui
todoFormWrapper.addEventListener("click", e => {
  if(e.target.closest("#todo-form")){
    return;
  } else {
    todoFormWrapper.classList.add("hidden");
  }
});

//evidentiaza vizual itemul din sidebar pe care am dat click 
sidebar.addEventListener("click", e => {
  if(!e.target.classList.contains("sidebar-btn")) return;
  const sidebarBtnArr = document.querySelectorAll(".sidebar-btn");
  sidebarBtnArr.forEach(item => {
    item.classList.remove("active-btn");
  });
  e.target.classList.add("active-btn");
});

//cand apas pe "all" in sidebar, se afiseaza toate todo
allTasksBtn.addEventListener("click", e => {
  setActiveProject("default");
  setActiveFilter("all");
  displayTodos(getList());
});

//cand apas pe "today" in sidebar, se afiseaza doar todo cu data de azi
todayTasksBtn.addEventListener("click", e => {
  setActiveProject("default");
  setActiveFilter("today");
  const today = (new Date()).toISOString().split("T")[0];
  displayTodos(findTodosByDate(today));
});

//cand selectez un project din sidebar, se afiseaza doar todo conectate la acel project
projectsList.addEventListener("click", e => {
  if(!e.target.classList.contains("project-btn")) return;
  const projectName = e.target.id;
  setActiveProject(projectName);
  setActiveFilter("");
  const filteredTodos = findTodosByProject(projectName);
  displayTodos(filteredTodos);
});

//cand apas newProjectBtn, apare formularul relevant
newProjectBtn.addEventListener("click", e => {
  if(projectForm.classList.contains("hidden")){
    projectForm.classList.remove("hidden");
  }
});

//se creeaza si si afiseaza noul project cand dau submit la formular
projectForm.addEventListener("submit", e => {
  e.preventDefault();
  const newProjectName = projectForm.querySelector("#project-name-input").value;
  addProject(newProjectName);
  saveToStorage(getProjects(), getList(), getLastId());
  displayProjects(getProjects());
  clearProjectForm();
  projectForm.classList.add("hidden");
  highlightProject(getActiveProject());
});

//se ascunde formularul de project cand apas "cancel"
projectFormCancelBtn.addEventListener("click", e => {
  if(!projectForm.classList.contains("hidden")){
    projectForm.classList.add("hidden");
  }
});


init();