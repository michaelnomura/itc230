const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Finess the world')
})

app.listen(3000, function() {
    console.log('listening on 3000')
});