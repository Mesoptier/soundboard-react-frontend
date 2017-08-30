export interface CellLayout {
    x: number;
    y: number;
    width: number;
    height: number;
}

export default class LayoutCache {
    private layouts: CellLayout[] = [];

    public set(index: number, layout: CellLayout): void {
        this.layouts[index] = layout;
    }

    public get(index: number): CellLayout {
        return this.layouts[index];
    }

    public has(index: number): boolean {
        return this.layouts[index] !== undefined;
    }
}
