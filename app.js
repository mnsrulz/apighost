var restify = require('restify');
var gddirect = require('gddirecturl');
async function gdriveHandler(req, res, next) {
    try {
        var o = await gddirect.getMediaLink(req.params.gdriveid);
        res.send(o);
    } catch (error) {
        res.send('error');
    }
}

async function bloidmediaplayerHandler(req, res, next){
	var u = 'https://github.com/manishrawat4u/plugin.video.bloimediaplayer/releases/download/0.1.0/plugin.video.bloimediaplayer-0.1.0.zip';
	res.writeHead(302, {Location: u});
	res.end();
}

var server = restify.createServer();
server.get('/api/gddirect/:gdriveid', gdriveHandler);
server.get('/api/bloimediaplayer', bloidmediaplayerHandler);
server.get('/', function (req, res) {
    res.send('Welcome to api ghost!!!');
});
var port = normalizePort(process.env.PORT || '4000');

server.listen(port, function () {
    console.log('%s listening at %s', server.name, server.url);
});

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}
