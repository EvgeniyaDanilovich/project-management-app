import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Modal } from '../modal/Modal';
import { removeBoard } from '../../redux/boards-slice';
import { BoardProps } from '../../models/boards-interfaces';
import styles from './Board.module.scss';
import { DeletedTypeItem } from '../../enums/enums';
import { useNavigate } from 'react-router-dom';
import { DeleteConfirmForm } from '../deleteConfirmForm/DeleteConfirmForm';
import {ReactComponent as Delete} from '../../assets/images/delete.svg';
import cn from 'classnames';

export const Board: React.FC<BoardProps> = ({ title, boardId }) => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const [confirmModalActive, setConfirmModalActive] = useState<boolean>(false);

    const handleDelete = () => {
        dispatch(removeBoard(boardId));
    };

    const handleRedirect = () => {
        navigate(`/board/${boardId}`);
    };

    return (
        <div onClick={handleRedirect} className={cn(styles.card, 'boardCard')}>
            <h4 className={styles.title} onClick={handleRedirect}>{title}</h4>

            <div className={styles.button} onClick={(e) => {
                e.stopPropagation();
                setConfirmModalActive(true);
            }}>
                <Delete stroke={'#333333'} className={styles.delete} />
                Delete board
            </div>
            <Modal active={confirmModalActive} setActive={setConfirmModalActive}>
                <DeleteConfirmForm submitActions={handleDelete} closeWindow={setConfirmModalActive} typeItem={DeletedTypeItem.BOARD} />
            </Modal>
        </div>
    );
};
