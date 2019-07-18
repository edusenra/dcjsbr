const stripIndents = require('common-tags').stripIndents;
const commando = require('../../../src');

module.exports = class UserInfoCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'user-info',
			aliases: ['user', '🗒'],
			group: 'util',
			memberName: 'user-info',
			description: 'Obtém informações sobre um usuário.',
			examples: ['user-info @Crawl#3208', 'user-info Crawl'],
			guildOnly: true,
			args: [
				{
					key: 'member',
					label: 'user',
					prompt: 'Em qual usuário você gostaria de espionar?',
					type: 'member'
				}
			]
		});
	}

	async run(msg, args) {
		const member = args.member;
		const user = member.user;
		return msg.reply(stripIndents`
			Info sobre **${user.username}#${user.discriminator}** (ID: ${user.id})

			**❯ Detalhes do membro**
			${member.nickname !== null ? ` • Apelido: ${member.nickname}` : ' • Nenhum apelido'}
			 • Roles: ${member.roles.map(roles => `\`${roles.name}\``).join(', ')}
			 • Registrado em: ${member.joinedAt}

			**❯ Detalhes do usuario**
			 • Criado em: ${user.createdAt}${user.bot ? '\n • É uma conta de bot' : ''}
			 • Status: ${user.presence.status}
			 • Game: ${user.presence.game ? user.presence.game.name : 'Nenhum'}
		`);
	}
};
