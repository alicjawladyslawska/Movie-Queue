//convert.js
//A node.js program to take in CSV file, store the information in
//a data structure, then output to /data/movie_metadata_subset.json
//by 220019540

const fs = require('fs');

// Function to read from a CSV file and store in the movies variable
function readCSVFile(inputFile, outputFile) {
    // Read file
    const data = fs.readFileSync(inputFile, 'utf8');
    // Split into rows
    const rows = data.split('\n');

    // First row contains headers
    const header = rows[0].split(',');

    // Create an array to store movie values
    const movies = [];

    // Iterate through each row
    for (let i = 1; i < rows.length; i++) {
        // Separate each value in one row
        const row = rows[i].split(',');
        if (row.length === header.length) {
            // Create a movie object to store values for a single movie
            const movie = {};

            //loop through all categories
            for (let j = 0; j < header.length; j++) {
                //using .trim to eliminate whitespace
                //get the category name from the corresponding header
                const columnName = header[j].trim();
                //get the corresponding value to the header
                const value = row[j].trim();

                if (columnName === 'title_year' || columnName === 'duration') {
                    // Parse title_year and duration as floats
                    movie[columnName] = parseFloat(value);
                } else {
                    movie[columnName] = value;
                }
            }

            //add individual movie to movies data structure
            movies.push(movie);
        }
    }

    // Write the JSON data to an output file
    //use JSON.stringify function to convert movie data structure to a JSON string
    //argument 2 used to add indentation
    fs.writeFileSync(outputFile, JSON.stringify(movies, null, 2));
}

//specify file paths - change file path here
const inputFile = '../data/movie_metadata_subset.csv';
const outputFile = '../data/movie_metadata_subset.json';

// call function to create JSON file
readCSVFile(inputFile, outputFile);
