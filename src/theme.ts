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
            boxShadow: `0 1px 2px ${rgba('black', 0.1)}`,

            ...transitions('background-color 250ms ease', 'box-shadow 250ms ease'),

            '&:hover': {
                backgroundColor: darken(0.03, '#fff'),
                boxShadow: `0 1px 3px ${rgba('black', 0.15)}`,
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
