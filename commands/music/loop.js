module.exports.run = function (client, message, args) {
    let serverQueue = message.client.data.get(message.guild.id);
    let queueOwner = serverQueue.require.username;
    
    if (!serverQueue) return message.reply(client.lang.command_music_loop_no_queue);
    if (queueOwner !== message.author.username) return message.reply(client.lang.command_music_loop_check_not_owner);
    
    serverQueue.loop = !serverQueue.loop;
    serverQueue.textChannel.send(client.lang.command_music_loop_queue_loop.replace("%boolean", (serverQueue.loop ? client.lang.command_music_loop_queue_loop_true : client.lang.command_music_loop_queue_loop_false)));
};

module.exports.help = {
    "name": "loop",
    "description": "Toggle music loop",
    "usage": "loop",
    "category": "music",
    "aliases": ["lp", "วน"],
    "permissions": ["SEND_MESSAGES", "CONNECT"]
};