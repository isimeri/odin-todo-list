

function saveToStorage(projects, todos, lastId){
  localStorage.setItem("projects", JSON.stringify(projects));
  localStorage.setItem("todos", JSON.stringify(todos));
  localStorage.setItem("lastId", lastId);
}

function loadFromStorage(){
  const projects = JSON.parse(localStorage.getItem("projects"));
  const todos = JSON.parse(localStorage.getItem("todos"));
  const lastId = localStorage.getItem("lastId")

  return {projects, todos, lastId}
}

export {saveToStorage, loadFromStorage}