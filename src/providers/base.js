/* eslint-disable no-unused-vars, valid-jsdoc */
const { Guild } = require('discord.js');

/**
 * Loads and stores settings associated with guilds
 * @abstract
 */
class SettingProvider {
	constructor() {
		if(this.constructor.name === 'SettingProvider') throw new Error('O SettingProvider base não pode ser instanciado.');
	}

	/**
	 * Initialises the provider by connecting to databases and/or caching all data in memory.
	 * {@link CommandoClient#setProvider} will automatically call this once the client is ready.
	 * @param {CommandoClient} client - Client that will be using the provider
	 * @return {Promise<void>}
	 * @abstract
	 */
	init(client) { throw new Error(`${this.constructor.name} não tem um método init.`); }

	/**
	 * Destroys the provider, removing any event listeners.
	 * @return {Promise<void>}
	 * @abstract
	 */
	destroy() { throw new Error(`${this.constructor.name} não tem um método destroy.`); }

	/**
	 * Obtains a setting for a guild
	 * @param {Guild|string} guild - Guild the setting is associated with (or 'global')
	 * @param {string} key - Name of the setting
	 * @param {*} [defVal] - Value to default to if the setting isn't set on the guild
	 * @return {*}
	 * @abstract
	 */
	get(guild, key, defVal) { throw new Error(`${this.constructor.name} não tem um método get.`); }

	/**
	 * Sets a setting for a guild
	 * @param {Guild|string} guild - Guild to associate the setting with (or 'global')
	 * @param {string} key - Name of the setting
	 * @param {*} val - Value of the setting
	 * @return {Promise<*>} New value of the setting
	 * @abstract
	 */
	set(guild, key, val) { throw new Error(`${this.constructor.name} não tem um método set.`); }

	/**
	 * Removes a setting from a guild
	 * @param {Guild|string} guild - Guild the setting is associated with (or 'global')
	 * @param {string} key - Name of the setting
	 * @return {Promise<*>} Old value of the setting
	 * @abstract
	 */
	remove(guild, key) { throw new Error(`${this.constructor.name} não tem um método remove.`); }

	/**
	 * Removes all settings in a guild
	 * @param {Guild|string} guild - Guild to clear the settings of
	 * @return {Promise<void>}
	 * @abstract
	 */
	clear(guild) { throw new Error(`${this.constructor.name} não tem um método clear.`); }

	/**
	 * Obtains the ID of the provided guild, or throws an error if it isn't valid
	 * @param {Guild|string} guild - Guild to get the ID of
	 * @return {string} ID of the guild, or 'global'
	 */
	static getGuildID(guild) {
		if(guild instanceof Guild) return guild.id;
		if(guild === 'global' || guild === null) return 'global';
		if(typeof guild === 'string' && !isNaN(guild)) return guild;
		throw new TypeError('Guilda especificada inválida. Deve ser uma instância da guilda, ID da guilda, "global" ou null.');
	}
}

module.exports = SettingProvider;
