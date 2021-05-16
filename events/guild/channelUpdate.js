const firebase = require("firebase");

module.exports = function (client, oldChannel, newChannel) {
    let guildId = newChannel.guild.id;

    let database = firebase.database();
    let ref = database.ref("Shioru/apps/discord/guilds").child(guildId);

    ref.child("config/notification").once("value").then(function (snapshot) {
        if (snapshot.exists()) {
            let notifyId = snapshot.val().channelUpdate;

            if (notifyId) {
                let guild = client.guilds.cache.find(servers => servers.id === guildId);
                let notification = guild.channels.cache.find(channels => channels.id === notifyId);
                notification.send({
                    "embed": {
                        "description": "> " + client.lang.event_guild_channelUpdate_embed_description.replace("%oldChannel", oldChannel.name).replace("%newChannel", newChannel.id),
                        "timestamp": new Date(),
                        "color": 4886754,
                        "footer": {
                            "text": client.lang.event_guild_channelCreate_embed_footer_text
                        },
                        "author": {
                            "name": client.lang.event_guild_notification_way_system,
                            "icon_url": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/bell_1f514.png"
                        }
                    }
                });
            }
        } else {
            ref.child("config/notification").update({
                "channelUpdate": 0
            }).then(function () {
                module.exports(client, message, args);
            });
        }
    });
};