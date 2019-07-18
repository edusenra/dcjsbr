const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class PingCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ping',
			group: 'util',
			memberName: 'ping',
			description: 'Verifica o ping do bot para o servidor Discord.',
			throttling: {
				usages: 5,
				duration: 10
			}
		});
	}

	async run(msg) {
		if(!msg.editable) {
			const pingMsg = await msg.reply('pinging...');
			return pingMsg.edit(oneLine`
				${msg.channel.type !== 'dm' ? `${msg.author},` : ''}
				pong! A mensagem de ida e volta levou ${pingMsg.createdTimestamp - msg.createdTimestamp}ms.
				${this.client.ping ? `A pulsação do ping é de ${Math.round(this.client.ping)}ms.` : ''}
			`);
		} else {
			await msg.edit('pinging...');
			return msg.edit(oneLine`
				pong! A mensagem de ida e volta levou ${msg.editedTimestamp - msg.createdTimestamp}ms.
				${this.client.ping ? `A pulsação do ping é de ${Math.round(this.client.ping)}ms.` : ''}
			`);
		}
	}
};
