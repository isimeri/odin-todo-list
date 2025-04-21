const list = ["default"];
let activeProject = list[0];


function addProject(proj){
  list.push(proj);
}
function getProjects(){
  return list;
}
function clearProjects(){
  list.splice(0, list.length);
}
function setActiveProject(str){
  activeProject = str;
}
function getActiveProject(){
  return activeProject;
}

export {addProject,getProjects,clearProjects,getActiveProject,setActiveProject};