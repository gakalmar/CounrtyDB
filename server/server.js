import express from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); // Required for tasks other than GET (PATCH, POST, PUT) -> req.body property becomes the parsed JSON object
app.use(express.urlencoded({ extended: false })); // Required for tasks other than GET (POST, PUT) -> req.body property becomes an object containing the key-value pairs
// app.use('/public', express.static(path.join(__dirname, '../frontend/public')));

// Static Page Requests:
// app.get('/movies', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend', 'movies.html'));
// })

// APIs:
// app.get('/api/movies', async (req, res) => {
//     try {
//         const data = await fs.readFile('backend/data/movies.json');
//         const movies = JSON.parse(data).movies;
//         return res.send(movies);
//     } catch (error) {
//         console.log (error);
//         return res.status(500).json( {message: "Error occured!"} );
//     }
// })

// Server:
app.listen(3000, () => {
    console.log("Server running on port: 3000. Link: http://127.0.0.1:3000/movies")
})