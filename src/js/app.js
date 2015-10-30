/**
 * Created by sergiyjdanuk on 10/30/15.
 */
var UserDictionary = require('./components/users/dictionary');

$(function() {
    var dictionary = new UserDictionary();
    dictionary.on('error', onErrorHandler);
    dictionary.on('add', onAddHandler);

    //////////////////////////////////////////////////////
    // Just add some data
    dictionary.add({
        name: 'Sergey Jdanuk',
        phoneNumber: '098 104 01 01',
        email: 'jdanuk@gmail.com',
        homeSiteUrl: 'http://google.com'
    });

    //////////////////////////////////////////////////////
    function onErrorHandler(errors) {
        $('#errorModalDialog .modal-body').html(errors.join('<br />'));
        $('#errorModalDialog').modal();
    }

    //////////////////////////////////////////////////////
    function onAddHandler(data) {
        var row = $('#users-list-row').text();
        var replacement = [
            ['{id}', data.id],
            ['{name}', data.name],
            ['{phoneNumber}', data.phoneNumber],
            ['{email}', data.email],
            ['{homeSiteUrl}', data.homeSiteUrl]
        ];

        replacement.forEach(function (v, i, a) {
            row = row.replace(v[0], v[1]);
        });

        $('#users-list tbody').append(row);
        $('#tab-users a[href="#tab-users-list"]').tab('show') // Select tab by name
    }

    //////////////////////////////////////////////////////
    $('form').submit(function(e) {
        e.preventDefault();
        var data = $(this).serializeArray();

        // send ajax request...

        var id = 'xxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });

        data.push({name: 'id', value: id});
        dictionary.add(data);

        $('form')[0].reset();
    })
});

