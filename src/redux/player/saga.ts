import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';

import { Sample } from '../../api';
import Player from '../../helpers/Player';
import { playSample, playStarted, playStopped } from './actions';

export default function* playerSaga() {
    yield watchPlaySample();
}

export function* watchPlaySample() {
    yield takeEvery(playSample.type, playSampleWorker);
}

export function* playSampleWorker(action: Action<Sample>) {
    const sample = action.payload;

    // Play the sample
    const soundId = yield call(Player.play, sample);
    yield put(playStarted({ sample, soundId }));

    // Wait for the sample to stop
    const endChannel = yield call(createEndChannel, sample.id, soundId);
    yield take(endChannel);
    yield put(playStopped({ sample, soundId }));
}

function createEndChannel(sampleId: number, soundId: number) {
    return eventChannel(emitter => {
        const callback = () => {
            emitter({});
        };

        Player.on('end', callback, sampleId, soundId);

        return () => {
            Player.off('end', callback, sampleId, soundId);
        };
    });
}
