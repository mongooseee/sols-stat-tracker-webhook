# Sol's Stat Tracker Webhook
Connect to Sol's Stat Tracker to post stats found through a Discord webhook.

## Setup
1. Download the latest release of [Sol's Stat Tracker Webhook](https://github.com/mongooseee/sols-stat-tracker-webhook/releases).
2. Unzip the Sol's Stat Tracker Webhook file.
3. Open the `config.js` file in Sol's Stat Tracker Webhook
4. Using the Sol's Stat Tracker Discord bot, execute the `/generatetoken` command to generate an API token.
5. In the `config.js` file, place the API token in the token field.

Example:
```js
const config = {
    // AUTHENTICATION (REQUIRED)
    "token": "0123456789ABCDEFabcdef0123456789ABCDEFabcdef0123456789ABCDEFabcdef01234567",
    "webhookURL": "PLACE THE WEBHOOK URL HERE",

    // WEBHOOK USER (OPTIONAL)
    "overrideUsername": null,
    "overrideAvatarURL": null,

    "colors": {
        "success": "#6ab183",
        "error": "#d85a4b",
        "none": "#777f8d"
    },

    "emojis": {
        "success": "<:green_tick:1365702693326422026>",
        "error": "<:red_tick:1365702694727188491>",
        "none": "<:gray_tick:1365702690985738390>"
    },

    // ADVANCED CONFIGURATION (OPTIONAL) - DO NOT CHANGE THESE CONFIGURATIONS UNLESS YOU KNOW WHAT YOU'RE DOING
    "gatewayURL": "wss://api.mongoosee.com/solsstattracker/v2/gateway",

    "maxReconnectInterval": 120000,
    "reconnectOnDuplicateConnection": false, // If true, forces a reconnect attempt on a duplicate connection error, this may cause a reconnection loop.
    
    "verboseLogging": true, // If true, logs automated events like connection status, user events are logged regardless of this setting.
};

module.exports = config;
```

6. Create a Discord webhook, and copy the webhook URL.
7. In the `config.js` file, place the webook URL in the webhookURL field.

Example:
```js
const config = {
    // AUTHENTICATION (REQUIRED)
    "token": "0123456789ABCDEFabcdef0123456789ABCDEFabcdef0123456789ABCDEFabcdef01234567",
    "webhookURL": "https://discord.com/api/webhooks/123456789012345678/AbCdEfGhIjKlMnOpQrStUvWxYz0123456789abcdef",

    // WEBHOOK USER (OPTIONAL)
    "overrideUsername": null,
    "overrideAvatarURL": null,

    "colors": {
        "success": "#6ab183",
        "error": "#d85a4b",
        "none": "#777f8d"
    },

    "emojis": {
        "success": "<:green_tick:1365702693326422026>",
        "error": "<:red_tick:1365702694727188491>",
        "none": "<:gray_tick:1365702690985738390>"
    },

    // ADVANCED CONFIGURATION (OPTIONAL) - DO NOT CHANGE THESE CONFIGURATIONS UNLESS YOU KNOW WHAT YOU'RE DOING
    "gatewayURL": "wss://api.mongoosee.com/solsstattracker/v2/gateway",

    "maxReconnectInterval": 120000,
    "reconnectOnDuplicateConnection": false, // If true, forces a reconnect attempt on a duplicate connection error, this may cause a reconnection loop.
    
    "verboseLogging": true, // If true, logs automated events like connection status, user events are logged regardless of this setting.
};

module.exports = config;
```

8. Install [Node.js](https://nodejs.org/en)
9. In Sol's Stat Tracker Webhook open the `setup.bat` file to install the dependencies.
10. In Sol's Stat Tracker Webhook open the `run.bat` file.
