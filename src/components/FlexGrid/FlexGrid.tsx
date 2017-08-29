import * as React from 'react';
import {
    CellMeasurer, CellMeasurerCache, Collection, CollectionCellGroupRenderer, CollectionCellRenderer,
    CollectionCellSizeAndPositionGetter,
} from 'react-virtualized';

import { LayoutCache, default as LayoutManager } from './LayoutManager';

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
    autoHeight?: boolean;
    scrollTop?: number;
    isScrolling?: boolean;
}

export default class FlexGrid extends React.Component<FlexGridProps> {

    private collection: Collection;
    private layoutManager: LayoutManager;

    private repositionOnUpdate = false;
    private layoutCache = new LayoutCache();

    constructor(props: FlexGridProps) {
        super(props);

        this.layoutManager = new LayoutManager({
            cellMeasurerCache: this.props.cellMeasurerCache,
            layoutCache: this.layoutCache,
            width: this.props.width,
            rowHeight: 60,
            spacing: 10,
        });
    }

    componentDidMount() {
        this.checkRepositionOnUpdate();
    }

    componentDidUpdate() {
        this.checkRepositionOnUpdate();
    }

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
                autoHeight={this.props.autoHeight}
                scrollTop={this.props.scrollTop}
            />
        )
    }

    private setCollectionRef = (ref: Collection) => this.collection = ref;

    private invalidateCellSizeAfterRender = ({ rowIndex }: { rowIndex: number }) => {
        this.repositionOnUpdate = true;
        //this.collection.calculateSizeAndPositionData();
        //this.collection.forceUpdate();
    };

    updateLayout() {
        this.repositionOnUpdate = true;
        //this.checkRepositionOnUpdate();
    }

    private checkRepositionOnUpdate() {
        if (this.repositionOnUpdate) {
            this.repositionOnUpdate = false;

            this.layoutManager.updateLayout(this.props.cellCount);

            this.collection.calculateSizeAndPositionData();
            this.collection.forceUpdate();
        }
    }

    recomputeGridSize = ({ rowIndex }: { rowIndex: number }) => {
        console.log('recomputeGridSize', rowIndex);
    };

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

    private cellSizeAndPositionGetter: CollectionCellSizeAndPositionGetter = ({ index }) => {
        if (this.layoutCache.has(index)) {
            return this.layoutCache.get(index);
        }

        return {
            x: 0,
            y: 0,
            width: 0,
            height: 0,
        };
    };

    private cellGroupRenderer: CollectionCellGroupRenderer = ({ cellRenderer, cellSizeAndPositionGetter, indices }) => {
        const renderedCells = [];

        for (let index = 0; index < this.props.cellCount; index++) {
            // Skip cell if it is already measured and is not in view
            if (this.props.cellMeasurerCache.has(index, 0) && indices.indexOf(index) === -1) {
                continue;
            }

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
}
