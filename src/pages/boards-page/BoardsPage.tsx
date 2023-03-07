import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { getAllBoardsByUserIdTC } from '../../redux/boards-slice';
import { Board } from '../../components/board/Board';

export const BoardsPage = () => {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector(state => state.auth);
    const { boards } = useAppSelector(state => state.boards);
    const userId  = useAppSelector(state => state.auth.id);

    useEffect(() => {
        if (userId) {
            dispatch(getAllBoardsByUserIdTC(userId));
        }
    }, [userId]);

    return (
        <div>
            {!!boards[0] ?
                <div>{boards.map(board => {
                    return <div key={board._id}><Board title={board.title} boardId={board._id}/> </div>;
                })}</div>
                : <div>You don't have boards</div>
            }
        </div>
    );
};
