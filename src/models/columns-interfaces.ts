export interface Column {
    _id: string;
    title: string;
    order: number;
    boardId: string;
}

export interface IColumnInitState{
    columns: Column[],
    updatedColumnTitle: string
}

export interface ColumnData {
    boardId: string,
    title: string,
    order: number
}

export interface UpdateColumnData{
    boardId: string,
    columnId: string,
    title: string,
    order: number
}

export interface DeleteColumnData{
    boardId: string,
    columnId: string
}

export interface ICurrentColumnId{
    columnId: string;
}
