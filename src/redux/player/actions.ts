import { Sample } from '../../api';

export type Action =
    | { type: 'PLAY_SAMPLE'; sample: Sample }
    | { type: 'STOP_SAMPLE'; sample: Sample };

export const playSample = (sample: Sample): Action => ({
    type: 'PLAY_SAMPLE',
    sample,
});

export const stopSample = (sample: Sample): Action => ({
    type: 'STOP_SAMPLE',
    sample,
});
