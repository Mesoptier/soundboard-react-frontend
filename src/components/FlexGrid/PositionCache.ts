export interface Position {
    x: number;
    y: number;
}

export default class PositionCache {

    private positions: Position[] = [];

    set(index: number, position: Position) {
        this.positions[index] = position;
    }

    get(index: number): Position {
        return this.positions[index];
    }

    has(index: number): boolean {
        return this.positions[index] !== undefined;
    }

}
