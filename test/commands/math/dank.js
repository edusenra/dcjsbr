const commando = require('../../../src');

module.exports = class DankCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'dank',
			group: 'math',
			memberName: 'dank',
			description: 'Verifica se o argumento fornecido é dank.',

			args: [
				{
					key: 'dank',
					label: 'dank',
					prompt: 'Diga dank.',
					type: 'dank'
				}
			]
		});
	}

	run(msg, { dank }) {
		return msg.reply(dank);
	}
};
