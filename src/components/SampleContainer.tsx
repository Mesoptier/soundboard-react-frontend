import glamorous from 'glamorous';
import * as React from 'react';
import { CellMeasurerCache, WindowScroller } from 'react-virtualized';

import { Sample } from '../api';
import SampleItem from '../containers/SampleItem';
import FlexGrid, { FlexGridCellRenderer } from './FlexGrid/FlexGrid';

const Container = glamorous.div(
    {
        // Improve scrolling performance
        willChange: 'transform',
    },
    ({ theme }) => ({
        paddingTop: theme.Header.root.height,
        ...theme.SampleContainer.root,
    }),
);

export interface SampleContainerProps {
    samples: Sample[];
}

export default class SampleContainer extends React.Component<
    SampleContainerProps
> {
    private flexGrid: FlexGrid;

    private cellMeasurerCache = new CellMeasurerCache({
        defaultWidth: 100,
        fixedHeight: true,
        keyMapper: rowIndex =>
            this.props.samples[rowIndex]
                ? this.props.samples[rowIndex].path
                : null,
    });

    public componentWillReceiveProps() {
        this.flexGrid.updateLayout();
    }

    public cellRenderer: FlexGridCellRenderer = ({ key, index, style }) => (
        <SampleItem key={key} sample={this.props.samples[index]} style={style} />
    );

    public render() {
        return (
            <Container>
                <WindowScroller>
                    {params => (
                        <FlexGrid
                            ref={this.setFlexGridRef}
                            width={(params as any).width}
                            height={params.height}
                            cellCount={this.props.samples.length}
                            cellRenderer={this.cellRenderer}
                            cellMeasurerCache={this.cellMeasurerCache}
                            autoHeight={true}
                            scrollTop={params.scrollTop}
                            isScrolling={params.isScrolling}
                            verticalOverscanSize={100}
                        />
                    )}
                </WindowScroller>
            </Container>
        );
    }

    private setFlexGridRef = (ref: FlexGrid) => (this.flexGrid = ref);
}
