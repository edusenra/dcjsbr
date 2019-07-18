const ArgumentType = require('./base');

class IntegerArgumentType extends ArgumentType {
	constructor(client) {
		super(client, 'integer');
	}

	validate(value, msg, arg) {
		const int = Number.parseInt(value);
		if(Number.isNaN(int)) return false;
		if(arg.oneOf && !arg.oneOf.includes(int)) return false;
		if(arg.min !== null && typeof arg.min !== 'undefined' && int < arg.min) {
			return `Por favor, insira um número acima ou exatamente ${arg.min}.`;
		}
		if(arg.max !== null && typeof arg.max !== 'undefined' && int > arg.max) {
			return `Por favor, insira um número abaixo ou exatamente ${arg.max}.`;
		}
		return true;
	}

	parse(value) {
		return Number.parseInt(value);
	}
}

module.exports = IntegerArgumentType;
