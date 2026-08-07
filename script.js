// Helper function to safely get the watchlist and guarantee it's an array
function getWatchlist() {
  try {
    const list = JSON.parse(localStorage.getItem("myWatchlist"));
    return Array.isArray(list) ? list : [];
  } catch (error) {
    return []; 
  }
}

// 1. Get the search input and the search bar container
const searchInput = document.querySelector("#searchInput");
const searchbar = document.querySelector(".controls"); 

// 2. Create the empty feature card and put it directly AFTER the search bar
const stageElement = createFeatureCard();
stageElement.style.display = "none"; // HIDE INITIALLY BEFORE SEARCH
searchbar.after(stageElement);

// 3. NOW that the card is in the DOM, we can safely select its inner elements
const cardTitle = document.querySelector(".title-block h2");
const cardGenre = document.querySelector(".title-block .genre");
const detailsTitle = document.querySelector(".details h3"); 
const descText = document.querySelector(".desc");
const topRowRating = document.querySelector(".top-row .rating");
const topRowYear = document.querySelector(".year-tag");
const metaRow = document.querySelector(".meta-row");
const featureImg = document.querySelector(".initials img");
const watchBtn = document.querySelector("#watchBtn");
const saveBtn = document.querySelector("#saveBtn");

// Initialize Watchlist UI on window load
document.addEventListener("DOMContentLoaded", displaySavedShows);

// 4. Search Event Listener
searchInput.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); 
    urlfetch(); 
  }
});

// --- NEW REUSABLE FUNCTION: Populates the main card ---
function renderShowOnCard(show) {
  // Show the card container
  stageElement.style.display = "block";

  cardTitle.textContent = show.name;
  detailsTitle.textContent = show.name; 
  descText.innerHTML = show.summary || "No description available.";
  
  const genre = show.genres && show.genres.length > 0 ? show.genres[0] : "Unknown";
  cardGenre.textContent = genre;

  const year = show.premiered ? show.premiered.substring(0, 4) : "N/A";
  topRowYear.textContent = year;

  // Update Rating
  const avgRating = show.rating?.average || "N/A";
  topRowRating.innerHTML = `<span>★</span> ${avgRating}`;

  // Update Meta Row
  const runtime = show.runtime ? `${show.runtime}m` : "N/A";
  metaRow.innerHTML = `
    <span class="rate">★ ${avgRating}</span>
    <span>${year}</span>
    <span>${genre}</span>
    <span>${runtime}</span>
  `;
  
  // Update Image safely using optional chaining
  featureImg.src = show.image?.original || "https://via.placeholder.com/380x562?text=No+Image+Available";
  
  // Trailer Button
  watchBtn.onclick = () => {
    const trailerUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(show.name + " official trailer")}`;
    window.open(trailerUrl, "_blank");
  };

  // Check if show is already in localStorage using the safe helper
  let savedList = getWatchlist();
  const isAlreadySaved = savedList.some(savedItem => savedItem.id === show.id);

  if (isAlreadySaved) {
    saveBtn.textContent = "Saved";
    saveBtn.disabled = true;
  } else {
    saveBtn.textContent = "Save for later";
    saveBtn.disabled = false;
  }

  // Save Button 
  saveBtn.onclick = () => {
    if (show) {
      let currentList = getWatchlist();
      const alreadyExists = currentList.some(savedItem => savedItem.id === show.id);

      if (!alreadyExists) {
        currentList.push(show);
        localStorage.setItem("myWatchlist", JSON.stringify(currentList));
        displaySavedShows();
      }
      
      saveBtn.textContent = "Saved";
      saveBtn.disabled = true; 
    }
  };
}

function urlfetch() {
  const query = searchInput.value.trim();
  
  // If the user searches an empty string, hide the card and do nothing
  if (!query) {
    stageElement.style.display = "none";
    return;
  }

  const url = `https://api.tvmaze.com/search/shows?q=${query}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.length === 0) {
        stageElement.style.display = "block";
        descText.textContent = "No results found. Try another search.";
        cardTitle.textContent = "No Results";
        detailsTitle.textContent = "No Results";
        featureImg.src = "https://via.placeholder.com/380x562?text=No+Results";
        return; 
      }

      // Use the new reusable function
      const show = data[0].show; 
      renderShowOnCard(show);
    })  
    .catch(error => {
       console.error("Error fetching data:", error);
       stageElement.style.display = "block";
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
  img.src = "https://via.placeholder.com/80x562?text=Search+a+Movie"; 
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

// 6. Function to render the Saved Shows on reload
function displaySavedShows() {
  let savedList = getWatchlist();
  
  let watchlistContainer = document.querySelector("#watchlistContainer");
  if (!watchlistContainer) {
    watchlistContainer = document.createElement("div");
    watchlistContainer.id = "watchlistContainer";
    watchlistContainer.style.marginTop = "40px";
    
    document.querySelector(".stage").after(watchlistContainer);
  }

  watchlistContainer.innerHTML = `<h2 style="margin-bottom: 15px;">My Watchlist</h2>`;
  
  const grid = document.createElement("div");
  grid.style.display = "flex";
  grid.style.gap = "15px";
  grid.style.flexWrap = "wrap";
  watchlistContainer.appendChild(grid);

  if (savedList.length === 0) {
    grid.innerHTML = "<p>No saved shows yet. Search and save some!</p>";
    return;
  }

  savedList.forEach(show => {
    const item = document.createElement("div");
    item.style.border = "1px solid #ccc";
    item.style.padding = "10px";
    item.style.borderRadius = "8px";
    item.style.textAlign = "center";
    item.style.width = "150px";
    item.style.display = "flex";
    item.style.flexDirection = "column";
    item.style.justifyContent = "space-between";

    const imgUrl = show.image?.medium || "https://via.placeholder.com/150x210?text=No+Image";
    
    // Wrapped the image and title in a clickable div that calls viewSavedShow()
    item.innerHTML = `
      <div onclick="viewSavedShow(${show.id})" style="cursor:pointer; flex-grow: 1;">
        <img src="${imgUrl}" alt="${show.name}" style="width:100%; border-radius: 4px; transition: opacity 0.2s;" onmouseover="this.style.opacity=0.8" onmouseout="this.style.opacity=1">
        <h4 style="margin: 10px 0 10px;">${show.name}</h4>
      </div>
      <button onclick="removeShow(${show.id})" style="cursor:pointer; padding: 6px 10px; background: #ff4d4d; color: white; border: none; border-radius: 4px; width: 100%; font-weight: bold;">Remove</button>
    `;
    grid.appendChild(item);
  });
}

// 7. Function to view a saved show (Clicking the saved card)
window.viewSavedShow = function(id) {
  let savedList = getWatchlist();
  let show = savedList.find(s => s.id === id);
  
  if (show) {
    // Populate the main card with this show's data
    renderShowOnCard(show);
    
    // Smoothly scroll the user back to the top to see the poster
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }
};

// 8. Function to remove a show from the list
window.removeShow = function(id) {
  let savedList = getWatchlist();
  
  savedList = savedList.filter(show => show.id !== id);
  localStorage.setItem("myWatchlist", JSON.stringify(savedList));
  
  displaySavedShows();
  
  let removedShowInfo = savedList.find(s => s.id === id); 
  
  if (!removedShowInfo) {
      document.querySelector("#saveBtn").textContent = "Save for later";
      document.querySelector("#saveBtn").disabled = false;
  }
};