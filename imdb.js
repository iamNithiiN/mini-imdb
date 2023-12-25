// API key for OMDB
const apiKey = '1b1b60c0';


 // Asynchronously searches for movies based on the provided query.

async function searchMovies(query) {
    try {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;
        const response = await fetch(url);
        const data = await response.json();
        return data?.Search || [];
    } catch (error) {
        console.error('Error searching movies:', error);
        return [];
    }
}


 //Asynchronously retrieves details for a movie based on its IMDb ID.
async function getMovieDetails(imdbID) {
    try {
        const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;
        const response = await fetch(url);
        const data = await response.json();
        return data?.Response === 'True' ? data : null;
    } catch (error) {
        console.error('Error getting movie details:', error);
        return null;
    }
}


//  Adds a movie to the list of favorites.

async function addToFavourites(event) {
    const imdbID = event.target.dataset.imdbid;
    const movie = await getMovieDetails(imdbID);

    if (movie) {
        const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];
        if (!favouritesList.some(m => m.imdbID === movie.imdbID)) {
            favouritesList.push(movie);
            localStorage.setItem('favourites', JSON.stringify(favouritesList));
            alert(`${movie.Title} has been added to your favourites!`);
        } else {
            alert(`${movie.Title} is already in your favourites!`);
        }
    }
}


// Displays search results on the index.html page.

function displaySearchResults(results) {
    const searchResultsContainer = document.getElementById('searchResults');
    searchResultsContainer.innerHTML = '';

    results.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('col');
        movieCard.innerHTML = `
            <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${movie.Poster}" alt="${movie.Title}" />
                <div class="card-body">
                    <h3 class="fw-light">${movie.Title}</h3>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-outline-secondary favourite-button" data-imdbid="${movie.imdbID}">Add to Favourites</button>
                            <a href="more.html?id=${movie.imdbID}"><button type="button" class="btn btn-sm btn-outline-secondary">More</button></a>
                        </div>
                    </div>
                </div>
            </div>`;

        searchResultsContainer.appendChild(movieCard);
    });

    const favouriteButtons = document.querySelectorAll('.favourite-button');
    favouriteButtons.forEach(button => {
        button.addEventListener('click', addToFavourites);
    });
}


//  Initiates a movie search based on user input.
function Search() {
    const query = inputVal.value.trim();
    if (query.length > 0) {
        searchMovies(query)
            .then(results => {
                displaySearchResults(results);
                localStorage.setItem('searchResults', JSON.stringify(results));
            })
            .catch(error => console.error('Error searching movies:', error));
    } else {
        alert("Enter a valid name");
    }
}

// Event listeners for the Search Button and form submission
const searchButton = document.getElementById('searchButton');
const inputVal = document.getElementById('searchInput');
const searchForm = document.querySelector('form[role="search"]');

searchButton.addEventListener('click', Search);

searchForm.addEventListener('submit', function (event) {
    event.preventDefault(); // prevent form submission
    Search();
});


// Automatically displays search results if available from previous search.

const previousSearchResults = JSON.parse(localStorage.getItem('searchResults'));
if (previousSearchResults && previousSearchResults.length > 0) {
    displaySearchResults(previousSearchResults);
}
