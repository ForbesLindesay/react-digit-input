import express = require('express');

const browserify = require('browserify-middleware');

const app = express();

app.get('/', (req, res, next) => {
  res.send(`
    <style>
      body  {
        font-size: 5em;
      }
      input {
        width: 1em;
        height: 1em;
        font: inherit;
        text-align: center;
        margin: 0.1em;
      }
      .input-group {
        display: flex;
        align-items: center;
      }
      .hyphen {
        background: black;
        height: 0.1em;
        width: .5em;
        display: inline-block;
      }
    </style>
    <div id="root"></div>
    <script src="/bundle.js"></script>
  `);
});
app.get('/bundle.js', browserify(__dirname + '/client.js'));

app.listen(3000);
