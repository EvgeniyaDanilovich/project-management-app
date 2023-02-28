import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { BoardForm } from '../boardForm/BoardForm';
import { Modal } from '../modal/Modal';
import { removeBoard, setCurrentBoardTitle, updateBoard } from '../../redux/boards-slice';
import { IBoardFormValue } from '../../models/boards-interfaces';
import styles from './Board.module.css';
import { BoardFormKeyWords } from '../../enums/enums';

interface BoardProps {
    title: string;
    boardId: string;
}

export const Board: React.FC<BoardProps> = ({ title, boardId }) => {
    const dispatch = useAppDispatch();
    const userId = useAppSelector(state => state.auth.id);
    const [modalActive, setModalActive] = useState<boolean>(false);

    const handleUpdate = () => {
        setModalActive(true);
        dispatch(setCurrentBoardTitle({ boardId }));
    };

    const handleDelete = () => {
        dispatch(removeBoard(boardId));
    };

    const handleUpdateForm = (data: IBoardFormValue) => {
        if (userId) {
            dispatch(updateBoard({ boardId, title: data.title, owner: userId, users: [] }));
        }
    };

    const handleModal = (status: boolean) => {
        setModalActive(status);
    };

    return (
        <div>
            <div>{title}</div>
            <div className={styles.button} onClick={handleUpdate}>Update</div>
            <div className={styles.button} onClick={handleDelete}>Delete</div>
            <Modal active={modalActive} setActive={setModalActive}>
                <BoardForm submitAction={handleUpdateForm} closeWindow={handleModal} keyWord={BoardFormKeyWords.UPDATE} />
            </Modal>
        </div>
    );
};
