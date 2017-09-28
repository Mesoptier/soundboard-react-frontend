import actionCreatorFactory from 'typescript-fsa';

import { Sample } from '../../api';

const actionCreator = actionCreatorFactory('samples');

export const setSamples = actionCreator<Sample[]>('SET_SAMPLES');
export const setQuery = actionCreator<string>('SET_QUERY');
