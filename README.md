# Caf.js

Co-design cloud assistants with your web app and IoT devices.

See https://www.cafjs.com

## IoT Library for accessing the OBS websocket API

A library to access OBS using a local websocket

It runs in the device not in the cloud.

## API

    lib/proxy_iot_obs.js

## Configuration Example

### iot.json

```
    {
            "module": "caf_iot_obs#plug_iot",
            "name": "obs",
            "description": "Access OBS services.",
            "env" : {
                "maxRetries" : "$._.env.maxRetries",
                "retryDelay" : "$._.env.retryDelay",
                "obsAddress" : "process.env.OBS_ADDRESS||localhost:4444",
                "obsPassword" : "process.env.OBS_PASSWORD||obs"
            },
            "components" : [
                {
                    "module": "caf_iot_obs#proxy_iot",
                    "name": "proxy",
                    "description": "Proxy to access OBS services",
                    "env" : {
                    }
                }
            ]
    }
```
