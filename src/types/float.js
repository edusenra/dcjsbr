const ArgumentType = require('./base');

class FloatArgumentType extends ArgumentType {
	constructor(client) {
		super(client, 'float');
	}

	validate(value, msg, arg) {
		const float = Number.parseFloat(value);
		if(Number.isNaN(float)) return false;
		if(arg.oneOf && !arg.oneOf.includes(float)) return false;
		if(arg.min !== null && typeof arg.min !== 'undefined' && float < arg.min) {
			return `Por favor, insira um número acima ou exatamente ${arg.min}.`;
		}
		if(arg.max !== null && typeof arg.max !== 'undefined' && float > arg.max) {
			return `Por favor, insira um número abaixo ou exatamente ${arg.max}.`;
		}
		return true;
	}

	parse(value) {
		return Number.parseFloat(value);
	}
}

module.exports = FloatArgumentType;
