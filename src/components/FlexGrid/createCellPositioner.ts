import { CellMeasurerCache } from 'react-virtualized';
import PositionCache from './PositionCache';

export interface CreateCellPositionerParams {
    cellMeasurerCache: CellMeasurerCache;
    positionCache: PositionCache;
    width: number;
    rowHeight: number;
    spacing?: number;
}

export interface ResetCellPositionerParams {
    width: number;
}

export interface CellPositioner {
    (count: number): void;
    reset(params: ResetCellPositionerParams): void;
}

export default function createCellPositioner(params: CreateCellPositionerParams): CellPositioner {
    const {
        cellMeasurerCache,
        positionCache,
    } = params;

    let {
        width: containerWidth,
        rowHeight,
        spacing = 0,
    } = params;

    function cellPositioner(count: number) {
        let rowWidth = 0;
        let lastRow = 0;

        for (let index = 0; index < count; index++) {
            let cellWidth = cellMeasurerCache.getWidth(index, 0) + spacing;

            if (rowWidth + cellWidth > containerWidth) {
                lastRow += 1;
                rowWidth = 0;
            }

            positionCache.set(index, {
                x: rowWidth,
                y: lastRow * (rowHeight + spacing),
            });

            rowWidth += cellWidth;
        }
    }

    function reset(params: ResetCellPositionerParams) {
        containerWidth = params.width;
    }

    return Object.assign(
        cellPositioner,
        { reset },
    );
}
