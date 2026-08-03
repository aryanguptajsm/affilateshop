 const searchInput = document.querySelector("#searchInput");
const movieName = searchInput.value.trim();
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

    });