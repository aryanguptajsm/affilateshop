// 1. Get the search input and the search bar container
const searchInput = document.querySelector("#searchInput");
const searchbar = document.querySelector(".controls"); // Ensure this matches your HTML search bar class!

// 2. Create the empty feature card and put it directly AFTER the search bar
searchbar.after(createFeatureCard());

// 3. NOW that the card is in the DOM, we can safely select its inner elements to update later
const cardTitle = document.querySelector(".title-block h2");
const cardGenre = document.querySelector(".title-block .genre");
const detailsTitle = document.querySelector(".details h3"); // Fixed: Target the h3 specifically
const descText = document.querySelector(".desc");
const topRowRating = document.querySelector(".top-row .rating");
const topRowYear = document.querySelector(".year-tag");
const metaRow = document.querySelector(".meta-row");
const featureImg = document.querySelector(".initials img");
const watchBtn = document.querySelector("#watchBtn");
const saveBtn = document.querySelector("#saveBtn");

// 4. Search Event Listener
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    urlfetch(); 
  }
});

function urlfetch() {
  const url = `https://api.tvmaze.com/search/shows?q=${searchInput.value.trim()}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) return; 

      const show = data[0].show; 

      
      cardTitle.textContent = show.name;
      detailsTitle.textContent = show.name; 
      descText.innerHTML = show.summary || "No description available.";
      
     
      const genre = show.genres[0] || "Unknown";
      cardGenre.textContent = genre;

   
      const year = show.premiered ? show.premiered.substring(0, 4) : "N/A";
      topRowYear.textContent = year;

      // Update Rating
      const avgRating = show.rating.average || "N/A";
      topRowRating.innerHTML = `<span>★</span> ${avgRating}`;

      // Update Meta Row
      const runtime = show.runtime ? `${show.runtime}m` : "N/A";
      metaRow.innerHTML = `
        <span class="rate">★ ${avgRating}</span>
        <span>${year}</span>
        <span>${genre}</span>
        <span>${runtime}</span>
      `;
      
      // Update Image safely using optional chaining (?.)
      // If no image exists, it uses a placeholder image instead of crashing
      featureImg.src = show.image?.original || "https://via.placeholder.com/380x562?text=No+Image+Available";
      
      // Trailer Button
      watchBtn.onclick = () => {
        const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(show.name + " official trailer")}`;
        window.open(trailerUrl, "_blank");
      };

      // Save Button - Fixed JSON typo
      saveBtn.onclick = () => {
        
      
      saveBtn.onclick = () => {
        if (show) {
          // 1. Get existing saved shows from localStorage, or create an empty array if none exist
          let savedList = JSON.parse(localStorage.getItem("myWatchlist")) || [];

          // 2. Check if the show is already in the list (using the TVMaze show ID)
          const isAlreadySaved = savedList.some(savedItem => savedItem.id === show.id);

          if (!isAlreadySaved) {
            // 3. Add the new show to the array
            savedList.push(show);
            
            // 4. Save the updated array back to localStorage
            localStorage.setItem("myWatchlist", JSON.stringify(savedList));
          }
          
          // Update the button text so the user knows it worked
          saveBtn.textContent = "Saved";
          saveBtn.disabled = true; // Optional: disable the button so they don't click it twice
        }
      };

      // Reset the button when a new search happens
      saveBtn.textContent = "Save for later";
      saveBtn.disabled = false;
      };
    })  
    .catch(error => {
       console.error("Error fetching data:", error);
       descText.textContent = "Something went wrong. Please try again.";
    }); 
}

// 5. Function to build the layout visually
function createFeatureCard() {
  const stage = document.createElement("div");
  stage.className = "stage";

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
  rating.innerHTML = "<span>★</span> N/A";

  const yearTag = document.createElement("span");
  yearTag.className = "year-tag";
  yearTag.textContent = "N/A";

  topRow.append(rating, yearTag);

  const initials = document.createElement("span");
  initials.className = "initials";
  const img = document.createElement("img");
  img.src = "https://via.placeholder.com/80x562?text=Search+a+Movie"; // Default placeholder
  img.alt = "Poster";
  initials.appendChild(img);

  const titleBlock = document.createElement("div");
  titleBlock.className = "title-block";

  const posterTitle = document.createElement("h2");
  posterTitle.textContent = "Search a Movie";

  const genre = document.createElement("div");
  genre.className = "genre";
  genre.textContent = "Genre";

  titleBlock.append(posterTitle, genre);
  poster.append(topRow, initials, titleBlock);

  // --- DETAILS SECTION ---
  const details = document.createElement("div");
  details.className = "details";

  const badge = document.createElement("span");
  badge.className = "badge";
  badge.textContent = "TVMaze Result";

  const detailsH3 = document.createElement("h3");
  detailsH3.textContent = "Awaiting Search...";

  const metaDiv = document.createElement("div");
  metaDiv.className = "meta-row";
  // We leave this empty because we populate it with innerHTML during the fetch

  const desc = document.createElement("p");
  desc.className = "desc";
  desc.textContent = "Search for a movie or TV show above to see details.";

  const actions = document.createElement("div");
  actions.className = "actions";

  const watchBtnElem = document.createElement("button");
  watchBtnElem.className = "btn btn-primary";
  watchBtnElem.id = "watchBtn";
  watchBtnElem.textContent = "Watch trailer";

  const saveBtnElem = document.createElement("button");
  saveBtnElem.className = "btn btn-ghost";
  saveBtnElem.id = "saveBtn";
  saveBtnElem.textContent = "Save for later"; 

  actions.append(watchBtnElem, saveBtnElem);
  details.append(badge, detailsH3, metaDiv, desc, actions);

  // Assemble full card
  feature.append(poster, details);
  stage.appendChild(feature);
 
  return stage;
}