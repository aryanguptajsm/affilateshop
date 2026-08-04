 const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("keydown", function(event) {
  
  if (event.key === "Enter") {
    event.preventDefault(); 
    urlfetch();   
  }
});

const featureCard = document.querySelector("#featureCard");
const featureimg = document.querySelector(".initials img");
const posterContainer = document.querySelector(".poster");
const cardTitle = document.querySelector(".title-block h2");
const cardGenre = document.querySelector(".title-block .genre");
const detailsTitle = document.querySelector(".details h3");
const descText = document.querySelector(".desc");


const topRowRating = document.querySelector(".top-row .rating");
const topRowYear = document.querySelector(".year-tag");
const metaRow = document.querySelector(".meta-row");

const trailer = document.querySelector("#watchBtn")

function urlfetch(){
   //  const url = `https://www.omdbapi.com/?apikey=af3e0d4&t=${searchInput.value.trim()}`;
    const url = `https://api.tvmaze.com/search/shows?q=${searchInput.value.trim()}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
       console.log(data);
       console.log(data[0].show.name);

       cardTitle.textContent = data[0].show.name;
        topRowYear.textContent = data[0].show.premiered;
        topRowRating.textContent = data[0].show.rating.average;
       detailsTitle.textContent = data[0].show.name; 
      cardGenre.textContent = data[0].show.genres[0];

        metaRow.innerHTML = `
        <span class="rate">★ ${data[0].show.rating.average}</span>
        <span>${data[0].show.premiered}</span>
        <span>${data[0].show.genres}</span>`;
       descText.innerHTML = data[0].show.summary;
        featureimg.src = data[0].show.image.original;

    });         
}


