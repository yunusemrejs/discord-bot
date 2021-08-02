const Discord = require("discord.js");
const client = new Discord.Client();
const MessageEmbed = new Discord.MessageEmbed();
const guild = new Discord.Guild();
const prefix = "!!";
const girisRoleID = "846429633486520351";
const uyeRoleID = "846429626372194346";
let komutlar = {
	gunaydinmsg: "günaydın",
	gecemsg: "iyi uykular",
};
client.on("ready", () => {
	client.user.setActivity("Created by Adderall", {
		type: "STREAMING",
	});
});
client.on("message", (message) => {
	var mesaj = message.content.toLowerCase();
	if (
		/*komutlar*/
		mesaj.startsWith("!!") /* mesaj !! ile başlıyosa */ &&
		!message.author.bot /*mesajı yazan bot değilse */
	) {
		if (mesaj.startsWith(prefix + "avatar")) {
			const user = message.mentions.users.first() || message.author;
			const avatarEmbed = MessageEmbed.setColor("RANDOM")
				.setAuthor(user.username)
				.setImage(
					`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=512`
				);
			message.channel.send(avatarEmbed);
		} else if (mesaj.startsWith(prefix + "kayıt")) {
			if (
				message.member.hasPermission("MANAGE_ROLES") ||
				message.member.hasPermission("ADMINISTRATOR")
			) {
				kayitYapilacak = message.mentions.members.first();
				kayitYapilacak.roles.remove(girisRoleID);
				kayitYapilacak.roles.add(uyeRoleID);
				message.reply(
					message.mentions.members.first().user.username +
						" başarıyla kayıt edildi"
				);
			} else {
				message.reply("Bu işlemi gerçekleştirmek için yetkin yok");
			}
		} else if (mesaj.startsWith(prefix + "etkinlik")) {
			guild.members.cache.forEach(async (member) => {
				member
					.send("deneme")
					.catch((e) => console.error(`Couldn't DM member ${member.user.tag}`));
			});
			//etkinlik mesajını her kullanıcıya iletme
		}
	} else if (mesaj == "günaydın") {
		message.channel.send(komutlar.gunaydinmsg);
	} else if (mesaj == "iyi geceler") {
		message.channel.send(komutlar.gecemsg);
	} else if (mesaj == "emre" || mesaj == "adderall") {
		message.channel.send("Yaratıcımı tanıyın");
	} 
});

client.login("ODQ2NDA1NDc4MjY2ODMwOTE5.YKvChw.5I0wFjxSqpv60JvakA68PkYhs8w");
