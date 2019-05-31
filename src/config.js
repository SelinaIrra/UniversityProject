const yaml = require('js-yaml');
const fs = require('fs');

let SETTINGS = null;
const FILES = ['config.yml', 'config.local.yml'];

function load_settings() {
    if (!SETTINGS) {
        SETTINGS = {};
        for (let filename of FILES) {
            try {
                const doc = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
                console.log(`Loading config from ${filename}`);
                SETTINGS = {
                    ...SETTINGS,
                    ...doc
                };
            } catch {
            }
        }
    }
    return SETTINGS;
}

module.exports = load_settings();