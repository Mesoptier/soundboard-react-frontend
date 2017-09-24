import glamorous, { CSSProperties } from 'glamorous';
import { ellipsis } from 'polished';
import * as React from 'react';

import { Sample } from '../api';
import { ThemeProps } from '../theme';

const Root = glamorous.div<ThemeProps & { isPlaying: boolean }>(
    {
        margin: 5,
        flex: '1 0 auto',
        maxWidth: '100%',

        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',

        height: 56,
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

const Name = glamorous.div<ThemeProps>(
    {
        ...(ellipsis() as CSSProperties),
    },
    ({ theme }) => theme.SampleItem.name,
);

const Category = glamorous.div<ThemeProps>(
    {
        fontSize: 14,
        ...(ellipsis() as CSSProperties),
    },
    ({ theme }) => theme.SampleItem.category,
);

export interface SampleItemProps {
    sample: Sample;

    isPlaying: boolean;
    playSample: () => void;
}

export default class SampleItem extends React.PureComponent<SampleItemProps> {
    public render() {
        const { sample, isPlaying, playSample } = this.props;
        return (
            <Root onClick={playSample} isPlaying={isPlaying}>
                <Name>{sample.name}</Name>
                <Category>{sample.categories.join(' / ')}</Category>
            </Root>
        );
    }
}
