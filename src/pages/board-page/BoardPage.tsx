import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getColumns } from '../../redux/columns-slice';
import { Modal } from '../../components/modal/Modal';
import { CreateForm } from '../../components/createUpdateForm/CreateForm';
import { CreateUpdateFormTitles, ItemType } from '../../enums/enums';
import { NavLink, useParams } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import { getBoardById, resetUpdatedBoardTitle, updateBoard } from '../../redux/boards-slice';
import styles from './BoardPage.module.css';
import { ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { useForm } from 'react-hook-form';
import { getUserId } from '../../utils/localStorage';

export const BoardPage = () => {
    const { register, handleSubmit } = useForm<ICreateUpdateFormValue>();
    const { boardId } = useParams();
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    // @ts-ignore
    const userId  = getUserId();
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

    const handleUpdateBoardTitle = (data: ICreateUpdateFormValue) => {
        if (boardId && userId) {
            dispatch(updateBoard({ boardId, title: data.title, owner: userId, users: [] }));
            dispatch(resetUpdatedBoardTitle());
            setEditMode(false);
        }
    };

    return (
        <div>
            <NavLink to={'/boards'}>Back to boards</NavLink>
            {editMode ?
                <form onSubmit={handleSubmit(handleUpdateBoardTitle)}>
                    <input type={'text'} {...register('title')} defaultValue={currentBoardTitle} />
                    <button>upd</button>
                </form>
                : <div onClick={() => setEditMode(true)}>{currentBoardTitle}</div>
            }


            <div onClick={() => setModalActive(true)}>Create column +</div>
            <Modal active={modalActive} setActive={setModalActive}>
                <CreateForm submitAction={handleCreateColumn} closeWindow={setModalActive}
                            title={CreateUpdateFormTitles.CREATE_COLUMN} page={ItemType.COLUMNS}
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
