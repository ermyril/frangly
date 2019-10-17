import '../img/icon-128.png'
import '../img/icon-34.png'

const axios = require('axios');
const oxfordAppId = '586697a8';
const oxfordAppKey = '6e36f7b3991f49779c310908bdfa7a0f';
axios.defaults.headers.common['app_id'] = oxfordAppId;
axios.defaults.headers.common['app_key'] = oxfordAppKey;
axios.defaults.headers.common['Accept'] = 'application/json';

//axios.get("https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/ace?strictMatch=false")

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.contentScriptQuery == "queryWord") {
    axios.get("https://od-api.oxforddictionaries.com/api/v2/entries/en-gb/"+request.word+"?strictMatch=false")
      .then(function (response) {
          sendResponse(response.data);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });

      return true;  // Will respond asynchronously.
    }
  });
