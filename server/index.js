const express = require('express');
const db = require('../database');
const path = require('path');
const dbHelpers = require('../database/helpers')


const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client/dist'));

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client', 'dist', 'index.html'));
});

app.listen(port, () => {
	console.log('process.env.PORT:', port);
});
