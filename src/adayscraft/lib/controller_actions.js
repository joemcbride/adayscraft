(function() {
    "use strict";

    var RSVP = require('rsvp');

    // wrapper for endpoints
    // wrapper for returning json
    // wrapper for returning view
    // wrapper for redirecting

    function ControllerActions() {

        console.log('creating time');

        function create_route(fn) {

            function done (opt) {
                console.log('trying to render success', opt.model);

                if(opt.json)
                    render_json(opt.res, opt.model);
                else
                    render_view(opt.res, opt.view, opt.model);
            }

            return function (req, res) {
                fn({
                    req: req,
                    res: res,
                    done: done
                });
            }
        }

        function render_json(res, model){
            res.send(model);
        }

        function render_view(res, view, model){
            res.render(view, model);
        }

        return {
            create_route:create_route
        }
    }

    module.exports = ControllerActions

}).call(this);