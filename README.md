# api-ai

api-ai (Speech-to-Text and Intent Recognition in Context) node-module

## Install

`npm install api-ai`

## Usage

```javascript
var apiAI = require('api-ai')
var recognition = new apiAI();
recognition.dialogue({ query: 'whats my number','access_token': 'YOUR API TOKEN'}, function(err, response){
    if (err) { return onErr(err); }
    console.log(response);
});
```
