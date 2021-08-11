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
    async __iot_setup__() {
        this.state.currentScene =  this.$.obs.getCurrentScene();
        this.$.obs.setHandleSceneChanged('__iot_handle_change_scene');
        return [];
    },

    async __iot_loop__() {
        const now = (new Date()).getTime();
        this.$.log && this.$.log.debug(now + ' loop:');
        this.toCloud.set('currentScene', this.state.currentScene);
        this.toCloud.set('scenes', this.$.obs.getScenes());
        return [];
    },

    async setCurrentScene(name) {
        this.$.obs.setCurrentScene(name);
        return [];
    },

    async __iot_handle_change_scene(name) {
        this.$.log && this.$.log.debug(`Change scene to ${name}`);
        this.state.currentScene = name;
        return [];
    }

};
