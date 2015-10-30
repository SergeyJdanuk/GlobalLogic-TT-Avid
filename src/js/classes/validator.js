/**
 * Created by sergiyjdanuk on 10/30/15.
 */

function Validator() {
    this._errors = [];
}
Validator.messages = function (field, rule) {
    return {
        not_empty: 'The field "' + field + '" must not be empty',
        email: 'The field "' + field + '" must be an email',
        reg: 'The field "' + field + '" must be a valid regular expression ' + rule
    }
};
Validator.prototype.addError = function(rule, field, raw) {
    var messages = Validator.messages(field, raw);
    this._errors.push(messages[rule]);
};
Validator.prototype.not_empty = function(value) {
    return value;
};
Validator.prototype.email = function(value) {
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    return pattern.test(value);
};
Validator.prototype.reg = function(pattern, value) {
    return pattern.test(value);
};

Validator.prototype.check = function(rule, field, value) {
    if (rule instanceof RegExp) {
        if (!this.reg(rule, value))
            this.addError('reg', field, rule);
    }
    else if (!this[rule](value)) {
        this.addError(rule, field);
    }
};
Validator.prototype.errors = function () {
    return this._errors.length == 0 ? false : this._errors;
};

module.exports = Validator;