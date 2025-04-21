import { getActiveProject } from "./project.js";
const list = [];

let lastId = 2;
 
function findTodoByID(id){
  const intId = parseInt(id)
  return list.find(todo => todo.id === intId);
}

function findTodosByProject(proj){
  return list.filter(todo => todo.todoProj === proj);
}

function findTodosByDate(date){
  const filteredList = list.filter(todo => todo.todoDate === date);
  return filteredList;
}
 
function formdataToObj(formdata){
  let obj = {};
  formdata.forEach((val, key) => {
    obj[key] = val;
  });
  obj.todoDate = (new Date(obj.todoDate)).toISOString().split("T")[0];
  obj.todoProj = getActiveProject();
  obj.todoDone = false;
 
  return obj;
}

function addTodo(todo){
  list.push(todo);
}
 
function saveTodo(formdata, id=null){
  const todoObj = formdataToObj(formdata);
  if(id){
    todoObj.id = parseInt(id);
    list.splice(parseInt(id)-1,1,todoObj);
  } else {
    todoObj.id = ++lastId;
    list.push(todoObj);
  }
}

function deleteTodo(id){
  const intId = parseInt(id);
  const index = list.findIndex(todo => todo.id === intId);

  if(index !== -1){
    list.splice(index,1);
  }
}

function setTodoStatus(id, newStatus){
  const todo = findTodoByID(id);
  todo.todoDone = newStatus;
}

function getTodoStatus(id){
  const todo = findTodoByID(id);
  return todo.todoDone;
}
 
function getList(){
  return list;
}
function setLastId(x){
  lastId = x;
}
function getLastId(){
  return lastId;
}
 
export {saveTodo, addTodo, findTodoByID, getList, findTodosByProject, findTodosByDate, setTodoStatus, getTodoStatus, deleteTodo, setLastId, getLastId}