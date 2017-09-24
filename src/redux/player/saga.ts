import { eventChannel } from 'redux-saga';
import { call, put, take, takeEvery } from 'redux-saga/effects';

import { Sample } from '../../api';
import Player from '../../helpers/Player';
import { Action, playEnded, playStarted } from './actions';

export default function* playerSaga() {
    yield watchPlaySample();
}

export function* watchPlaySample() {
    yield takeEvery('PLAY_REQUESTED', playSample);
}

export function* playSample(action: Action) {
    const soundId = yield call(Player.play, action.sample);
    yield put(playStarted(action.sample, soundId));
    const endChannel = yield call(createEndChannel, action.sample.id, soundId);
    yield take(endChannel);
    yield put(playEnded(action.sample, soundId));
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
