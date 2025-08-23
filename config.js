const config = {
    // AUTHENTICATION (REQUIRED)
    "token": "PLACE YOUR API TOKEN HERE",
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