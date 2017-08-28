import * as React from 'react';
import glamorous from 'glamorous';
import { CellMeasurerCache } from 'react-virtualized';

import { Sample } from '../api';
import FlexGrid, { FlexGridCellRenderer } from './FlexGrid/FlexGrid';

const Item = glamorous.div({
    padding: 10,
    boxSizing: 'border-box',

    background: '#eee',
    whiteSpace: 'nowrap',
});

export interface SampleItemProps {
    sample: Sample;
    style: React.CSSProperties;
}

function SampleItem({ sample, style }: SampleItemProps) {
    return (
        <Item style={style}>
            <div>{sample.name}</div>
            <div>{sample.categories.join(' / ')}</div>
        </Item>
    );
}

export interface SampleContainerProps {
    samples: Sample[];
}

export default class SampleContainer extends React.Component<SampleContainerProps> {

    private cellMeasurerCache = new CellMeasurerCache({
        defaultWidth: 100,
        fixedHeight: true,
        keyMapper: rowIndex => this.props.samples[rowIndex].path,
    });

    cellRenderer: FlexGridCellRenderer = ({ index, style }) => (
        <SampleItem sample={this.props.samples[index]} style={style} />
    );

    render() {
        return (
            <FlexGrid
                width={1000}
                height={500}
                cellCount={this.props.samples.length}
                cellRenderer={this.cellRenderer}
                cellMeasurerCache={this.cellMeasurerCache}
            />
        );
    }

}
