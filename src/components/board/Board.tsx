import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { CreateUpdateForm } from '../createUpdateForm/CreateUpdateForm';
import { Modal } from '../modal/Modal';
import { removeBoard, resetUpdatedBoardTitle, setUpdatedBoardTitle, updateBoard } from '../../redux/boards-slice';
import { BoardProps, ICreateUpdateFormValue } from '../../models/boards-interfaces';
import styles from './Board.module.css';
import { CreateUpdateFormAction, CreateUpdateFormTitles, DeletedTypeItem, ItemType } from '../../enums/enums';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmForm } from '../deleteConfirmForm/DeleteConfirmForm';

export const Board: React.FC<BoardProps> = ({ title, boardId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const userId = useAppSelector(state => state.auth.id);
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [confirmModalActive, setConfirmModalActive] = useState<boolean>(false);

    const handleUpdate = () => {
        setModalActive(true);
        dispatch(setUpdatedBoardTitle({ boardId }));
    };

    const handleDelete = () => {
        dispatch(removeBoard(boardId));
    };

    const handleUpdateForm = (data: ICreateUpdateFormValue) => {
        if (userId) {
            dispatch(updateBoard({ boardId, title: data.title, owner: userId, users: [] }));
            dispatch(resetUpdatedBoardTitle());
        }
    };

    const handleRedirect = () => {
        // dispatch(setCurrentBoardId({ boardId }))
        navigate(`/board/${boardId}`);
    };

    return (
        <div>
            <div onClick={handleRedirect}>{title}</div>
            <div className={styles.button} onClick={handleUpdate}>Update</div>
            <Modal active={modalActive} setActive={setModalActive}>
                <CreateUpdateForm submitAction={handleUpdateForm} closeWindow={setModalActive}
                                  title={CreateUpdateFormTitles.UPDATE_BOARD}
                                  actionType={CreateUpdateFormAction.UPDATE}
                                  page={ItemType.BOARDS}
                />
            </Modal>

            <div className={styles.button} onClick={() => setConfirmModalActive(true)}>Delete</div>
            <Modal active={confirmModalActive} setActive={setConfirmModalActive}>
                <DeleteConfirmForm submitActions={handleDelete} closeWindow={setConfirmModalActive} typeItem={DeletedTypeItem.BOARD} />
            </Modal>
        </div>
    );
};
