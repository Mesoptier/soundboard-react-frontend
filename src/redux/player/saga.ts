import { eventChannel } from 'redux-saga';
import { all, call, put, race, take, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';

import { Sample } from '../../api';
import Player from '../../helpers/Player';
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
    yield call(Player.stopAll);
}

// Play sample
export function* playSampleWatcher() {
    yield takeEvery(playSample.type, playSampleWorker);
}

export function* playSampleWorker(action: Action<Sample>) {
    const sample = action.payload;

    // Play the sample
    const soundId = yield call(Player.play, sample);
    yield put(playStarted({ sample, soundId }));

    // Wait for the sample to stop
    const endChannel = yield call(
        playerEventChannel,
        'end',
        sample.id,
        soundId,
    );
    const stopChannel = yield call(
        playerEventChannel,
        'stop',
        sample.id,
        soundId,
    );

    yield race({
        end: take(endChannel),
        stop: take(stopChannel),
    });
    yield put(playStopped({ sample, soundId }));
}

function playerEventChannel(event: string, sampleId: number, soundId: number) {
    return eventChannel(emitter => {
        const callback = () => {
            emitter({});
        };

        Player.on(event, callback, sampleId, soundId);

        return () => {
            Player.off(event, callback, sampleId, soundId);
        };
    });
}
