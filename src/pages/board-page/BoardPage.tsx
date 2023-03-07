import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getColumns } from '../../redux/columns-slice';
import { Modal } from '../../components/modal/Modal';
import { CreateUpdateForm } from '../../components/createUpdateForm/CreateUpdateForm';
import { CreateUpdateFormAction, CreateUpdateFormTitles, ItemType } from '../../enums/enums';
import { useParams } from 'react-router-dom';
import { ICreateUpdateFormValue } from '../../models/boards-interfaces';
import { Column } from '../../components/column/Column';
import { getBoardById } from '../../redux/boards-slice';
import styles from './BoardPage.module.css';

export const BoardPage = () => {
    const { boardId } = useParams();
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState<boolean>(false);

    const { columns } = useAppSelector(state => state.columns);
    const { currentBoardTitle } = useAppSelector(state => state.boards);

    useEffect(() => {
        if (boardId) {
            dispatch(getColumns(boardId));
            dispatch(getBoardById(boardId));
        }
    }, [boardId]);

    const handleCreateColumn = (data: ICreateUpdateFormValue) => {
        const title = data.title;
        if (boardId) {
            dispatch(createColumn({ boardId, title, order: 0 }));
        }
    };

    return (
        <div>
            <div>{currentBoardTitle}</div>
            <div onClick={() => setModalActive(true)}>Create column +</div>
            <Modal active={modalActive} setActive={setModalActive}>
                <CreateUpdateForm submitAction={handleCreateColumn} closeWindow={setModalActive}
                                  title={CreateUpdateFormTitles.CREATE_COLUMN}
                                  actionType={CreateUpdateFormAction.CREATE}
                                  page={ItemType.COLUMNS}
                />
            </ Modal>
            <div className={styles.columns__wrapper}>
                {columns.map((column) => {
                        if (boardId) {
                            return <Column key={column._id} title={column.title} boardId={boardId}
                                           columnId={column._id} />;
                        }
                    }
                )}
            </div>
        </div>
    );
};
