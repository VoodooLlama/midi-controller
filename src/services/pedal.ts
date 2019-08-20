import { IPedal } from '../state/pedal';
import { useInfoLog } from '../hooks/useLog';
import pedalExampleJSON from '../../devices.json';

interface IPedalJSONSchema {
    devices: IPedal[];
}

export function retrievePedalData(): Promise<IPedalJSONSchema> {
    useInfoLog('Retrieving stored target device config data!');

    return Promise.resolve(pedalExampleJSON);
}
