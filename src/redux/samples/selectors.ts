import { createSelector } from 'reselect';

import { State } from '../';
import { Sample } from '../../api';

export const getSamples = (state: State) => state.samples.samples;
export const getQuery = (state: State) => state.samples.query;

const sampleMatchesQuery = (query: string) => {
    const terms = query
        // Strip non-alphanumeric characters (will be done in target as well)
        .replace(/[^\w\s\|]/g, '')
        // Enable OR-searching when whitespace is around the pipe character "|"
        .replace(/\s+\|\s+/g, '|')
        // Split by any combination of whitespace characters
        .split(/[\s\+&]+/g);

    const regex = new RegExp(
        `.*${terms.map(term => `(?=.*${term}.*)`).join('')}.*`,
        'i',
    );

    return (sample: Sample): boolean =>
        regex.test(
            [sample.name, ...sample.categories]
                .map(item => item.replace(/[^\w\s\|]/g, ''))
                .join(' '),
        );
};

export const getVisibleSamples = createSelector(
    getSamples,
    getQuery,
    (samples: Sample[], query: string) => {
        if (query === '') {
            return samples;
        }

        return samples.filter(sampleMatchesQuery(query));
    },
);
