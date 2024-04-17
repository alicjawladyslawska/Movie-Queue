//search.js
//Includes functions to perform searches and add movies to the queue
//by 220019540

// Function to perform a basic search and display the results in HTML
function performSearch(query) {
    // Filter the movies array to find matches for the search query
    const searchResults = movies.filter(movie => {
        // Check if the movie matches the search query in various fields
        return (
            movie.movie_title.toLowerCase().includes(query) ||
            movie.director_name.toLowerCase().includes(query) ||
            movie.actor_1_name.toLowerCase().includes(query) ||
            movie.actor_2_name.toLowerCase().includes(query) ||
            movie.title_year.toString().includes(query)
        );
    });

    // Get the container where search results will be displayed
    const searchResultsContainer = document.getElementById('searchResults');

    // Clear any previous search results from the container
    searchResultsContainer.innerHTML = '';

    if (searchResults.length > 0) {
        // Create an unordered list to hold the search results
        const ul = document.createElement('ul');

        // Iterate through the search results and create list items for each movie
        searchResults.forEach(movie => {
            const li = document.createElement('li');
            const movieInfoDiv = document.createElement('div');
            movieInfoDiv.classList.add('movie-info');

            // Populate the movie info div with details
            movieInfoDiv.innerHTML = `
                <div class="movie-details">
                    <strong>Title:</strong> ${movie.movie_title}<br>
                    <strong>Director:</strong> ${movie.director_name}<br>
                    <strong>Actors:</strong> ${movie.actor_1_name} and ${movie.actor_2_name}<br>
                    <strong>Year:</strong> ${movie.title_year}
                </div>
                <button class="add-to-queue" data-movie="${movie.movie_title}">+</button>
            `;

            // Append the movie info div to the list item, and the list item to the unordered list
            li.appendChild(movieInfoDiv);
            ul.appendChild(li);
        });

        // Append the unordered list to the search results container
        searchResultsContainer.appendChild(ul);
    } else {
        // Display a message when no search results are found
        const noResultsMessage = document.createElement('p');
        noResultsMessage.textContent = 'No movies found for the given search query.';
        searchResultsContainer.appendChild(noResultsMessage);
    }
}

// Event listener for the search button
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener('click', () => {
    // Get the search input field
    const searchInput = document.getElementById('search-input');
    const query = searchInput.value.trim().toLowerCase();

    if (query.length > 0) {
        // Call the performSearch function when the search button is clicked
        performSearch(query);
    }
});

// Event listener for the add to queue buttons
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('add-to-queue')) {
        // Retrieve the movie title associated with the clicked button
        const movieTitle = event.target.getAttribute('data-movie');
        
        // Find the movie in the movies array using the movie title
        const movie = movies.find(movie => movie.movie_title === movieTitle);
        if (movie) {
            // Call the addToMovieQueue function to add the movie to a queue
            addToMovieQueue(movie);
        }
    }
});

// Event listener for Enter key press in the search input field
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        // Get the search query from the input field and call performSearch if it's not empty
        const query = searchInput.value.trim().toLowerCase();
        if (query.length > 0) {
            performSearch(query);
        }
    }
});