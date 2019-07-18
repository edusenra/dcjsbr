const { oneLine } = require('common-tags');
const Command = require('../base');

module.exports = class ReloadCommandCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reload',
			aliases: ['reload-command'],
			group: 'commands',
			memberName: 'reload',
			description: 'Recarrega um comando ou grupo de comandos.',
			details: oneLine`
				O argumento deve ser o nome/ID (parcial ou total) de um comando ou grupo de comandos.
				O fornecimento de um grupo de comandos recarregará todos os comandos desse grupo.
				Somente o(s) proprietário(s) do bot pode usar este comando.
			`,
			examples: ['reload some-command'],
			ownerOnly: true,
			guarded: true,

			args: [
				{
					key: 'cmdOrGrp',
					label: 'command/group',
					prompt: 'Qual comando ou grupo você gostaria de recarregar?',
					type: 'group|command'
				}
			]
		});
	}

	async run(msg, args) {
		const { cmdOrGrp } = args;
		const isCmd = Boolean(cmdOrGrp.groupID);
		cmdOrGrp.reload();

		if(this.client.shard) {
			try {
				await this.client.shard.broadcastEval(`
					if(this.shard.id !== ${this.client.shard.id}) {
						this.registry.${isCmd ? 'commands' : 'groups'}.get('${isCmd ? cmdOrGrp.name : cmdOrGrp.id}').reload();
					}
				`);
			} catch(err) {
				this.client.emit('warn', `Erro ao recarregar o comando para recarregar outros shards`);
				this.client.emit('error', err);
				if(isCmd) {
					await msg.reply(`comando \`${cmdOrGrp.name}\` recarregado, mas não foi possível recarregar em outros shards.`);
				} else {
					await msg.reply(
						`todos os comandos recarregados no \`${cmdOrGrp.name}\` grupo, mas não foi possível recarregar em outros shards.`
					);
				}
				return null;
			}
		}

		if(isCmd) {
			await msg.reply(`comando \`${cmdOrGrp.name}\` recarregado${this.client.shard ? ' em todos shards' : ''}.`);
		} else {
			await msg.reply(
				`todos os comandos recarregados no \`${cmdOrGrp.name}\` grupo${this.client.shard ? ' em todos shards' : ''}.`
			);
		}
		return null;
	}
};
