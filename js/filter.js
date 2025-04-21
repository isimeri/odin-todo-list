const filterArr = ["all", "today"];
let activeFilter = "";

function setActiveFilter(fil){
  activeFilter = fil;
}

function getActiveFilter(){
  return activeFilter;
}

export {setActiveFilter, getActiveFilter};