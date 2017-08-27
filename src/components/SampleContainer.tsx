import * as React from 'react';
import glamorous from 'glamorous';

import { Sample } from '../api';

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

export interface SampleItemProps {
    sample: Sample;
}

function SampleItem({ sample }: SampleItemProps) {
    return (
        <Item>
            <div>{sample.name}</div>
            <div>{sample.categories.join(' / ')}</div>
        </Item>
    );
}

export interface SampleContainerProps {
    samples: Sample[];
}

function SampleContainer({ samples }: SampleContainerProps) {
    return (
        <Container>
            {samples.map((sample: Sample) => <SampleItem key={sample.path} sample={sample} />)}
        </Container>
    );
}

export default SampleContainer;
