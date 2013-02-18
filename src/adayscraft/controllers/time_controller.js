(function() {
    "use strict";

    var ControllerActions = require('../lib/controller_actions');

    function TimeController() {
        var actions;

        actions = new ControllerActions();

        console.log('creating time');

        function index(params){
            console.log('time route');

            var opt = {
                json: true,
                view: 'time',
                model: {
                    title: 'Times 2'
                },
                res: params.res
            };

            params.done(opt);
        }

        function init($app) {

            $app.get('/time', actions.create_route(index));
        }

        return {
            init: init
        }
    }

    module.exports = TimeController

}).call(this);