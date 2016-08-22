// Get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Set up a mongoose model and pass it using module.exports
var configSchema = new Schema({
    // Title of the site.
    siteTitle: String,
    // Description of the site.
    siteDescription: String,
});

module.exports = mongoose.model('Config', configSchema);
