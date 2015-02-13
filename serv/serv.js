process.env.NODE_ENV = "production";

var allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'content-type, Authorization, Content-Length, X-Requested-With, Origin, Accept');

    res.header("Cache-Control", "no-cache", "must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", -1);

    if ('OPTIONS' === req.method) {
        res.send(200);
    } else {
        next();
    }
};

var path = require("path"),
    express = require("express"),
    app = express();

app.configure('production', function () {
    var oneYear = 0;         //31557600000
    app.set('port', process.env.PORT || 80);
    app.use(express.compress());
    app.use(allowCrossDomain);
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.static(__dirname + './../', { maxAge: oneYear }));


});
app.listen(80);