
var restify = require('restify');
const got = require('got');
const cheerio = require('cheerio');
const cookie = require('cookie');
var setCookie = require('set-cookie-parser');
async function gdriveHandler(req, res, next) {
    try {

        var gd3 = got.get('https://drive.google.com/thumbnail?sz=w320&id=1pB9y4X4qIgCHgDkxBjcWGKgLiZpT0WVZ', {
            followRedirect: false
        });

        var gd1 = await got.get('https://drive.google.com/uc?id=' + req.params.gdriveid + '&export=download');

        var responseCookies = setCookie.parse(gd1.headers["set-cookie"]);
        var nextRequestCookies = responseCookies.map((x) => {
            return x.domain == '.drive.google.com' ? cookie.serialize(x.name, x.value) : null;
        }).join(';');

        const $ = cheerio.load(gd1.body);

        var downloadLink = $('#uc-download-link').attr('href');
        var gd2 = await got.get('https://drive.google.com' + downloadLink, {
            headers: {
                cookie: nextRequestCookies
            }, followRedirect: false
        });
        var o = gd2.headers.location;
    var thumbResponse=    await gd3;
        var o1 = thumbResponse.headers.location;
        res.send({
            link: o,
            thumbnail: o1
        });
        return;
    } catch (error) {
        res.send('error'); return;
    }

    //res.send('hello ' + req.params.name);
    next();
}

var server = restify.createServer();
server.get('/api/gddirect/:gdriveid', gdriveHandler);
// server.head('/hello/:name', respond);

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
