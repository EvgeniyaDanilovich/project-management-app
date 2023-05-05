import React, { useEffect, useState } from 'react';
import styles from './Column.module.scss';
import { Modal } from '../modal/Modal';
import { CreateForm } from '../createForm/CreateForm';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { deleteColumn, resetUpdatedColumnTitle, setUpdatedColumnTitle, updateColumn } from '../../redux/columns-slice';
import { CreateUpdateFormTitles, DeletedTypeItem, ItemType } from '../../enums/enums';
import { DeleteConfirmForm } from '../deleteConfirmForm/DeleteConfirmForm';
import { Task } from '../task/Task';
import { createTask, getTasksInColumn, resetTasks } from '../../redux/task-slice';
import { createTaskData } from '../../models/api-interfaces';
import { ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { useForm } from 'react-hook-form';
import cn from 'classnames';
import { ReactComponent as Delete } from '../../assets/images/delete.svg';
import { ReactComponent as Plus } from '../../assets/images/plus.svg';

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
        setEditMode(true);
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
            <div className={styles.column}>
                {editMode ?
                    <form onSubmit={handleSubmit(handleUpdateColumn)}>
                        <input type={'text'} {...register('title')} defaultValue={updatedColumnTitle} />
                        <button>upd</button>
                    </form>
                    : <div className={styles.top}>
                        <div className={cn('title20')} onClick={handleClickUpdate}>{title}</div>
                        <Delete className={styles.btnDelete} onClick={() => setConfirmModalActive(true)} />
                    </div>
                }

                <Modal active={confirmModalActive} setActive={setConfirmModalActive}>
                    <DeleteConfirmForm submitActions={handleDeleteColumn} closeWindow={setConfirmModalActive} typeItem={DeletedTypeItem.COLUMN} />
                </Modal>

                <div className={styles.tasks}>
                    {tasks.map(task => {
                        if (task.columnId === columnId && task.boardId === boardId) {
                            return <Task key={task._id} boardId={boardId} columnId={columnId} taskId={task._id}
                                         title={task.title} description={task.description} />;
                        }
                    })}
                </div>

                <div className={styles.addBox}>
                    <Plus className={styles.plus} />
                    <div className={styles.btnAdd} onClick={() => setCreateModalActive(true)}>add new task</div>
                </div>
                <Modal active={createModalActive} setActive={setCreateModalActive}>
                    <CreateForm submitAction={addTask} closeWindow={setCreateModalActive}
                                title={CreateUpdateFormTitles.CREATE_TASK} page={ItemType.TASK} />
                </Modal>
            </div>
    );
};
