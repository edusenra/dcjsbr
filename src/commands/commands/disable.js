const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class DisableCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'disable',
			aliases: ['disable-command', 'cmd-off', 'command-off'],
			group: 'commands',
			memberName: 'disable',
			description: 'Desativa um comando ou grupo de comandos.',
			details: oneLine`
				O argumento deve ser o nome/ID (parcial ou total) de um comando ou grupo de comandos.
				Somente administradores podem usar este comando.
			`,
			examples: ['disable util', 'disable Utility', 'disable prefix'],
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Qual comando ou grupo você gostaria de desativar?',
					type: 'group|command'
				}
			]
		});
	}

	hasPermission(msg) {
		if(!msg.guild) return this.client.isOwner(msg.author);
		return msg.member.hasPermission('ADMINISTRATOR') || this.client.isOwner(msg.author);
	}

	run(msg, args) {
		if(!args.cmdOrGrp.isEnabledIn(msg.guild, true)) {
			return msg.reply(
				`o \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'comando' : 'grupo'} já está desativado.`
			);
		}
		if(args.cmdOrGrp.guarded) {
			return msg.reply(
				`você não pode desativar o \`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'comando' : 'grupo'}.`
			);
		}
		args.cmdOrGrp.setEnabledIn(msg.guild, false);
		return msg.reply(`\`${args.cmdOrGrp.name}\` ${args.cmdOrGrp.group ? 'comando' : 'grupo'} desativado.`);
	}
};
