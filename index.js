const express = require('express');
const app = express();
const port = 1000;
app.get('/', (req,res) => {res.send('Hello welcome to the banking app')});











app.listen(port, () => {console.log(`Banking app listening at http://localhost:${port}`)});
