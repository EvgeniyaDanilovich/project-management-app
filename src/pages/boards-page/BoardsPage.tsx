import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createBoardTC, getBoardsTC } from '../../redux/boards-slice';

export const BoardsPage = () => {
    const dispatch = useAppDispatch();
    const { boards } = useAppSelector(state => state.boards);
    const userId = useAppSelector(state => state.auth.id);

    useEffect(() => {
        dispatch(getBoardsTC());
    }, []);

    const handleClick = () => {
        if (userId) {
            dispatch(createBoardTC({ title: 'done', userId }));
        }
    };

    return (
        <div>
            <div>{boards.map(board => {
                return <div key={board._id}>{board.title}</div>;
            })}</div>
            <div style={{cursor: 'pointer'}} onClick={handleClick}>add bord</div>
        </div>
    );
};
