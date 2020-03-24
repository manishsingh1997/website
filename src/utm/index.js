import config from 'website/config';
import {processIncomingUTMs} from '@ergeon/erg-utms';

processIncomingUTMs(config.websiteDomain);
