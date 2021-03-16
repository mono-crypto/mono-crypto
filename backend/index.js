const express = require("express");
const request_url = require('request');
const app = express();

const key = require('./env.json');

const api_base_url = 'https://cloud.iexapis.com'; // stock API

app.get("/api", (req, res, next) => {
    try {
        request_url.get({
            url: api_base_url +req.query.path,
            qs: {
                'token': key.iex_public_key
            }
        }, function(error, request_response, body) {
            if(error) throw error;

            res.json(body);
        });
    } catch(e) {
        res.json(e);
    }
});
  
app.listen(3000, () => console.log("Listening on port 3000..."));
