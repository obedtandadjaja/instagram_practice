const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');
// import express from 'express';
// import morgan from 'morgan';
// import bodyParser from 'body-parser';

const app = express();
const port = process.env.PORT || 8080;

// Log with Morgan
app.use(morgan('dev'));

// Accept encoded data as well as json format
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Static files
app.use(express.static(__dirname + '/dist'));

const imageList = [
    {
        key: 0,
        url: 'https://process.filestackapi.com/sharpen/negative/sb5RRdoQiiy5l5JUglB1',
    },
    {
        key: 1,
        url: 'https://process.filestackapi.com/sharpen/oil_paint/urjTyRrAQA6sUzK2qIsd',
    },
    {
        key: 2,
        url: 'https://process.filestackapi.com/sepia/modulate/wxYyL4yQyyRH1RQLZ6gL',
    },
    {
        key: 3,
        url: 'https://process.filestackapi.com/blur/pixelate/O9vo0AynTNaNZlRyRBUm',
    },
    {
        key: 4,
        url: 'https://process.filestackapi.com/blackwhite/kcirovLQC2eJmA6pkrMD',
    },
    {
        key: 5,
        url: 'https://process.filestackapi.com/sharpen/modulate/5V2ZH22ZTWGXv2lMvvVT',
    },
];

const profileList = [
    {
        name: 'Obed Tandadjaja',
        bio: 'Proud son of Christ. Philippians 1:20-21',
        avatar: {
            url: 'https://process.filestackapi.com/sharpen/modulate/5V2ZH22ZTWGXv2lMvvVT',
        },
        posts: 50,
        followers: 200,
        following: 100,
    },
    {
        name: 'Olivia Tandadjaja',
        bio: 'Proud daughter of Christ. Philippians 1:20-21',
        avatar: {
            url: 'https://process.filestackapi.com/sharpen/modulate/5V2ZH22ZTWGXv2lMvvVT',
        },
        posts: 100,
        followers: 500,
        following: 500,
    },
];

app.route('/image')
    .get((req, res) => res.json(imageList))
    .post((req, res) => {
        const {url} = req.body;
        imageList.push({
            key: imageList.length,
            url,
        });
        res.json({
            success: 1,
            message: 'Image Successfully added!',
        });
    });
app.route('/profile')
    .get((req, res) => res.json(profileList));
app.get('*', function(request, response) {
  response.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
});

app.listen(port);
console.log('listening on port ${port}');
