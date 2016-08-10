var fs = require('fs');

module.exports = function(app, router) {
    fs.readdirSync(__dirname).forEach(function(file) {
        if (file == 'index.js') return;
        var name = file.substr(0, (file.indexOf('.') == -1) ? file.length : file.indexOf('.'));
        require('./' + name)(app, router);
    });
};
