const express = require('express');
const stories = require('./stories');

const app = express();

app.get('/ping', (req, res) => {
    res.send('pong!');
});

app.get('/stories', (req, res) => {
    res.json(stories);
})

app.get('/stories/:title', (req, res) => {
    const { title } = req.params;

    res.json(stories.filter(story => story.title.includes(title)));
    // this will give on the page all stories with the title in witch contains the :"title" word
});

const PORT = 3000;
app.listen(PORT, () => console.log(`listening on ${PORT}`));