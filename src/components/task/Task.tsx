import React, { useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { Modal } from '../modal/Modal';
import { DeletedTypeItem } from '../../enums/enums';
import { deleteTask } from '../../redux/task-slice';
import { TaskProps } from '../../models/task-interfaces';
import { DeleteConfirmForm } from '../deleteConfirmForm/DeleteConfirmForm';
import { TaskPreview } from '../taskPreview/TaskPreview';

export const Task: React.FC<TaskProps> = ({ title, boardId, columnId,taskId, description }) => {
    const dispatch = useAppDispatch();
    const [previewModal, setPreviewModal] = useState<boolean>(false);
    const [deleteModalActive, setDeleteModalActive] = useState<boolean>(false);

    const onDeleteTask = () =>{
        dispatch(deleteTask({boardId, columnId, taskId}));
    }

    return (
        <div>
            <div onClick={() => setPreviewModal(true)}>{title}</div>
            <Modal active={previewModal} setActive={setPreviewModal}>
               <TaskPreview title={title} description={description} boardId={boardId} columnId={columnId} taskId={taskId}/>
            </Modal>
            <div onClick={()=> setDeleteModalActive(true) }>delete</div>
            <Modal active={deleteModalActive} setActive={setDeleteModalActive}>
                <DeleteConfirmForm submitActions={onDeleteTask} closeWindow={setDeleteModalActive} typeItem={DeletedTypeItem.TASK} />
            </Modal>
        </div>
    );
};
