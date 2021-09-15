const express = require('express');
const app = express();
const port = process.env.PORT || 3002;
const router = require('./router');


app.use(express.json());  //response in json format http://localhost:3005/books
app.use(router)

// app.get('/test', (req, res) => res.send('Hello Test!'))   //http://localhost:3005/test
// app.get('/', (req, res) => res.send('Hello Express!'))    //http://localhost:3005

app.listen(port, () =>
    console.log(`Example app listening at http://localhost:${port}`))