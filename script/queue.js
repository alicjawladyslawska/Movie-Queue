//queue.js
//fetch JSON data, and create a FIFO queue for the movies
//by 220019540

// Initialize movie queue and set the JSON data file URL
const jsonFileURL = '/data/movie_metadata_subset.json';
const movieQueue = [];
// Keep movies in global scope for other modules (e.g., search.js) to access.
const movies = [];
// Call the fetchAndProcessJSONData function with the JSON file URL
fetchAndProcessJSONData(jsonFileURL);

// Function to format the total duration of the movie queue in HH:MM format
function formatDuration(inputMinutes) {
  // Calculate hours and minutes
  const hours = Math.floor(inputMinutes / 60);
  const minutes = inputMinutes % 60;
  return `${hours}:${minutes.toString().padStart(2, '0')}`;
}

// Function to display the movie queue and its statistics
function displayMovieQueue() {
    const movieListContainer = document.getElementById('movieList');
    const ul = document.createElement('ul');
    
    // Display the movies in the queue
    movieQueue.forEach(movie => {
        const li = document.createElement('li');
        const formattedDuration = formatDuration(movie.duration || 0);
        li.innerHTML = `
              <div class="movie-container">
                ${movie.movie_title} (${movie.director_name}, ${movie.title_year}, ${formattedDuration})
                <button class="remove-movie" data-movie="${movie.movie_title}">-</button>
            </div>
            <hr>`;
        ul.appendChild(li);
    });
    
    // Calculate the number of movies in the queue and their total duration
    const numMovies = movieQueue.length;
    const totalMinutes = movieQueue.reduce((acc, movie) => acc + (movie.duration || 0), 0);
    const totalDuration = formatDuration(totalMinutes);
    
    // Display the statistics
    const statsLi = document.createElement('li');
    statsLi.innerHTML = `
      <strong>Number of Movies in Queue:</strong> ${numMovies}<br>
      <strong>Total Duration:</strong> ${totalDuration} (HH:MM)<br>
    `;
    
    ul.appendChild(statsLi);
    
    // Clear the movie list container and append the updated movie queue
    movieListContainer.innerHTML = '';
    movieListContainer.appendChild(ul);
}

// Function to add a movie to the queue
function addToMovieQueue(movie) {
    movieQueue.push(movie);
    displayMovieQueue(); // Update the displayed queue
}

// Function to remove a movie from the queue and update the display
function removeFromMovieQueue(movie) {
    const index = movieQueue.findIndex(m => m.movie_title === movie.movie_title);
    if (index !== -1) {
        movieQueue.splice(index, 1); // Remove the movie from the queue
        displayMovieQueue(); // Update the displayed queue
    }
}

// Event listener for the "Remove" buttons in the queue
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('remove-movie')) {
        const movieTitle = event.target.getAttribute('data-movie');
        const movie = movieQueue.find(movie => movie.movie_title === movieTitle);
        if (movie) {
            removeFromMovieQueue(movie); // Remove the movie from the queue
        }
    }
});

// HTTP fetch the JSON data
// This will work when served via a web server
// Function to fetch JSON data and process it
function fetchAndProcessJSONData(url) {
  fetch(url)
    .then(response => {
      // Error handling: Check if the response is not OK
      if (!response.ok) {
        throw new Error(`Failed to fetch JSON file: ${response.statusText}`);
      }
      return response.json();
    })
    .then(movieData => {
      // Iterate through the JSON objects and store them in the 'movies' array
      movieData.forEach(movie => {
        movies.push({
          movie_title: movie.movie_title,
          director_name: movie.director_name,
          actor_1_name: movie.actor_1_name,
          actor_2_name: movie.actor_2_name,
          title_year: movie.title_year,
          duration: movie.duration,
        });
      });

      // Add the first 3 movies to the movie queue to create a placeholder queue
      movies.slice(0, 3).forEach(movie => {
        addToMovieQueue(movie);
      });
    })
    .catch(error => {
      console.error('Error fetching or processing the JSON:', error);
    });
}


