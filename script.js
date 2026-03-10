let searches = JSON.parse(localStorage.getItem("travelSearches")) || [];
const input = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const clearBtn = document.getElementById("clearBtn");
const list = document.getElementById("recentList");
function displaySearches(){
list.innerHTML="";
if(searches.length===0){
list.innerHTML="<p>No searches yet</p>";
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
function addSearch(){
let place=input.value.trim().toLowerCase();

if(place==="") return;
searches=searches.filter(item=>item!==place);
searches.unshift(place);

if(searches.length>10){
searches.pop();
}

localStorage.setItem("travelSearches",JSON.stringify(searches));
highlight(place);
input.value="";
displaySearches();

}

function highlight(place){

let card=document.querySelector(`[name="${place}"]`);

if(card){

card.scrollIntoView({behavior:"smooth"});

card.style.border="4px solid orange";

setTimeout(()=>{
card.style.border="none";
},2000);

}

}

function clearHistory(){

searches=[];

localStorage.removeItem("travelSearches");

displaySearches();

}

searchBtn.onclick=addSearch;

input.addEventListener("keypress",e=>{
if(e.key==="Enter"){
addSearch();
}
});

clearBtn.onclick=clearHistory;

displaySearches();