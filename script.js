 const searchInput = document.querySelector("#searchInput");

const url = "https://www.omdbapi.com/?apikey=af3e0d4&t=batman";

fetch(url)
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        console.log(data);
    })
    .catch((error) => {
        console.log(error);
    });