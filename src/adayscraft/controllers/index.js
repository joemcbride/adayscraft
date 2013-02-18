(function() {
    "use strict";

    var fs   = require('fs')
      , path = require('path')
      , _    = require('underscore');

    function Controller($app){
        var _this, cache;

        cache = {};

        function controller(name){
            var file, ctrl;

            console.log('getting ctrl', name);

            if('undefined' == typeof cache[name]) {
                file = path.join(__dirname, name + '_controller.js');
                ctrl = require(file);
                cache[name] = new ctrl();
            }

            return cache[name];
        }

        function load_controllers() {
            var name, names, ctrl;

            console.log('load_controllers');

            fs.readdir(__dirname, function(err, files){
                names = [];
                for (var i=0, l=files.length; i<l; i++) {
                    name = files[i].split('_').shift();

                    // ignore index file
                    if(name.indexOf('index') >= 0)
                        continue;

                    names.push(name);
                    controller(name);
                }

                // looping through a second time to call init.
                // Cache each controller first then initialize; this allows usage
                // of a controller within a controller
                for (var i=0, l=names.length; i<l; i++) {
                    ctrl = controller(name);
                    ctrl.init($app);
                }
            });
        }

        function init() {
            console.log('init');
            load_controllers();
        }

        return {
            init: init,
            controller: controller
        }
    }

    module.exports = Controller
}).call(this);