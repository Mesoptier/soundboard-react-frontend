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
            backgroundColor: '#fff',
            boxShadow: '0 1px 2px #d4d4d4',

            ...transitions('background-color 150ms ease', 'box-shadow 150ms ease'),

            '&:hover': {
                backgroundColor: darken(0.03, '#fff'),
                boxShadow: '0 2px 4px #d4d4d4',
            },
        },
        name: {
            color: '#111',
        },
        category: {
            color: '#888',
        }
    },
};

export default theme;
