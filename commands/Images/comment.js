const Discord = require('discord.js');
const canvacord = require('canvacord');

module.exports = {
    name: 'comment',
    category: "Images",
    description: 'Shows your text as a Youtube Comment',
    aliases: ["comment"],
    usage: '<text>',
    cooldown: 1,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],

    run: async (client, message, args) => {
        const comment = args.join('');
        if (!comment) return message.channel.send({
            content: `${client.emotes.error} Provide something to Comment!`
        })
        try {
            let yt = await canvacord.Canvas.youtube({
                "avatar": message.author.displayAvatarURL({
                    format: "png"
                }),
                "username": message.author.username,
                "content": args.join(" ")
            })
            let attachment = new Discord.MessageAttachment(yt, 'comment.png')
            message.channel.send({
                files: [attachment]
            });
        } catch (err) {
            const embed2 = new Discord.MessageEmbed()
                .setTitle(`${client.emotes.error} Something went wrong.\n${client.emotes.error}Note : It won't work if the User contains Unwanted characters in his Username.`)
                .setColor("RED")
            message.channel.send({
                embeds: [embed2]
            })
        }

    }
}