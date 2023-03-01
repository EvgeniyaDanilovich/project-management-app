import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CreateUpdateForm } from '../createUpdateForm/CreateUpdateForm';
import { Modal } from '../modal/Modal';
import { removeBoard, resetCurrentBoardTitle, setCurrentBoardId, setCurrentBoardTitle, updateBoard } from '../../redux/boards-slice';
import { BoardProps, ICreateUpdateFormValue } from '../../models/boards-interfaces';
import styles from './Board.module.css';
import { CreateUpdateFormAction, CreateUpdateFormTitles } from '../../enums/enums';
import { useNavigate } from 'react-router-dom';

export const Board: React.FC<BoardProps> = ({ title, boardId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userId = useAppSelector(state => state.auth.id);
    const [modalActive, setModalActive] = useState<boolean>(false);

    const handleUpdate = () => {
        setModalActive(true);
        dispatch(setCurrentBoardTitle({ boardId }));
    };

    const handleDelete = () => {
        dispatch(removeBoard(boardId));
    };

    const handleUpdateForm = (data: ICreateUpdateFormValue) => {
        if (userId) {
            dispatch(updateBoard({ boardId, title: data.title, owner: userId, users: [] }));
            dispatch(resetCurrentBoardTitle());
        }
    };

    const handleRedirect = () => {
        dispatch(setCurrentBoardId({ boardId }))
        navigate(`/board/${boardId}`);
    };

    return (
        <div>
            <div onClick={handleRedirect}>{title}</div>
            <div className={styles.button} onClick={handleUpdate}>Update</div>
            <div className={styles.button} onClick={handleDelete}>Delete</div>
            <Modal active={modalActive} setActive={setModalActive}>
                <CreateUpdateForm submitAction={handleUpdateForm} closeWindow={setModalActive}
                                  title={CreateUpdateFormTitles.UPDATE_BOARD}
                                  actionType={CreateUpdateFormAction.UPDATE}
                />
            </Modal>
        </div>
    );
};
