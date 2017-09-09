import glamorous from 'glamorous';
import * as React from 'react';

import { Sample } from '../api';
import SampleItem from '../containers/SampleItem';

const Container = glamorous.div(
    {
        display: 'flex',
        flexWrap: 'wrap',
        padding: 10,

        // Improve scrolling performance
        willChange: 'transform',
    },
    ({ theme }) => ({
        paddingTop: theme.Header.root.height + 10,
        ...theme.SampleContainer.root,
    }),
);

export interface SampleContainerProps {
    samples: Sample[];
}

export default class SampleContainer extends React.PureComponent<
    SampleContainerProps
> {
    public render() {
        return (
            <Container>
                {this.props.samples.map(sample => (
                    <SampleItem key={sample.path} sample={sample} />
                ))}
            </Container>
        );
    }
}
