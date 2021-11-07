const Discord = require('discord.js');
const config = require('../../configs/config.json');
const AmeClient = require('amethyste-api');
const AmeAPI = new AmeClient(config.AME_API);


module.exports = {
    name: 'respect',
    category: "Images",
    description: 'Editing image and send respect one!',
    aliases: [""],
    usage: 'respect',
    cooldown: 1,
    memberpermissions: [],
    requiredroles: [],
    alloweduserids: [],

    run: async (client, message, args) => {

        let user = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
        let m = await message.channel.send({
            content: "**Please Wait...**"
        });
        let buffer = await AmeAPI.generate("missionpassed", {
            url: user.user.displayAvatarURL({
                format: "png",
                size: 2048
            })
        });
        let attachment = new Discord.MessageAttachment(buffer, "respect.png");
        setTimeout(() => m.delete(), 1000);
        message.channel.send({
            files: [attachment]
        });
    }
}