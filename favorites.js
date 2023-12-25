
// * Displays the list of favorite movies on the favorites.html page.

function displayFavourites() {
    // Get the container for the favorites list
    const favouritesListContainer = document.getElementById('favouritesList');
    favouritesListContainer.innerHTML = '';

    // Retrieve the favorites list from localStorage
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    // Check if the favorites list is empty
    if (favouritesList.length === 0) {
        // Display a message when the favorites list is empty
        const emptyMessage = document.createElement('p');
        emptyMessage.textContent = 'Your favourites list is empty.';
        favouritesListContainer.appendChild(emptyMessage);
    } else {
        // Display each movie in the favorites list
        favouritesList.forEach(movie => {
            // Create a card element for the movie
            const movieCard = document.createElement('div');
            movieCard.classList.add('col');
            movieCard.innerHTML = `
            <div class="card shadow-sm">
                <img class="bd-placeholder-img card-img-top" width="100%" height="225" src="${movie.Poster}" alt="${movie.Title}" />
                <div class="card-body">
                    <h3 class="fw-light">${movie.Title}</h3>
                    <div class="d-flex justify-content-between align-items-center">
                        <div class="btn-group">
                            <button type="button" class="btn btn-sm btn-danger remove-button" data-imdbid="${movie.imdbID}">Remove</button>
                            <a href="more.html?id=${movie.imdbID}"><button type="button" class="btn btn-sm btn-outline-secondary">More</button></a>
                        </div>
                    </div>
                </div>
            </div>
            `;
            // Append the movie card to the container
            favouritesListContainer.appendChild(movieCard);
        });
    }

    // Add event listeners to the remove buttons
    const removeButtons = document.querySelectorAll('.remove-button');
    removeButtons.forEach(button => {
        button.addEventListener('click', removeFromFavourites);
    });
}


// Removes a movie from the list of favorites.
function removeFromFavourites(event) {
    const imdbID = event.target.dataset.imdbid;
    const favouritesList = JSON.parse(localStorage.getItem('favourites')) || [];

    const updatedFavourites = favouritesList.filter(movie => movie.imdbID !== imdbID);

    localStorage.setItem('favourites', JSON.stringify(updatedFavourites));

    // Update the displayed favorites list
    displayFavourites();
}

// Call the displayFavourites function when the page loads
window.addEventListener('load', displayFavourites);
