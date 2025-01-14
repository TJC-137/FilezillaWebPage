const ftp = require("basic-ftp");
const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());
app.use(express.json());

const FTP_CONFIG = {
    host: "127.0.0.1",
    user: "user1",
    password: "123",
    secure: true,
    secureOptions: { rejectUnauthorized: false }, // Acepta certificados autofirmados
    port: 21,
};

const JSON_FILE_PATH = "characters.json";

app.get("/characters", async (req, res) => {
    const client = new ftp.Client();
    try {
        await client.access(FTP_CONFIG);

        // Descargar el archivo JSON desde el servidor FTP
        await client.downloadTo(JSON_FILE_PATH, JSON_FILE_PATH);

        // Leer y parsear el archivo JSON
        const jsonData = fs.readFileSync(JSON_FILE_PATH, "utf8");
        const parsedData = JSON.parse(jsonData); // Parsear el archivo JSON

        // Enviar los datos al frontend
        res.json(parsedData.characters); // Asumiendo que el JSON tiene la estructura 'characters' que contiene los datos de los personajes
    } catch (err) {
        console.error("Error accessing FTP server:", err);
        res.status(500).send("Failed to fetch data from FTP server.");
    } finally {
        client.close();
    }
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
