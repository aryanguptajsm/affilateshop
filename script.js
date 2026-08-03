 const searchInput = document.querySelector("#searchInput");
const movieName = searchInput.value.trim();
// 1. Select your input element
const inputField = document.getElementById("myInput");

// 2. Add the event listener
inputField.addEventListener("keydown", function(event) {
  // 3. Check if the key pressed is "Enter"
  if (event.key === "Enter") {
    event.preventDefault(); // Prevents default form submissions
    const url = `https://www.omdbapi.com/?apikey=af3e0d4&t=${movieName}`;

fetch(url)
    .then(response => response.json())
    .then(data => {

       // title.textContent = data.Title;
       // year.textContent = data.Year;
       // rating.textContent = data.imdbRating;
       // genre.textContent = data.Genre;
       // runtime.textContent = data.Runtime;
       // director.textContent = data.Director;
       //////////// plot.textContent = data.Plot;
       // poster.src = data.Poster;//

    });            // Calls your function
  }
});

function runMyCode() {
  console.log("Enter key was pressed! Code is running...");
}

