import { eventChannel } from 'redux-saga';
import { all, call, put, race, take, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';

import { Sample } from '../../api';
import player from '../../helpers/player';
import {
    playSample,
    playStarted,
    playStopped,
    stopAllSamples,
} from './actions';

export default function* playerSaga() {
    yield all([call(playSampleWatcher), call(stopAllSamplesWatcher)]);
}

// Stop all samples
export function* stopAllSamplesWatcher() {
    yield takeEvery(stopAllSamples.type, stopAllSamplesWorker);
}

export function* stopAllSamplesWorker() {
    yield call([player, player.stopAll]);
}

// Play sample
export function* playSampleWatcher() {
    yield takeEvery(playSample.type, playSampleWorker);
}

export function* playSampleWorker(action: Action<Sample>) {
    const sample = action.payload;

    // Play the sample
    const audioId = yield call([player, player.play], sample);
    yield put(playStarted({ sample, audioId }));

    // Wait for the sample to end
    const endChannel = yield call(playerEventChannel, `end.${audioId}`);
    yield take(endChannel);
    endChannel.close();
    yield put(playStopped({ sample, audioId }));
}

function playerEventChannel(event: string) {
    return eventChannel(emitter => {
        const callback = () => {
            emitter({});
        };

        player.on(event, callback);

        return () => {
            player.off(event, callback);
        };
    });
}
