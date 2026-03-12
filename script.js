//It is used to load saved searches from local storage.If no saved searche sthen it will start from empty array
let searches = JSON.parse(localStorage.getItem("travelSearches")) || [];

const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("recentList");
//Function to display recent searches on screen
function displaySearches(){
list.innerHTML="";
if(searches.length===0){
list.innerHTML="<p>No searches yet</p>";//if no searches then display this message
return;
}
searches.forEach(place=>{

let div=document.createElement("div");

div.className="search-item";

div.textContent=place;

div.onclick=()=>{input.value=place;}

list.appendChild(div);

});
}
//This function is when user search something
function addSearch(){
let place=input.value.trim().toLowerCase();//remove extraspace and converts to lowercase

if(place==="") return;
searches=searches.filter(item=>item!==place);//remove same search if it is already there
searches.unshift(place);//add new search at beginning
//Keep 10 searches only
if(searches.length>10){
searches.pop();
}

localStorage.setItem("travelSearches",JSON.stringify(searches));//used to save updated searches in local storage
highlight(place);
input.value="";//clear input field
displaySearches();

}
//function to highlight card when search is done
function highlight(place){

let card=document.querySelector(`[name="${place}"]`);

if(card){

card.scrollIntoView({behavior:"smooth"});//scroll to that card

card.style.border="4px solid orange";

setTimeout(()=>{
card.style.border="none";
},2000);

}

}
//It is used to clear the whole history
function clearHistory(){

searches=[];

localStorage.removeItem("travelSearches");//remove save ddata from Local storage

displaySearches();

}

searchBtn.onclick=addSearch;
//allow search by pressing enter key
input.addEventListener("keypress",e=>{
if(e.key==="Enter"){
addSearch();
}
});
//clear history button
clearBtn.onclick=clearHistory;
//show stored searches when page reloads
displaySearches();
