 const searchInput = document.querySelector("#searchInput");

searchInput.addEventListener("keydown", function(event) {
  
  if (event.key === "Enter") {
    event.preventDefault(); 
    urlfetch(); 
     actions.append(watchBtn, saveBtn);
  details.append(badge, detailsTitle, metaRow, desc, actions);

  // Assemble full card
  feature.append(poster, details);
  stage.appendChild(feature)
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

const trailer = document.querySelector("#watchBtn");
const savebtn = document.querySelector("#saveBtn");
 function createFeatureCard() {
  // 1. Root stage container
  const stage = document.createElement("div");
  stage.className = "stage";

  // 2. Feature Card
  const feature = document.createElement("div");
  feature.className = "feature";
  feature.id = "featureCard";

  // --- POSTER SECTION ---
  const poster = document.createElement("div");
  poster.className = "poster";

  const topRow = document.createElement("div");
  topRow.className = "top-row";
 
  const rating = document.createElement("span");
  rating.className = "rating";
  rating.innerHTML = "<span>★</span> 8.6";

  const yearTag = document.createElement("span");
  yearTag.className = "year-tag";
  yearTag.textContent = "2023";

  topRow.append(rating, yearTag);

  const initials = document.createElement("span");
  initials.className = "initials";
  const img = document.createElement("img");
  img.src = "https://m.media-amazon.com/images/M/MV5BMTczNTI2ODUwOF5BMl5BanBnXkFtZTcwMTU0NTIzMw@@._V1_QL75_UX380_CR0,0,380,562_.jpg" ??  data[0].show.image.original;
  img.alt = "SD";
  initials.appendChild(img);

  const titleBlock = document.createElement("div");
  titleBlock.className = "title-block";

  const posterTitle = document.createElement("h2");
 

  const genre = document.createElement("div");
  genre.className = "genre";
  genre.textContent = "Sci-Fi";

  titleBlock.append(posterTitle, genre);
  poster.append(topRow, initials, titleBlock);

  // --- DETAILS SECTION ---
  const details = document.createElement("div");
  details.className = "details";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = "Featured Film";

  const detailsTitle = document.createElement("h3");
  detailsTitle.textContent = "Static District";

  const metaRow = document.createElement("div");
  metaRow.className = "meta-row";

  const rateSpan = document.createElement("span");
  rateSpan.className = "rate";
  rateSpan.textContent = "★ 8.6";

  const yearSpan = document.createElement("span");
  yearSpan.textContent = "2023";

  const genreSpan = document.createElement("span");
  genreSpan.textContent = "Sci-Fi ";

  const durationSpan = document.createElement("span");
  durationSpan.textContent = "2h 11m";

  metaRow.append(rateSpan, yearSpan, genreSpan, durationSpan);

  const desc = document.createElement("p");
  desc.className = "desc";
  
  //desc.textContent =
    //"In a city where memory can be traded like currency, a black-market technician uncovers a signal that isn't supposed to exist — one that remembers things no one alive should know.";

  const actions = document.createElement("div");
  actions.className = "actions";

  const watchBtn = document.createElement("button");
  watchBtn.className = "btn btn-primary";
  watchBtn.id = "watchBtn";
  watchBtn.textContent = "Watch trailer";

  const saveBtn = document.createElement("button");
  saveBtn.className = "btn btn-ghost";
  saveBtn.id = "saveBtn";
  saveBtn.textContent = "Save for later";

 ;
 
  return stage;
  
}
   const searchbar = document.querySelector(".controls");

function urlfetch(){
   //  const url = `https://www.omdbapi.com/?apikey=af3e0d4&t=${searchInput.value.trim()}`;
    const url = `https://api.tvmaze.com/search/shows?q=${searchInput.value.trim()}`;

fetch(url)
    .then(response => response.json())
    .then(data => {
       console.log(data);
       console.log(data[0].show.name);
        posterTitle.textContent = data[0].show.name;
       desc.innerHTML = data[0].show.summary;
       cardTitle.textContent = data[0].show.name;
        topRowYear.textContent = data[0].show.premiered;
        topRowRating.textContent = data[0].show.rating.average ?? "N/A";
       details.textContent = data[0].show.name; 
      cardGenre.textContent = data[0].show.genres[0];

        metaRow.innerHTML = `
        <span class="rate">★ ${data[0].show.rating.average ?? "N/A"}</span>
        <span>${data[0].show.premiered}</span>
        <span>${data[0].show.genres}</span>`;
      
        img.src = data[0].show.image.original;
      
       trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(data[0].show.name + " official trailer")}`;

        trailer.onclick = ()=>{
   window.open(trailerUrl, "_blank");

    };
    const dataofthis = data[0].show;
    function saved(){
    if(!dataofthis === ""){
      localStorage.setItem( "saved" ,Json.stringify(dataofthis));
    }
   }
    
     savebtn.onclick = ()=>{
    saved();
    savebtn.textContent = "Saved";
     };
  
    
    })  
     .catch(error => {
          
            // console.error("Error fetching data:", error);
            // details.textContent = "error"; 
          //  cardTitle.textContent = "Error";
           // descText.textContent =  "Something went wrong. Please try again.";
            
        //    topRowRating.textContent = "N/A";
          //  img.src = ""; 
           // trailerUrl = "";
     }); 
    
}
  searchbar.after(createFeatureCard());


// Example usage:
//document.body.appendChild(createFeatureCard());


