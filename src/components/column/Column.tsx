import React, { useEffect, useState } from 'react';
import styles from './Column.module.css';
import { Modal } from '../modal/Modal';
import { CreateForm } from '../createUpdateForm/CreateForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteColumn, resetUpdatedColumnTitle, setUpdatedColumnTitle, updateColumn } from '../../redux/columns-slice';
import {  CreateUpdateFormTitles, DeletedTypeItem, ItemType } from '../../enums/enums';
import { DeleteConfirmForm } from '../deleteConfirmForm/DeleteConfirmForm';
import { Task } from '../task/Task';
import { createTask, getTasksInColumn, resetTasks } from '../../redux/task-slice';
import { createTaskData } from '../../models/api-interfaces';
import { ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { useForm } from 'react-hook-form';

export interface ColumnProps {
    title?: string;
    boardId: string;
    columnId: string;
}

export const Column: React.FC<ColumnProps> = ({ title, boardId, columnId }) => {
    const { register, handleSubmit } = useForm<ICreateUpdateFormValue>();

    const dispatch = useAppDispatch();
    const [confirmModalActive, setConfirmModalActive] = useState<boolean>(false);
    const [createModalActive, setCreateModalActive] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    const { tasks } = useAppSelector(state => state.task);
    const userId = useAppSelector(state => state.auth.id);
    const { updatedColumnTitle } = useAppSelector(state => state.columns);

    useEffect(() => {
        dispatch(resetTasks());
        dispatch(getTasksInColumn({ boardId, columnId }));
    }, []);

    const handleClickUpdate = () => {
        dispatch(setUpdatedColumnTitle({ columnId }));
        setEditMode(true)
        // setModalActive(true);
    };

    const handleUpdateColumn = (data: ICreateUpdateFormValue) => {
        const title = data.title;
        dispatch(updateColumn({ boardId, columnId, title, order: 0 }));
        dispatch(resetUpdatedColumnTitle());
        setEditMode(false);
    };

    const handleDeleteColumn = () => {
        dispatch(deleteColumn({ boardId, columnId }));
    };


    const addTask = (formValue: ICreateUpdateFormValue) => {
        const data: createTaskData = {
            title: formValue.title,
            order: 0,
            description: formValue.description,
            userId,
            users: []
        };

        if (userId) {
            dispatch(createTask({ boardId, columnId, data }));
        }
    };

    return (
        <div>
            <div className={styles.column}>
                {editMode ?
                    <form onSubmit={handleSubmit(handleUpdateColumn)}>
                        <input type={'text'} {...register('title')} defaultValue={updatedColumnTitle}/>
                        <button>upd</button>
                    </form>
                    : <div onClick={handleClickUpdate}>{title}</div>
                }

                {/* <div className={styles.btn} onClick={handleClickUpdate}>update</div> */}
                {/* <Modal active={modalActive} setActive={setModalActive}> */}
                {/*     <CreateForm submitAction={handleUpdateColumn} closeWindow={setModalActive} */}
                {/*                       title={CreateUpdateFormTitles.UPDATE_COLUMN} */}
                {/*                       actionType={CreateUpdateFormAction.UPDATE} */}
                {/*                       page={ItemType.COLUMNS} */}
                {/*     /> */}
                {/* </Modal> */}

                <div className={styles.btn} onClick={() => setConfirmModalActive(true)}>delete</div>
                <Modal active={confirmModalActive} setActive={setConfirmModalActive}>
                    <DeleteConfirmForm submitActions={handleDeleteColumn} closeWindow={setConfirmModalActive} typeItem={DeletedTypeItem.COLUMN} />
                </Modal>

                <div className={styles.btn} onClick={() => setCreateModalActive(true)}>Add task</div>
                <Modal active={createModalActive} setActive={setCreateModalActive}>
                    <CreateForm submitAction={addTask} closeWindow={setCreateModalActive}
                                title={CreateUpdateFormTitles.CREATE_TASK} page={ItemType.TASK} />
                </Modal>

                {tasks.map(task => {
                    if (task.columnId === columnId && task.boardId === boardId) {
                        return <Task key={task._id} boardId={boardId} columnId={columnId} taskId={task._id}
                                     title={task.title} description={task.description} />;
                    }
                })}
            </div>
        </div>
    );
};
