import { CellMeasurerCache } from 'react-virtualized';

export interface CellLayout {
    x: number;
    y: number;
    width: number;
    height: number;
}

export class LayoutCache {

    private layouts: CellLayout[] = [];

    set(index: number, layout: CellLayout): void {
        this.layouts[index] = layout;
    }

    get(index: number): CellLayout {
        return this.layouts[index];
    }

    has(index: number): boolean {
        return this.layouts[index] !== undefined;
    }

}

export interface LayoutManagerParams {
    cellMeasurerCache: CellMeasurerCache;
    layoutCache: LayoutCache;
    width: number;
    rowHeight: number;
    spacing: number;
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

    updateLayout(stopIndex: number) {
        const { layoutCache, cellMeasurerCache, containerWidth, rowHeight, spacing } = this;

        let rowWidth = -spacing;
        let rowIndex = 0;
        let rowStartIndex = 0;
        const rowCellLayouts: CellLayout[] = [];

        for (let index = 0; index < stopIndex; index += 1) {
            const cellWidth = cellMeasurerCache.getWidth(index, 0);

            // If the cell does not fit on the current (non-empty) row:
            if (rowWidth > 0 && rowWidth + cellWidth + spacing > containerWidth) {
                // 1. Distribute the remaining row width over the cells in the row
                const addWidth = (containerWidth - rowWidth) / rowCellLayouts.length;
                let lastRightX = -spacing;
                for (let j = 0; j < rowCellLayouts.length; j += 1) {
                    const cellLayout = rowCellLayouts[j];
                    cellLayout.width += addWidth;
                    cellLayout.x = lastRightX + spacing;
                    layoutCache.set(rowStartIndex + j, cellLayout);

                    lastRightX = cellLayout.x + cellLayout.width;
                }

                // 2. Move to the next row
                rowWidth = -spacing;
                rowIndex += 1;
                rowStartIndex = index;
                rowCellLayouts.length = 0;
            }

            // Calculate intermediary cell layout
            rowCellLayouts.push({
                x: rowWidth + spacing,
                y: rowIndex * (rowHeight + spacing),
                width: cellWidth,
                height: rowHeight,
            });

            rowWidth += cellWidth + spacing;
        }

        // Last row does not need to be redistributed, just add to cache
        for (let j = 0; j < rowCellLayouts.length; j += 1) {
            const cellLayout = rowCellLayouts[j];
            layoutCache.set(rowStartIndex + j, cellLayout);
        }
    }

}
