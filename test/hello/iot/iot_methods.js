/*!
Copyright 2021  Caf.js Labs and contributors

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

"use strict";


exports.methods = {
    '__iot_setup__' : function(cb) {
        this.state.lastValue = null;
        this.state.streamID = null;
        cb(null);
    },

    '__iot_loop__' : function(cb) {
        var now = (new Date()).getTime();
        this.$.log && this.$.log.debug(now + ' loop:');
        this.toCloud.set('in', this.state.lastValue);
        cb(null);
    },

    'dirtyCall' : function(url, options, cb) {
        var self = this;
        this.$.http.dirtyCall(url, options, function(err, value) {
            self.$.log && self.$.log.debug(value);
            cb(err, value);
        });
    },

    'startStream' : function(url, options, cb) {
        this.state.streamID = this.$.http.startStream(url, options,
                                                      '__iot_handle_http__');
        cb(null);
    },

    'stopStream' : function(cb) {
        this.$.http.stopStream(this.state.streamID);
        cb(null);
    },

    '__iot_handle_http__' : function(obj, cb) {
        this.$.log && this.$.log.debug(obj);
        this.state.lastValue = obj;
        cb(null);
    }

};
