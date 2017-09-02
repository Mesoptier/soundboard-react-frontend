import glamorous, { CSSProperties } from 'glamorous';
import { ellipsis } from 'polished';
import * as React from 'react';

import { Sample } from '../api';

const Root = glamorous.div<{ isPlaying: boolean; theme: any }>(
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
    ({ theme, isPlaying }) => isPlaying && theme.SampleItem.root_isPlaying,
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

    isPlaying: boolean;
    playSample: () => void;
}

export default class SampleItem extends React.PureComponent<SampleItemProps> {
    public render() {
        const { sample, style, isPlaying, playSample } = this.props;
        return (
            <Root style={style} onClick={playSample} isPlaying={isPlaying}>
                <Name>{sample.name}</Name>
                <Category>{sample.categories.join(' / ')}</Category>
            </Root>
        );
    }
}
