import * as React from 'react';
import glamorous from 'glamorous';

import { Sample } from '../api';

type Props = {
    samples: Sample[],
};

const Container = glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
});

const Item = glamorous.div({
    flex: '1 0 auto',
    margin: 5,
    padding: 10,
    background: '#eee',

    whiteSpace: 'nowrap',
});

function SampleContainer({ samples }: Props) {
    return (
        <Container>
            {samples.map((sample: Sample) => (
                <Item key={sample.path}>
                    <div>{sample.name}</div>
                    <div>{sample.categories.join(' / ')}</div>
                </Item>
            ))}
        </Container>
    );
}

export default SampleContainer;
