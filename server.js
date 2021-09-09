require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function (req, res) {
    res.json({greeting: 'hello API'});
});
//post function
let urldb = {};
let shorurl = 1;
app.post('/api/shorturl/', (req, res) => {
    const reglink = new RegExp('^https?:\/\/www.[a-zA-Z0-9_-]+.[A-Za-z]{1,4}$');
    if (reglink.test(req.body.url)) {
        urldb[shorurl] = {original_url: req.body.url, short_url: shorurl};
        res.json({original_url: req.body.url, short_url: shorurl});
        shorurl++;
    } else {
        res.json({error: 'invalid url'});
    }
})
app.get('/api/shorturl/:short',(req,res)=>{
    res.redirect(urldb[req.params.short].original_url);

})

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
