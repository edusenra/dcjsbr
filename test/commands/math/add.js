const commando = require('../../../src');
const oneLine = require('common-tags').oneLine;

module.exports = class AddNumbersCommand extends commando.Command {
	constructor(client) {
		super(client, {
			name: 'add-numbers',
			aliases: ['add', 'add-nums'],
			group: 'math',
			memberName: 'add',
			description: 'Adiciona números juntos.',
			details: oneLine`
				Este é um comando incrivelmente útil que encontra a soma dos números.
				Este comando é a inveja de todos os outros comandos.
			`,
			examples: ['add-numbers 42 1337'],

			args: [
				{
					key: 'numbers',
					label: 'number',
					prompt: 'Quais números você gostaria de adicionar? Cada mensagem que você enviar será interpretada como um único número.',
					type: 'float',
					infinite: true
				}
			]
		});
	}

	async run(msg, args) {
		const total = args.numbers.reduce((prev, arg) => prev + parseFloat(arg), 0);
		return msg.reply(`${args.numbers.join(' + ')} = **${total}**`);
	}
};
