import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { Modal } from '../modal/Modal';
import { TaskProps } from '../../models/task-interfaces';
import { TaskPreview } from '../taskPreview/TaskPreview';
import styles from './Task.module.scss';
import { DeleteConfirmForm } from '../deleteConfirmForm/DeleteConfirmForm';
import { DeletedTypeItem } from '../../enums/enums';
import { deleteTask } from '../../redux/task-slice';
import { ReactComponent as Delete } from '../../assets/images/delete.svg';
import cn from 'classnames';

export const Task: React.FC<TaskProps> = ({ title, boardId, columnId, taskId, description }) => {
    const dispatch = useAppDispatch();
    const [previewModal, setPreviewModal] = useState<boolean>(false);

    const [deleteModalActive, setDeleteModalActive] = useState<boolean>(false);

    const onDeleteTask = () => {
        dispatch(deleteTask({ boardId, columnId, taskId }));
    };

    return (
        <>
            <div className={styles.taskWrapper} >
                <div className={cn( styles.title, 'title18')} onClick={() => setPreviewModal(true)}>{title}</div>
                {/* <div className={styles.deleteBtn} onClick={() => setDeleteModalActive(true)}><Delete /></div> */}
                <div className={cn(styles.deleteBtn, 'text14')} onClick={() => setDeleteModalActive(true)}>Delete</div>
            </div>
            <Modal active={previewModal} setActive={setPreviewModal}>
                <TaskPreview title={title} description={description} boardId={boardId} columnId={columnId} taskId={taskId} />
            </Modal>

            <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
                <DeleteConfirmForm submitActions={onDeleteTask} closeWindow={setDeleteModalActive} typeItem={DeletedTypeItem.TASK} />
            </Modal>
        </>
    );
};
