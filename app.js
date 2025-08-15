const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');
const detect = require('detect-port');

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB config
const mongoConfig = {
    serverUrl: "mongodb://localhost:27017/",
    database: "db-grocery"
};
let _connection;

async function connectDb() {
    if (!_connection) {
        try {
            const client = await MongoClient.connect(
                mongoConfig.serverUrl,
                { useUnifiedTopology: true }
            );
            _connection = client.db(mongoConfig.database);
            console.log(`Connected to MongoDB: ${mongoConfig.database}`);
        } catch (err) {
            console.error("Error connecting to MongoDB:", err);
        }
    }
    return _connection;
}
connectDb();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files (make sure your HTML/CSS/JS are in "public" folder)
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Example API route
app.get('/api/test', (req, res) => {
    res.json({ message: "API is working fine!" });
});

// Start server on available port
detect(PORT).then(freePort => {
    if (freePort === PORT) {
        app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
    } else {
        console.log(`Port ${PORT} in use. Using free port ${freePort} instead.`);
        app.listen(freePort, () => console.log(`Server running at http://localhost:${freePort}`));
    }
});
