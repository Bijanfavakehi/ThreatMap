//this is the class for the different threat feeds
module.exports = dataPack;

function dataPack(name) {
    this.name = name; //threat feed source eg. Virus Total
    this.rawData = "GARBAGE"; //Storage place for returning data from the source
    this.plugin = ""; //Location of the javascript file to interface with

}
dataPack.prototype.setData = function (Data) {
    //console.log("setting the data");
    this.rawData = Data;
};
dataPack.prototype.setPlugin = function (Data) {
    //console.log("setting the plugin");
    this.plugin = Data;
};
dataPack.getPlugin = function () {
    return(this.plugin);
}
