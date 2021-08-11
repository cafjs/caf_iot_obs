"use strict";
const caf = require('caf_core');
const caf_comp = caf.caf_components;
const myUtils = caf_comp.myUtils;

const MARGIN = 100;

const sendBundle = function(self, bundle) {
    self.$.iot.sendBundle(bundle);
    self.$.session.notify(['doit'], 'iot');
};

exports.methods = {
    async __ca_init__() {
        this.state.trace__iot_sync__ = 'traceSync';
        return [];
    },

    async setCurrentScene(name) {
        const bundle = this.$.iot.newBundle(MARGIN);
        bundle.setCurrentScene(0, [name]);
        sendBundle(this, bundle);
        return [];
    },

    async getState() {
        return [null, this.state];
    },

    async traceSync() {
        console.log('.');
        const $$ = this.$.sharing.$;
        this.state.currentScene = $$.toCloud.get('currentScene');
        this.state.scenes = $$.toCloud.get('scenes');
        return [];
    }
};
