import * as React from 'react';
import {
    CellMeasurer, CellMeasurerCache, Collection, CollectionCellGroupRenderer, CollectionCellRenderer,
    CollectionCellSizeAndPositionGetter,
} from 'react-virtualized';

export interface FlexGridCellRendererParams {
    index: number;
    key: string;
    style?: React.CSSProperties;
}

export interface FlexGridCellRenderer {
    (params: FlexGridCellRendererParams): JSX.Element;
}

interface FlexGridProps {
    width: number;
    height: number;
    cellCount: number;
    cellRenderer: FlexGridCellRenderer;
    cellMeasurerCache: CellMeasurerCache;
}

export default class FlexGrid extends React.Component<FlexGridProps> {

    private collection: Collection;
    private invalidateOnUpdate = false;

    //componentDidMount() {
    //    this.checkInvalidateOnUpdate();
    //}
    //
    //componentDidUpdate() {
    //    this.checkInvalidateOnUpdate();
    //}

    render() {
        return (
            <Collection
                ref={this.setCollectionRef}
                width={this.props.width}
                height={this.props.height}
                cellCount={this.props.cellCount}
                cellRenderer={this.cellRenderer}
                cellGroupRenderer={this.cellGroupRenderer}
                cellSizeAndPositionGetter={this.cellSizeAndPositionGetter}
            />
        )
    }

    private setCollectionRef = (ref: Collection) => this.collection = ref;

    private invalidateCellSizeAfterRender = ({ rowIndex }: { rowIndex: number }) => {
        this.invalidateOnUpdate = true;
        this.collection.calculateSizeAndPositionData();
        this.collection.forceUpdate();
    };

    //private checkInvalidateOnUpdate() {
    //    if (this.invalidateOnUpdate) {
    //        this.invalidateOnUpdate = false;
    //        this.collection.recomputeCellSizesAndPositions();
    //    }
    //}

    //recomputeGridSize = ({ rowIndex }: { rowIndex: number }) => {
    //    console.log('recomputeGridSize', rowIndex);
    //};

    private cellRenderer: CollectionCellRenderer = ({ index, key, style }) => (
        <CellMeasurer
            key={key}
            cache={this.props.cellMeasurerCache}
            rowIndex={index}
            columnIndex={0}
            parent={this as any}
        >
            {this.props.cellRenderer({ index, key, style })}
        </CellMeasurer>
    );

    private cellGroupRenderer: CollectionCellGroupRenderer = ({ cellRenderer, cellSizeAndPositionGetter, indices }) => {
        const renderedCells = [];

        // TODO: Only render visible items and items with unknown size

        for (let index = 0; index < this.props.cellCount; index++) {
            const rect = cellSizeAndPositionGetter({ index });

            const cellRendererProps = {
                index,
                key: index as any,
                style: {
                    position: 'absolute',
                    width: rect.width,
                    height: rect.height,
                    transform: `translate(${rect.x}px, ${rect.y}px)`,
                } as React.CSSProperties,
            };

            renderedCells.push(cellRenderer(cellRendererProps));
        }

        return renderedCells;
    };

    private cellSizeAndPositionGetter: CollectionCellSizeAndPositionGetter = ({ index }) => {
        return {
            width: this.props.cellMeasurerCache.getWidth(index, 0),
            height: 60,
            x: 20 + this.props.cellMeasurerCache.getWidth(index, 0),
            y: index * 70,
        };
    };
}
