import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import cors from 'cors';

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Required for tasks other than GET (PATCH, POST, PUT) -> req.body property becomes the parsed JSON object
app.use(express.urlencoded({ extended: false })); // Required for tasks other than GET (POST, PUT) -> req.body property becomes an object containing the key-value pairs
app.use('/client', express.static(path.join(__dirname, '../client')));
app.use(cors()); // Add this line to enable CORS (npm i cors!)

// Static Page Requests:
app.get('/welcome', (req, res) => {
    res.send("Welcome!");
})

// API Endpoint to Get Favorite Countries
app.get('/api/favoriteCountries', async (req, res) => {
    try {
        const favoriteCountriesData = await fs.readFile('./server/data/favoriteCountries.json', 'utf-8');
        const favoriteCountries = JSON.parse(favoriteCountriesData);
        res.json(favoriteCountries);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// APIs:
app.post('/api/favoriteCountries', async (req, res) => {
    try {
        
        // Load existing favourite countries:
        const existingFavoriteCountriesData = await fs.readFile('./data/favoriteCountries.json', 'utf-8');
        const existingFavoriteCountries = JSON.parse(existingFavoriteCountriesData);

        // Get data from body (with destructuring):
        const { name, capital, region, subregion, continents, area, population, flag } = req.body;
    
        // Create new fav object:
        const newFavoriteCountry = {
            name,
            capital,
            region,
            subregion,
            continents,
            area,
            population,
            flag
        }

        // Add new country to the favCountries file:
        existingFavoriteCountries.push(newFavoriteCountry);

        // Save the updated list into the same file:
        await fs.writeFile('./data/favoriteCountries.json', JSON.stringify(existingFavoriteCountries, null, 2));

        res.json({ success: true, message: 'Favorite country added successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
});

// Server:
app.listen(3000, () => {
    console.log("Server running on port: 3000. Link: http://127.0.0.1:3000/welcome")
})