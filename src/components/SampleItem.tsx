import glamorous from 'glamorous';
import * as React from 'react';

import { Sample } from '../api';

const Item = glamorous.div(
    {
        padding: 10,
        boxSizing: 'border-box',

        borderRadius: 3,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        cursor: 'pointer',
    },
    ({ theme }) => theme.sampleItem,
);

export interface SampleItemProps {
    sample: Sample;
    style: React.CSSProperties;
}

export default class SampleItem extends React.PureComponent<SampleItemProps> {
    public render() {
        const { style, sample } = this.props;
        return (
            <Item style={style}>
                <div>{sample.name}</div>
                <div>{sample.categories.join(' / ')}</div>
            </Item>
        );
    }
}
