var https   =   require('https'),
    _       =   require('underscore'),
    url     =   require('url');

var apiAI = function(key,token,options){
    if(!options) options = {};
    options = _.defaults(options,
        {
            format: 'json',
            host: "api.api.ai",
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Content-Length': 100,
                "Authorization": "Bearer " + token,
                "ocp-apim-subscription-key": key
            },
            port: 443,
            path: '/v1/query'
        });

    this.config = {
        key: key,
        format: options.format,
        headers: options.headers,
        host: options.host,
        port: options.port,
        path: options.path
    };

    return this;
}

apiAI.prototype.dialogue = function(text,callback){
    this._doRequest(text, callback);
}

apiAI.prototype._doRequest = function(query, callback) {
    var options = url.parse(url.format({
        protocol: 'https',
        hostname: this.config.host,
        pathname: this.config.path,
        query: query,
        access_token:this.config.access_token,
        headers: this.config.headers
    }));
    https.get(options, function(res) {
        var data = [];
        res
            .on('data', function(chunk) { data.push(chunk); })
            .on('end', function() {
                var dataBuff = data.join('').trim();
                var result;
                try {
                    result = JSON.parse(dataBuff);
                } catch (exp) {
                    result = {'status_code': 500, 'status_text': 'JSON Parse Failed'};
                }
                callback(null, result);
            });
    })
    .on('error', function(e) {
        console.log(e);
    });
};


module.exports = apiAI;