const express = require('express');

const app = express();

app.get('/',(request, response) => {
    response.send('hellp');
});


app.listen(3000);