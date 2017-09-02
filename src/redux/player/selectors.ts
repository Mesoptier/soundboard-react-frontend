import { createSelector } from 'reselect';

import { State } from '../';
import { Sample } from '../../api';

export const getPlaying = (state: State) => state.player.playing;

export const isSamplePlaying = createSelector(
    getPlaying,
    (state: State, props: { sample: Sample }) => props.sample,
    (playing: Sample[], sample: Sample): boolean => {
        return playing.indexOf(sample) !== -1;
    },
);
