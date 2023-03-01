import React from 'react';

export interface ColumnProps{
    title: string
}

export const Column: React.FC<ColumnProps> = ({title}) => {
    return (
        <div>
            <div>{title}</div>
            <div>col 1</div>
            <div>col 2</div>
        </div>
    );
};
