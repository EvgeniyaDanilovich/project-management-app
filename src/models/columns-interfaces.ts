export interface Column {
    _id: string;
    title: string;
    order: number;
    boardId: string;
}

export interface IColumnInitState{
    columns: Column[]
}

export interface ColumnData {
    boardId: string,
    title: string,
    order: number
}