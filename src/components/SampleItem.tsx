import glamorous, { CSSProperties } from 'glamorous';
import { ellipsis } from 'polished';
import * as React from 'react';

import { Sample } from '../api';

const Item = glamorous.div(
    {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        padding: 10,
        boxSizing: 'border-box',

        borderRadius: 3,
        whiteSpace: 'nowrap',
        textAlign: 'center',

        cursor: 'pointer',
        WebkitTapHighlightColor: 'transparent',
    },
    ({ theme }) => theme.SampleItem.root,
);

const Name = glamorous.div(
    {
        ...ellipsis() as CSSProperties,
    },
    ({ theme }) => theme.SampleItem.name,
);

const Category = glamorous.div(
    {
        fontSize: 14,
    },
    ({ theme }) => theme.SampleItem.category,
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
                <Name>{sample.name}</Name>
                <Category>{sample.categories.join(' / ')}</Category>
            </Item>
        );
    }
}
