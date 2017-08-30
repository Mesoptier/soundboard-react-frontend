import { createSelector } from 'reselect';
import { State } from '../';
import { Sample } from '../../api';

export const getSamples = (state: State) => state.samples.samples;
export const getQuery = (state: State) => state.samples.query;

export const getVisibleSamples = createSelector(
    getSamples,
    getQuery,
    (samples: Sample[], query: string) => {
        if (query === '') {
            return samples;
        }

        return samples.filter(sample => {
            return (
                sample.name.includes(query) ||
                sample.categories.some(category => category.includes(query))
            );
        });
    },
);
