const ArgumentType = require('./base');

class StringArgumentType extends ArgumentType {
	constructor(client) {
		super(client, 'string');
	}

	validate(value, msg, arg) {
		if(arg.oneOf && !arg.oneOf.includes(value.toLowerCase())) return false;
		if(arg.min !== null && typeof arg.min !== 'undefined' && value.length < arg.min) {
			return `Por favor, mantenha o ${arg.label} acima ou exatamente ${arg.min} caracteres.`;
		}
		if(arg.max !== null && typeof arg.max !== 'undefined' && value.length > arg.max) {
			return `Por favor, mantenha o ${arg.label} abaixo ou exatamente ${arg.max} caracteres.`;
		}
		return true;
	}

	parse(value) {
		return value;
	}
}

module.exports = StringArgumentType;
