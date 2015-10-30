/**
 * Created by sergiyjdanuk on 10/29/15.
 */
var UserModel = require('./model');

function Dictionary() {
    this.collection = [];
    this.events = {};
}
Dictionary.prototype.on = function(fn, callback){
    this.events[fn] = callback;
};
Dictionary.prototype.fire = function(event, params){
    if (this.events[event] instanceof Function)
        this.events[event].apply(this, params);
};
Dictionary.prototype.add = function(userData) {
    var data = userData;

    if (userData instanceof Array) {
        data = {};
        for(var i = 0; i < userData.length; i++)
            data[userData[i].name] = userData[i].value;
    }

    var user = new UserModel(data);

    var errors = user.validate();

    if (errors === false) {
        this.collection.push(user);
        this.fire('add', [data]);
    }
    else
        this.fire('error', [errors]);


};

module.exports = Dictionary;
