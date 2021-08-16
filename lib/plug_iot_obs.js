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
 *  Provides access to OBS services.
 *
 * @module caf_iot_obs/plug_iot_obs
 * @augments external:caf_iot/gen_plug_iot
 *
 */
const assert = require('assert');
const caf_iot = require('caf_iot');
const myUtils = caf_iot.caf_components.myUtils;
const genPlugIoT = caf_iot.gen_plug_iot;
const util = require('util');
const OBSWebSocket = require('obs-websocket-js');

exports.newInstance = async function($, spec) {
    try {
        const that = genPlugIoT.create($, spec);
        let scenes = [];
        let methodName = null;
        let currentScene = '';

        assert.equal(typeof spec.env.obsAddress, 'string',
                     "'spec.env.obsAddress' not a string");

        assert.equal(typeof spec.env.obsPassword, 'string',
                     "'spec.env.obsPassword' not a string");

        $._.$.log && $._.$.log.debug('New OBS plug');

        const obs = new OBSWebSocket();

        obs.on('SwitchScenes', data => {
            currentScene = data.sceneName;
            methodName && $._.$.queue.process(methodName, [currentScene],
                                              {noSync: false});
        });

        that.setCurrentScene = (name) => {
            obs.send('SetCurrentScene', {'scene-name': name});
        };

        that.getCurrentScene = () => currentScene;

        that.getScenes = () => scenes.slice(0);

        that.reloadScenes = async () =>  {
            const data = await obs.send('GetSceneList');
            currentScene = data.currentScene;
            scenes = (data.scenes || []).map(x => x.name);
            return currentScene;
        };

        that.setHandleSceneChanged = (method) => methodName = method;

        that.connect = async (address, password) => {
            that.disconnect();
            address = address || spec.env.obsAddress;
            password = password || spec.env.obsPassword;
            await obs.connect({address, password});
            return that.reloadScenes();
        };

        that.disconnect = () => {
            obs.disconnect();
            scenes = [];
            currentScene = '';
        };

        return [null, that];
    } catch (err) {
        return [err];
    }
};
