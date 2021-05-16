const firebase = require("firebase");

module.exports = function (client, member) {
	let guildId = member.guild.id;

    let database = firebase.database();
    let ref = database.ref("Shioru/apps/discord/guilds").child(guildId);

    ref.child("config/notification").once("value").then(function (snapshot) {
        if (snapshot.exists()) {
            let notifyId = snapshot.val().guildMemberAdd;

            if (notifyId) {
				let notification = member.guild.channels.cache.find(channels => channels.id === notifyId);
				if (member.user.bot) return;
                notification.send({
                    "embed": {
                        "title": member.user.tag,
                        "description": client.lang.event_guild_guildMemberAdd_embed_description,
                        "timestamp": new Date(),
                        "color": 16777215,
                        "thumbnail": {
                            "url": member.user.displayAvatarURL(),
                        },
                        "author": {
                            "name": client.lang.event_guild_guildMemberAdd_embed_author_name,
                            "icon_url": "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/209/video-game_1f3ae.png",
                        }
                    }
                });
            }
        } else {
            ref.child("config/notification").update({
                "guildMemberAdd": 0
            }).then(function () {
                module.exports(client, message, args);
            });
        }
    });
};