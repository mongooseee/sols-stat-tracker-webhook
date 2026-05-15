// Sol's Stat Tracker Webhook Client
// Created by @mongoo.se
// Last edited 23/08/2025

const WebSocket = require('ws');
const { WebhookClient, Events, EmbedBuilder } = require('discord.js');

const {
    token, webhookURL,                                                               // AUTHENTICATION
    overrideUsername, overrideAvatarURL, colors, emojis,                             // WEBHOOK USER
    gatewayURL, maxReconnectInterval, reconnectOnDuplicateConnection, verboseLogging // ADVANCED CONFIGURATION
} = require('./config');

console.warn('This repository has been archived. Please use https://github.com/solsstattracker/sols-stat-tracker-feed instead.');

let reconnectInterval = 31_000;

const webhookClient = new WebhookClient({ // Use the webhook URL to login to the webhook client
    url: webhookURL
});

webhookClient.on(Events.Error, (error) => {
    console.error(`ID: ${webhookClient.id} | Webhook client error: ${error.message}`)
});

const connect = () => {
    const ws = new WebSocket(gatewayURL, { // Create a WS connection
        headers: {
            token: token
        }
    });

    ws.on('open', () => {
        console.log(`ID: ${webhookClient.id} | WS client connected: ${gatewayURL}`);
        reconnectInterval = 31_000;

        setTimeout(() => {
            if (ws.readyState === ws.OPEN) {
                const connectedEmbed = new EmbedBuilder()
                    .setDescription(`${emojis.success} **Sol's Stat Tracker** - Connected`)
                    .setColor(colors.success);

                if (verboseLogging) webhookClient.send({ embeds: [connectedEmbed] });
            }
        }, 1_000);
    });

    ws.on('message', (rawData) => {
        try {
            rawData = JSON.parse(rawData.toString('utf8')); // Read the JSON data from the buffer

            switch (rawData.action) {
                case 'enabled':
                    const enabledEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.success} **Sol's Stat Tracker** - Enabled`)
                        .setColor(colors.success);

                    webhookClient.send({ embeds: [enabledEmbed] });
                    break;
                case 'disabled':
                    const disabledEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.error} **Sol's Stat Tracker** - Disabled`)
                        .setColor(colors.error);

                    webhookClient.send({ embeds: [disabledEmbed] });
                    break;
                case 'executeWebhook':
                    rawData.data.username = overrideUsername ?? rawData.data.username; // Set overrides
                    rawData.data.avatarURL = overrideAvatarURL ?? rawData.data.avatarURL;
                    rawData.data.allowedMentions = { parse: [] }; // Under no circumstances should the webhook be able to send mentions

                    webhookClient.send(rawData.data); // Send the message payload
                    break;
                default:
                    console.error(`ID: ${webhookClient.id} | WS client invalid action: ${rawData.action}`);
                    break;
            }
        } catch (error) {
            console.error(`ID: ${webhookClient.id} | WS client message error: ${error.message}`);
        };
    });

    ws.on('close', async (code, reason) => {
        reason = reason.toString('utf8');
        console.warn(`ID: ${webhookClient.id} | WS client disconnected: Code ${code}${reason ? ` - ${reason}` : ''}`);

        switch (code) {
            case 4001:
                if (verboseLogging) {
                    console.error('The API token is missing.');

                    const missingTokenEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.error} **Sol's Stat Tracker** - The API token is missing.`)
                        .setColor(colors.error);

                    await webhookClient.send({ embeds: [missingTokenEmbed] });
                }

                return;

            case 4002:
                if (verboseLogging) {
                    console.error('The API token is invalid.');

                    const invalidTokenEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.error} **Sol's Stat Tracker** - The API token is invalid.`)
                        .setColor(colors.error);

                    await webhookClient.send({ embeds: [invalidTokenEmbed] });
                }

                return;

            case 4004:
                if (verboseLogging) {
                    console.error('The API token has been deleted.');

                    const deletedEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.error} **Sol's Stat Tracker** - The API token has been deleted.`)
                        .setColor(colors.error);

                    await webhookClient.send({ embeds: [deletedEmbed] });
                }

                return;

            case 4003:
                if (verboseLogging) {
                    console.error('The API token is already in-use.');

                    const duplicateConnectionEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.error} **Sol's Stat Tracker** - The API token is already in-use.`)
                        .setColor(colors.error);

                    await webhookClient.send({ embeds: [duplicateConnectionEmbed] });
                };

                if (!reconnectOnDuplicateConnection) return;

            default:
                console.warn(`ID: ${webhookClient.id} | Reconnecting WS client in ${reconnectInterval}ms...`);

                if (verboseLogging) {
                    const reconnectingEmbed = new EmbedBuilder()
                        .setDescription(`${emojis.none} **Sol's Stat Tracker** - Reconnecting`)
                        .setColor(colors.none);

                    await webhookClient.send({ embeds: [reconnectingEmbed] })
                };

                setTimeout(connect, reconnectInterval);
                reconnectInterval = Math.min(maxReconnectInterval, reconnectInterval * 2);
        }
    });

    ws.on('error', async (error) => {
        console.error(`ID: ${webhookClient.id} | WS client error: ${error.message}`);
        ws.terminate();
    });
};


connect();
