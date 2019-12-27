const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
);



function generateAuthUrl() {
    // generate a url that asks permissions for Blogger and Google Calendar scopes
    var scopes = [
        // 'https://www.googleapis.com/auth/youtube.upload',
        // 'https://www.googleapis.com/auth/calendar'
    ];

    scopes = scopes.concat(process.env.GOOGLE_SCOPES.split(','));
    return oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'offline',

        // If you only need one scope you can pass it as a string
        scope: scopes
    });
}

async function getToken(code) {
    return await oauth2Client.getToken(code);
}

module.exports.generateAuthUrl = generateAuthUrl;
module.exports.getToken = getToken;
