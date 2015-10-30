/**
 * Created by sergiyjdanuk on 10/30/15.
 */

var Validator = require('../../classes/validator');

function UserModel(data) {
    this.data = data;
}
UserModel.prototype.rules = function () {
    return {
        'name':         ['not_empty'],
        'phoneNumber':  ['not_empty'],
        'email':        ['not_empty', 'email'],
        'homeSiteUrl':  ['not_empty', /^http:\/\//]
    }
};
UserModel.prototype.validate = function () {
    var validator = new Validator();
    var rules = this.rules();

    for (var name in rules)
    {
        var itemRules = rules[name];
        var itemValue = this.data[name];

        for (var i=0;i<itemRules.length;i++)
            validator.check(itemRules[i], name, itemValue);
    }

    return validator.errors();
};

module.exports = UserModel;