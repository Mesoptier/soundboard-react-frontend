import { darken, rgba, transitions } from 'polished';

const theme = {
    Header: {
        root: {
            height: 80,
            backgroundColor: rgba('black', 0.8),
        },
    },

    SampleContainer: {
        root: {
            backgroundColor: '#f4f4f4',
        },
    },

    SampleItem: {
        root: {
            color: '#111',
            backgroundColor: '#fff',
            boxShadow: `0 1px 2px ${rgba('black', 0.1)}`,
            ...transitions(
                'background-color 100ms ease',
                'color 100ms ease',
                'box-shadow 250ms ease',
            ),

            '&:hover': {
                backgroundColor: darken(0.03, '#fff'),
                boxShadow: `0 1px 3px ${rgba('black', 0.15)}`,
            },
        },
        root_isPlaying: {
            color: '#fff',
            backgroundColor: '#0c7cfe',

            '&:hover': {
                backgroundColor: '#0c7cfe',
            },
        },
        name: {},
        category: {
            opacity: 0.8,
        },
    },
};

export default theme;
