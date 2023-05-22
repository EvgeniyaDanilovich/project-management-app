import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { TaskPreviewProps, UpdateTaskThunkDataBody } from '../../models/task-interfaces';
import { updateTask } from '../../redux/task-slice';
import { useAppDispatch } from '../../hooks/redux';
import { getUserId } from '../../utils/localStorage';

export const TaskPreview: React.FC<TaskPreviewProps> = ({ title, description,boardId,  columnId, taskId }) => {
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
            {editModeTitle
                ? <form onBlur={handleSubmit(handleUpdateTitle)}>
                    <input type={'text'} {...register('title')} defaultValue={currentTitle} autoFocus={true} />
                </form>
                : <div onClick={() => setEditModeTitle(true)}>{currentTitle}</div>
            }
            {editModeDescription
                ? <form onBlur={handleSubmit(handleUpdateDescription)}>
                    <input type={'text'} {...register('description')} defaultValue={currentDescription} autoFocus={true} />
                </form>
                : <div onClick={() => setEditModeDescription(true)}>Description: {currentDescription}</div>
            }
        </div>
    );
};