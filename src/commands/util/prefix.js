const { stripIndents, oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class PrefixCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'prefix',
			group: 'util',
			memberName: 'prefix',
			description: 'Mostra ou define o prefixo do comando.',
			format: '[prefix/"default"/"none"]',
			details: oneLine`
				Se nenhum prefixo for fornecido, o prefixo atual será mostrado.
				Se o prefixo for "default", o prefixo será redefinido para o prefixo padrão do bot.
				Se o prefixo for "none", o prefixo será removido inteiramente, permitindo apenas menções para executar comandos.
				Only administrators may change the prefix.
			`,
			examples: ['prefix', 'prefix -', 'prefix omg!', 'prefix default', 'prefix none'],

			args: [
				{
					key: 'prefix',
					prompt: 'Você gostaria de definir o prefixo do bot para?',
					type: 'string',
					max: 15,
					default: ''
				}
			]
		});
	}

	async run(msg, args) {
		// Just output the prefix
		if(!args.prefix) {
			const prefix = msg.guild ? msg.guild.commandPrefix : this.client.commandPrefix;
			return msg.reply(stripIndents`
				${prefix ? `o prefixo de comando é \`${prefix}\`.` : 'Não há prefixo de comando.'}
				Para executar comandos, use ${msg.anyUsage('command')}.
			`);
		}

		// Check the user's permission before changing anything
		if(msg.guild) {
			if(!msg.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(msg.author)) {
				return msg.reply('somente administradores podem alterar o prefixo do comando.');
			}
		} else if(!this.client.isOwner(msg.author)) {
			return msg.reply('somente o(s) proprietário(s) do bot pode alterar o prefixo do comando global.');
		}

		// Save the prefix
		const lowercase = args.prefix.toLowerCase();
		const prefix = lowercase === 'none' ? '' : args.prefix;
		let response;
		if(lowercase === 'default') {
			if(msg.guild) msg.guild.commandPrefix = null; else this.client.commandPrefix = null;
			const current = this.client.commandPrefix ? `\`${this.client.commandPrefix}\`` : 'sem prefixo';
			response = `redefinido o prefixo do comando para o padrão (atualmente ${current}).`;
		} else {
			if(msg.guild) msg.guild.commandPrefix = prefix; else this.client.commandPrefix = prefix;
			response = prefix ? `definido o prefixo do comando para \`${args.prefix}\`.` : 'Removido completamente o prefixo de comando.';
		}

		await msg.reply(`${response} Para executar comandos, use ${msg.anyUsage('command')}.`);
		return null;
	}
};
