const express = require('express');
const request = require('request');
const stories = require('./stories');

const app = express();

app.use((req, res, next) => {
    console.log('Request details. Method:', req.method, 'Original url', req.originalUrl);

    next();
});

app.use((req, res, next) => {
    res.header('Acces-Control-Allow-Origin', '*');

    next();
});

app.get('/ping', (req, res) => {
    res.send('pong!');
});

app.get('/stories', (req, res) => {
    res.json(stories);
})

app.get('/stories/:title', (req, res) => {
    const { title } = req.params;

    res.json(stories.filter(story => story.title.includes(title)));
});

app.get('/topstories', (req, res, next) => {
    request(
        { url: 'https://hacker-news.firebaseio.com/v0/topstories.json' }, // to have an error change the url
        (error, response, body) => {
            if (error || response.statusCode !== 200) {
                console.log('going to next');
                return next(new Error('Error requesting top stories'));
            }

            res.json(JSON.parse(body)); // JSON.parse return an array instead a string
        }
    );
});

app.use((err, req, res, next) => {
    res.status(500).json({ type: 'error', message: err.message });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));