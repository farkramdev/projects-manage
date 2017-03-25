const https = require('https');
const http = require('http');
class HttpClient {
    static request(url, callback = function(code, body) {}) {
        let request = url.indexOf('https:') !== -1 ? https.get(url, callbackResponse) : http.get(url, callbackResponse);

        function callbackResponse(res) {
            if (res.statusCode == 200) {
                let data = '';
                let responseRate = 0;
                res.on('data', buffer => data += buffer);
                res.on('end', () => {
                    let responseData = null;
                    try {
                        responseData = JSON.parse(data);
                    } catch (e) {
                        responseData = data;
                    }
                    callback(res.statusCode, (responseData.bpi.THB.rate).replace(",",""));
                });
            } else {
                callback(res.statusCode, res.statusMessage);
            }
        }
    }

}

module.exports = HttpClient;

// HttpClient.request('https://blockchain.info/ticker', function(status, body) {
//     console.log(body);
// });