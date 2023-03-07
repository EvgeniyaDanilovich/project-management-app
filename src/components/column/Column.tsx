import React, { useState } from 'react';
import styles from './Column.module.css';
import { Modal } from '../modal/Modal';
import { CreateUpdateForm } from '../createUpdateForm/CreateUpdateForm';
import { useAppDispatch } from '../../hooks/redux';
import { deleteColumn, resetUpdatedColumnTitle, setUpdatedColumnTitle, updateColumn } from '../../redux/columns-slice';
import { CreateUpdateFormAction, CreateUpdateFormTitles, DeletedTypeItem, ItemType } from '../../enums/enums';
import { ICreateUpdateFormValue } from '../../models/boards-interfaces';
import { DeleteConfirmForm } from '../deleteConfirmForm/DeleteConfirmForm';

export interface ColumnProps {
    title?: string;
    boardId: string;
    columnId: string;
}

export const Column: React.FC<ColumnProps> = ({ title, boardId, columnId }) => {
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [confirmModalActive, setConfirmModalActive] = useState<boolean>(false);

    const handleUpdateColumn = (data: ICreateUpdateFormValue) => {
        const title = data.title;
        dispatch(updateColumn({ boardId, columnId, title, order: 0 }));
        dispatch(resetUpdatedColumnTitle());
    };

    const handleDeleteColumn = () => {
        dispatch(deleteColumn({ boardId, columnId }));
    };

    const handleClickUpdate = () => {
        dispatch(setUpdatedColumnTitle({ columnId }));
        setModalActive(true);
    };

    return (
        <div>
            <div className={styles.column}>
                <div>{title}</div>
                <div className={styles.btn} onClick={handleClickUpdate}>update</div>
                <Modal active={modalActive} setActive={setModalActive}>
                    <CreateUpdateForm submitAction={handleUpdateColumn} closeWindow={setModalActive}
                                      title={CreateUpdateFormTitles.UPDATE_COLUMN}
                                      actionType={CreateUpdateFormAction.UPDATE}
                                      page={ItemType.COLUMNS}
                    />
                </Modal>

                <div className={styles.btn} onClick={() => setConfirmModalActive(true)}>delete</div>
                <Modal active={confirmModalActive} setActive={setConfirmModalActive}>
                    <DeleteConfirmForm submitActions={handleDeleteColumn} closeWindow={setConfirmModalActive} typeItem={DeletedTypeItem.COLUMN} />
                </Modal>

                <div className={styles.btn}>Add task</div>
            </div>
        </div>
    );
};
