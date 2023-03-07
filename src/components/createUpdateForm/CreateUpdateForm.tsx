import React, { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import {  ICreateUpdateFormValue } from '../../models/boards-interfaces';
import { useAppSelector } from '../../hooks/redux';
import { ItemType } from '../../enums/enums';
import { CreateUpdateFormProps } from '../../models/forms-interfaces';

export const CreateUpdateForm: React.FC<CreateUpdateFormProps> = (
    { submitAction, closeWindow, title, actionType, page }) => {

    const [updatedTitle, setUpdatedTitle] = useState('');

    const { updatedBoardTitle } = useAppSelector(state => state.boards);
    const { updatedColumnTitle } = useAppSelector(state => state.columns);

    const userId = useAppSelector(state => state.auth.id);

    useEffect(()=>{
        if (page === ItemType.BOARDS) {
                setUpdatedTitle(updatedBoardTitle);
        } else if (page === ItemType.COLUMNS) {
            setUpdatedTitle(updatedColumnTitle);
        }
    },[updatedBoardTitle, updatedColumnTitle])

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ICreateUpdateFormValue>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<ICreateUpdateFormValue> = (data) => {
        if (userId && data.title) {
            submitAction(data);
            reset();
            closeWindow(false);
        }
    };

    return (
        <>
            <h3>{title}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type={'text'} {...register('title', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Title'} defaultValue={updatedTitle} autoFocus={true} />
                    {errors?.title && <p>{errors?.title.message}</p>}
                </div>
                {/* <div> */}
                {/*     <input type={'text'} {...register('description', { */}
                {/*         required: 'Enter description', */}
                {/*         minLength: { value: 3, message: 'Min length is 3 symbols' } */}
                {/*     })} placeholder={'Board description'} /> */}
                {/*     {errors?.description && <p>{errors?.description.message}</p>} */}
                {/* </div> */}

                <div>
                    <button disabled={!isValid}>{actionType}</button>
                </div>
            </form>
        </>
    );
};
