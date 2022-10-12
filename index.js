"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const { Authflow } = require('prismarine-auth');
const path_1 = __importDefault(require("path"));
const axios_1 = __importDefault(require("axios"));
const fs = require('fs');

const axios = require("axios");
const bedrock = require('bedrock-protocol')
const chalk = require('chalk');
const { Client, Intents, MessageEmbed, MessageAttachment, } = require("discord.js");
const { FullPacketParser } = require("protodef/src/serializer");
const { realmId, realmName, token, channelId, clientId, guildId, botName, banneddevices, lasthour } = require("./config.json");
const {
    hasMentions,
    chkMsg,
    stringToColor,
    fancyHash,
    mcColor,
    pktrgx,
    ignorepackets,
    logpaknames,
    welcomeMessage,
} = require('./utils');
const { time } = require('console');
const discordToken = token
const realmid = realmId

function purple(txt) { return chalk.rgb(130, 20, 200).bold(txt) }
function orange(txt) { return chalk.rgb(255, 130, 0).bold(txt) }
function OPO(f, m, l) { console.log(orange(f) + " " + purple(m) + " " + orange(l)) }
function POP(f, m, l) { console.log(purple(f) + " " + orange(m) + " " + purple(l)) }

function fancyMSG(message, sender) {
    let color = "#000000"
    if (!!(sender)) { color = stringToColor(sender) }
    const newEmbed = new MessageEmbed()
        .setColor(color)
        .setDescription(message);
    return newEmbed
}

function logOrIgnore(packetname) {
    try {
        if (logpaknames !== 1) { return }
        if (rtest(packetname) === true) { return }
        if (ignorepackets.includes(packetname)) { return }
        if (packetname === `set_score`) return;
        OPO("Recieved a", packetname, "packet.")
    } catch (e) { console.log(e) }
}
function rtest(t) {
    return !!pktrgx.exec(t)
}

class DiscBot {
    constructor() {
        this.discordClient = new Client({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
                Intents.FLAGS.GUILD_MEMBERS,
            ],
        });
        this.realmReady = false
        this.getRealmClient = function () {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    try {
                        const c = bedrock.createClient({ connectTimeout: 15000, realms: { realmId: realmid } })
                        resolve(c)
                    } catch (e) { console.log(e); reject(e.message) }

                }, 3000)
            })
        }
        this.handle_realm_message = function (source, message) {
            try {
                this.onRealmMessage({ sender: source, message: message })
            } catch (e) { console.log(e) }
        }
        this.client = null
        this.getRealmClient().then((c) => { this.client = c })

    }
    onStartup() {
        setTimeout(() => {
            this.client.on('text', (packet) => {
                try {
                    if ((packet.source_name != this.client.username) && (packet.type === "chat")) {
                        POP("Got a realm message from", `${packet.source_name}:`, packet.message)
                        this.handle_realm_message(packet.source_name, packet.message)
                    }
                } catch (e) { console.log(e) }
            })
            this.client.on('player_list', (packet) => {
                try {
                    let players = packet?.data?.records?.records ?? packet?.data?.records
                    if (players) {
                        console.log("Received player list: ", players) 
                    }
                } catch { }
            })
            this.client.on("player_list", (packet) => {
                if(packet.records.type === "add") {

            packet.records.records.forEach(player => {

                this.client.on('text', (packet) => {
                    if (packet.message = "§e%multiplayer.player.joined.realms")

                new Authflow('', `\\auth`, { relyingParty: 'http://xboxlive.com' }).getXboxToken().then((t) => {
                    axios_1.default.get(`https://titlehub.xboxlive.com/users/xuid(${player.xbox_user_id})/titles/titlehistory/decoration/scid,image,detail`, {
                        headers: {
                            'x-xbl-contract-version': '2',
                            'Authorization': `XBL3.0 x=${t.userHash};${t.XSTSToken}`,
                            "Accept-Language": "en-US"
                        }
                        }).then((res) => {
                            console.log(`${res.data.titles[0].name}`)



                            if(res.data.titles[0].name = `minecraft`) {
                            let timeplayed = `${JSON.stringify(res.data.titles[0].titleHistory.lastTimePlayed)}`;
                            console.log(timeplayed)

                            let firsthourpos = timeplayed.search("T") + 1;
                            let firsthour = timeplayed.charAt(firsthourpos)

                            let secondhourpos = timeplayed.search("T") + 2;
                            let secondhour = timeplayed.charAt(secondhourpos)
                            if (timeplayed.charAt(secondhourpos) === ":") return;

                            let hour = firsthour + secondhour

                            console.log(hour)

                            //current time
                            let date_ob = new Date();
                            let currenthours = date_ob.getHours() + 5
                            console.log(currenthours)
                            console.log(`lastplayed: ${currenthours - hour} Hours Ago`)

                            fs.readFile(path_1.default.resolve(`./whitelisted.json`), 'utf8', async (err, data) => {
                                    if (!data || err) return console.log(err);
                                if (data.includes(player.xbox_user_id)) return;
                
            const discordClient = this.discordClient;
            const guild = discordClient.guilds.fetch(guildId);

            this.client.on('player_list', (packet) => {

            
            const JoinMSG = new MessageEmbed()
            .setTitle(`(+) ${realmName}`)
            .setDescription(`**${player.username} Joined REALMNAME**`)
            .setFooter(`Joined On ${res.data.titles[0].name}`)
            .setTimestamp()
            .setColor(`#21b361`)
            discordClient.channels.fetch(channelId).then(async (channel) => await channel
            .send({ embeds: [JoinMSG] }))
            })})}})})})})}})
            this.client.on('packet', (packet) => { logOrIgnore(packet.data.name) })
            this.client.on('spawn', (packet) => {
                console.log("Setting realmReady to true (spawn)")
                this.realmReady = true;
            })
            this.client.on('join', (packet) => {
                console.log("Setting realmReady to true (join)")
                this.realmReady = true;
            })
        }, 5000)
        setTimeout(() => {
            console.log("Debug: Checking for all-clear to send welcome message...")
            if (this.realmReady) {
                console.log("Realm is ready! Sending")
                this.client.queue('command_request', { command: `tellraw @a {"rawtext":[{"text":"§✣§l§cRealms Automod §aConnected To ${realmName}"}]}`, origin: { type: 'player', uuid: '', request_id: '', }, })
            } else {
                console.log("Realm is not ready! Waiting")
                setTimeout(() => {
                    console.log("Checking if realm is ready, 2nd time")
                    if (this.realmReady) {
                        console.log("Realm is ready! Sending")
                        this.client.queue('command_request', { command: `tellraw @a {"rawtext":[{"text":"§✣§l§cRealms Automod §aConnected To ${realmName}"}]}`, origin: { type: 'player', uuid: '', request_id: '', }, })
                    } else {
                        console.log("Realm is still not ready! Aborting welcome message")
                        process.exit(1)
                    }
                }, 5000)
            }
    }, 6000)
        const discordClient = this.discordClient;
        discordClient.login(discordToken);
        discordClient.on("ready", async () => {
            const guild = await discordClient.guilds.fetch(guildId);
            console.info("Realms Automod - Discord client ready, setting activity...");
            discordClient.user.setActivity(`over ${realmName}`, { type: "WATCHING" });
            console.info("Realms Automod - Activity set.");
            console.info(`Now bridged with Discord as ${discordClient.user.username}`);
        });

        discordClient.on("messageCreate", (message) => {
            try {
                const msgAuthor = message?.author?.username ?? null;
                if (!(message.author.id === clientId || message.content.length === 0 || [null, undefined, ""].includes(msgAuthor) || message.channel.id !== channelId)) {
                    this.onDiscordMessage(message);
                }
            } catch (e) { console.log(e) }
        });
    }

    //RealmChat To Discord
    async onRealmMessage(packet) {
        try {
            console.log(packet)
            let playerMessage = "";
            let sender = packet?.sender ?? ""
            const embedMsg = new MessageEmbed()
            .setDescription(`**<${sender}>** ${packet.message}`)
            await this.discordClient.channels
                .fetch(channelId)
                .then(async (channel) => await channel.send({ embeds: [embedMsg] }))
                .catch((error) => {
                    console.error(error);
                });
        } catch (er) { console.error(er.message) }
    }

    async onDiscordMessage(message) {
        const msgAuthor = message?.author?.username ?? "";
        let msg = message.content;
        const mentions = hasMentions(msg);
        const hasInvalid = !/^[\u0000-\u007f]*$/.test(msg);
        if (hasInvalid) {
            console.info(`Dropping message from [${msgAuthor}] with invalid characters`);
            return;
        }
        if (mentions) {
            try {
                const usrid = parseInt(mentions.replace("<@", "").replace(">", ""));
                const user = await this.discordClient.users.fetch(usrid.toString());
                msg = message.content.replace(mentions, user.username);
            } catch (e) { console.log(e) }
        }
        await this.onBroadcast(`${msg}`, msgAuthor);
    }

    async onBroadcast(messageEvent, msgAuthor) {
        if (!(this.realmReady)) {
            console.log(`Tried to broadcast to the realm before it was ready. \nCanceling message: ${messageEvent}`)
            return
        }
        let client = this.client
        let msg = `${chkMsg(messageEvent)}`;
        let nameColor = "§f"
        let maybeAuthor = ""
        let bot_name = botName
        if (msgAuthor) {
            nameColor = `§${mcColor(msgAuthor)}`;
            msg = `${msg}`;
            maybeAuthor = " from ${msgAuthor}"
        }
        if (!([null, undefined, ""].includes(client?.username))) { bot_name = client.username }

        this.client.queue('command_request', { command: `tellraw @a {"rawtext":[{"text":"§f[§9Discord§f] ${nameColor}${msgAuthor}§f: ${msg}"}]}`, origin: { type: 'player', uuid: '', request_id: '', }, })
        }}


const bot = new DiscBot()
bot.onStartup()