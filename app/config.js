import {format} from 'util';
import {join} from 'path';
import {argv} from 'yargs';

var config = {
    get production() {
        return process.env.NODE_ENV == 'production' || argv.production === true;
    },
    port: 3000,
    path: {
        get base() {
            return join(__dirname, '..');
        },

        static: {
            get base() {
                return join(config.path.base, 'static');
            },

            get production() {
                return join(config.path.static.base, 'production');
            },

            get development() {
                return join(config.path.static.base, 'development');
            },

            get env() {
                return config.production ? config.path.static.production : config.path.static.development;
            }
        }
    }
}


export default config;
