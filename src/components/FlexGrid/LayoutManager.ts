import { CellMeasurerCache } from 'react-virtualized';

import LayoutCache, { CellLayout } from './LayoutCache';

export interface LayoutManagerParams {
    cellMeasurerCache: CellMeasurerCache;
    layoutCache: LayoutCache;
    width: number;
    rowHeight: number;
    spacing: number;
}

interface ResetParams {
    width: number;
}

export default class LayoutManager {
    private cellMeasurerCache: CellMeasurerCache;
    private layoutCache: LayoutCache;
    private containerWidth: number;
    private rowHeight: number;
    private spacing: number;

    constructor(params: LayoutManagerParams) {
        this.cellMeasurerCache = params.cellMeasurerCache;
        this.layoutCache = params.layoutCache;
        this.containerWidth = params.width;
        this.rowHeight = params.rowHeight;
        this.spacing = params.spacing;
    }

    public reset(params: ResetParams) {
        this.containerWidth = params.width;
    }

    public updateLayout(stopIndex: number) {
        let rowWidth = -this.spacing;
        let rowIndex = 0;
        let rowStartIndex = 0;
        const rowCellLayouts: CellLayout[] = [];

        for (let index = 0; index < stopIndex; index += 1) {
            const cellWidth = this.cellMeasurerCache.getWidth(index, 0);

            // If the cell does not fit on the current (non-empty) row:
            if (
                rowWidth > 0 &&
                rowWidth + cellWidth + this.spacing > this.containerWidth
            ) {
                // 1. Distribute the remaining row width over the cells in the row
                const addWidth =
                    (this.containerWidth - rowWidth) / rowCellLayouts.length;
                let lastRightX = -this.spacing;
                for (let j = 0; j < rowCellLayouts.length; j += 1) {
                    const cellLayout = rowCellLayouts[j];
                    cellLayout.width += addWidth;
                    cellLayout.x = lastRightX + this.spacing;
                    this.layoutCache.set(rowStartIndex + j, cellLayout);

                    lastRightX = cellLayout.x + cellLayout.width;
                }

                // 2. Move to the next row
                rowWidth = -this.spacing;
                rowIndex += 1;
                rowStartIndex = index;
                rowCellLayouts.length = 0;
            }

            // Calculate intermediary cell layout
            rowCellLayouts.push({
                x: rowWidth + this.spacing,
                y: rowIndex * (this.rowHeight + this.spacing),
                width: cellWidth,
                height: this.rowHeight,
            });

            rowWidth += cellWidth + this.spacing;
        }

        // Last row does not need to be redistributed, just add to cache
        for (let j = 0; j < rowCellLayouts.length; j += 1) {
            const cellLayout = rowCellLayouts[j];
            this.layoutCache.set(rowStartIndex + j, cellLayout);
        }
    }
}
