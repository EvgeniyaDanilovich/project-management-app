import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { TaskPreviewProps, UpdateTaskThunkDataBody } from '../../models/task-interfaces';
import { deleteTask, updateTask } from '../../redux/task-slice';
import { useAppDispatch } from '../../hooks/redux';
import { getUserId } from '../../utils/localStorage';
import { Modal } from '../modal/Modal';
import { DeleteConfirmForm } from '../deleteConfirmForm/DeleteConfirmForm';
import { DeletedTypeItem } from '../../enums/enums';
import { ReactComponent as TaskIcon } from '../../assets/images/task.svg';
import { ReactComponent as DescriptionIcon } from '../../assets/images/description.svg';
import styles from './TaskPreview.module.scss';
import cn from 'classnames';


export const TaskPreview: React.FC<TaskPreviewProps> = ({ title, description, boardId, columnId, taskId }) => {
    const dispatch = useAppDispatch();
    const { register, handleSubmit } = useForm<ICreateUpdateFormValue>();

    const [currentTitle, setCurrentTitle] = useState<string>(title);
    const [currentDescription, setCurrentDescription] = useState<string | undefined>(description);
    const [editModeTitle, setEditModeTitle] = useState<boolean>(false);
    const [editModeDescription, setEditModeDescription] = useState<boolean>(false);

    const userId = getUserId();

    const handleUpdateTitle = (formData: ICreateUpdateFormValue) => {
        setEditModeTitle(false);
        setCurrentTitle(formData.title);

        const data: UpdateTaskThunkDataBody = {
            title: formData.title,
            order: 0,
            description: description,
            columnId,
            userId,
            users: []
        };
        dispatch(updateTask({ boardId, columnId, taskId, data }));
    };

    const handleUpdateDescription = (formData: ICreateUpdateFormValue) => {
        setEditModeDescription(false);
        setCurrentDescription(formData.description);

        const data: UpdateTaskThunkDataBody = {
            title: title,
            order: 0,
            description: formData.description,
            columnId,
            userId,
            users: []
        };
        dispatch(updateTask({ boardId, columnId, taskId, data }));
    };

    return (
        <div>
            <div className={styles.block}>
                <div className={cn(styles.row)}>
                    <TaskIcon className={styles.icon}/>Task name
                </div>

                {editModeTitle
                    ? <form onBlur={handleSubmit(handleUpdateTitle)}>
                        <input className={'input input__s'} type={'text'} {...register('title')} defaultValue={currentTitle} autoFocus={true} />
                    </form>
                    : <div className={'title18'} onClick={() => setEditModeTitle(true)}>{currentTitle}</div>
                }
            </div>
            <div className={styles.block}>
                <div className={cn(styles.row)}>
                    <DescriptionIcon className={styles.icon} />Description
                </div>
                {editModeDescription
                    ? <form onBlur={handleSubmit(handleUpdateDescription)}>
                        <textarea className={'input input__s'} {...register('description')} defaultValue={currentDescription} autoFocus={true} />
                    </form>
                    : <div className={'text14'} onClick={() => setEditModeDescription(true)}>{currentDescription}</div>
                }
            </div>
        </div>
    );
};