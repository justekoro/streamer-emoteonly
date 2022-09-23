import * as dotenv from "dotenv";
dotenv.config();

import * as tmi from "tmi.js";
import axios from "axios";
import fastify from "fastify";

const app = fastify();
let connected: boolean = false;
let isReadyToCheck: boolean = false;
let isStreamOnline: boolean = false;
let token: string = "";

import messages from "./messages";

const client = new tmi.Client({
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [process.env.CHANNEL_NAME]
});

client.connect().then(async (con) => {
    console.log("Connected!");
    // await client.say(process.env.CHANNEL_NAME, "Hello World!");
    connected = true;
    checkIfLive().then((res) => {
        console.log("Checked if live",res);
    }).catch((err) => {
        console.log("Error checking if live",err);
    });
});

const checkIfLive = async () => {
    const url = `https://api.twitch.tv/helix/streams?user_login=${process.env.CHANNEL_NAME}`;
    const headers = {
        "Client-ID": process.env.CLIENT_ID,
        "Authorization": `Bearer ${token}`
    }
    const response = await axios.get(url, {headers});
    return [response.data.data.length > 0, response.data.data[0], response.headers];
}

app.get("/login", async (request, reply) => {
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}&response_type=code&scope=channel:read:redemptions`;
    reply.redirect(url);
});

app.get("/", async (request, reply) => {
    // @ts-ignore
    const { code } = request.query;
    const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&code=${code}&grant_type=authorization_code&redirect_uri=${encodeURIComponent(process.env.REDIRECT_URI)}`;
    const response = await axios.post(url);
    const { access_token, refresh_token } = response.data;
    console.log("Access token", access_token);
    console.log("Refresh token", refresh_token);
    reply.send("Success!");
    token = access_token;
    // refresh token when it expires
    setTimeout(async () => {
        const url = `https://id.twitch.tv/oauth2/token?client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token&refresh_token=${refresh_token}`;
        const response = await axios.post(url);
        const { access_token } = response.data;
        console.log("Access token", access_token);
        token = access_token;
    }, /* the "expires_in" value from the response */ 3600 * 1000);

    isReadyToCheck = true;
    doEmoteMode().catch(e => {
        console.log("Error doing emote mode", e);
    })

    app.close();
    console.log(response.data);
});

const doEmoteMode = async () => {
    if (connected && isReadyToCheck) {
        const [isLive, liveData, headers] = await checkIfLive();
        if (isLive && !isStreamOnline) {
            await client.emoteonlyoff(process.env.CHANNEL_NAME);
            await client.say(process.env.CHANNEL_NAME, messages.streamStarts.replace(/\{game}/g, liveData.game_name));
        } else if (!isLive && isStreamOnline) {
            await client.emoteonly(process.env.CHANNEL_NAME);
            await client.say(process.env.CHANNEL_NAME, messages.streamEnds);
        }
        isStreamOnline = isLive;
        setTimeout(doEmoteMode, 5000);
    }
}

app.listen({port: 3030}, () => {
    console.log("Server listening on port 3030");
})
