import { Sample } from '../../api';
import Player from '../../helpers/Player';

export type Action =
    | { type: 'PLAY_SAMPLE'; sample: Sample }
    | { type: 'STOP_SAMPLE'; sample: Sample };

export const playSample = (sample: Sample): Action => {
    Player.play(sample);

    return {
        type: 'PLAY_SAMPLE',
        sample,
    };
};

export const stopSample = (sample: Sample): Action => ({
    type: 'STOP_SAMPLE',
    sample,
});
