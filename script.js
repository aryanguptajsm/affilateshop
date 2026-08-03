 const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("keydown", function(event) {
  
  if (event.key === "Enter") {
    event.preventDefault(); 
    urlfetch();   
  }
});

const featureCard = document.querySelector("#featureCard");
const posterContainer = document.querySelector(".poster");
const cardTitle = document.querySelector(".title-block h2");
const cardGenre = document.querySelector(".title-block .genre");
const detailsTitle = document.querySelector(".details h3");
const descText = document.querySelector(".desc");

const topRowRating = document.querySelector(".top-row .rating");
const topRowYear = document.querySelector(".year-tag");
const metaRow = document.querySelector(".meta-row");

function urlfetch(){
     const url = `https://www.omdbapi.com/?apikey=af3e0d4&t=${searchInput.value}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
       console.log(data);
       console.log(data.Title, data.Runtime);
       cardTitle.textContent = data.Title;
        topRowYear.textContent = data.Year;
        topRowRating.textContent = data.imdbRating;
       detailsTitle.textContent = data.Title;
       // runtime.textContent = data.Runtime;
       // director.textContent = data.Director;
       descText.textContent = data.Plot;
        posterContainer.src = data.Poster;

    });         
}


