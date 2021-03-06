var deferred = require('deferred');

module.exports = {
    loader: function (i, req){

        var promise = deferred();
        console.log("Calling dataint");
        var threatFeed = require("." + threatFeeds[i].plugin); //get the require from the plugin field
        var info = threatFeed.data(req.body.md5);   //pass md5 to plug in
            info.then( (data) => { // wait for data to come in
                threatFeeds[i].setData(data); // set the raw data field in the class to the reply
                var response = ({"Resource" : threatFeeds[i].name})
                response.rawData = threatFeeds[i].rawData;
                promise.resolve(response);
            });
        return promise.promise;
    }
}
