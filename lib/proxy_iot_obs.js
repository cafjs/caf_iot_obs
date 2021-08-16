/*!
Copyright 2021 Caf.js Labs and contributors

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

'use strict';

/**
 * A proxy to access OBS services.
 *
 * @module caf_iot_obs/proxy_iot_obs
 * @augments external:caf_components/gen_proxy
 *
 */
const caf_iot = require('caf_iot');
const caf_comp = caf_iot.caf_components;
const genProxy = caf_comp.gen_proxy;

/**
 * Factory method to access external HTTP services.
 *
 * @see caf_components/supervisor
 */
exports.newInstance = async function($, spec) {
    try {
        const that = genProxy.create($, spec);

        /**
         * Connects to an OBS instance.
         *
         * @param {string=} address The websocket address, e.g., localhost:4444
         * @param {string=} password The OBS password.
         *
         * @return {Promise.<string>} A promise to `await` for connection. It
         * resolves to the current scene name or an error.
         *
         * @memberof! module:caf_iot_obs/proxy_iot_obs#
         * @alias connect
         */
        that.connect = function(address, password) {
            return $._.connect(address, password);
        };

        /**
         * Disconnects from an OBS instance.
         *
         * @memberof! module:caf_iot_obs/proxy_iot_obs#
         * @alias connect
         */
        that.disconnect = function() {
            return $._.disconnect();
        };

        /**
         * Sets the current scene
         *
         * @param {string} name The name of the scene.
         *
         * @return {String}  A request id to match responses.
         *
         * @memberof! module:caf_iot_obs/proxy_iot_obs#
         * @alias setCurrentScene
         */
        that.setCurrentScene = function(name) {
            return $._.setCurrentScene(name);
        };

        /**
         * Gets the current scene name
         *
         * @return {String}  The current scene name.
         *
         * @memberof! module:caf_iot_obs/proxy_iot_obs#
         * @alias getCurrentScene
         */
        that.getCurrentScene = function() {
            return $._.getCurrentScene();
        };

        /**
         * Gets the pre-configured OBS scenes.
         *
         * @return {Array.<string>} An array with the names of the OBS scenes.
         *
         * @memberof! module:caf_iot_obs/proxy_iot_obs#
         * @alias getScenes
         *
         */
        that.getScenes = function() {
            return $._.getScenes();
        };

        /**
         * Reloads scenes.
         *
         * @return {Promise.<string>} A promise to `await` for reloading. It
         * resolves to the current scene name or an error.
         *
         * @memberof! module:caf_iot_obs/proxy_iot_obs#
         * @alias reloadScenes
         *
         */
        that.reloadScenes = function() {
            return $._.reloadScenes();
        };

       /**
         * Sets the name of the method that process a scene changed event.
         *
         * To ignore replies, just set it to `null` (the default).
         *
         * The type of the method is `async function(name:string)`
         *
         * where:
         *
         *  *  `name`: is the name of current scene.
         *
         * @param {string|null} methodName The name of this CA's method that
         *  process scenes updates.
         *
         * @memberof! module:caf_iot_obs/proxy_iot_obs#
         * @alias setHandleSceneChanged
         *
         */
        that.setHandleSceneChanged = function(methodName) {
            $._.setHandleSceneChanged(methodName);
        };

        Object.freeze(that);
        return [null, that];
    } catch (err) {
        return [err];
    }
};
