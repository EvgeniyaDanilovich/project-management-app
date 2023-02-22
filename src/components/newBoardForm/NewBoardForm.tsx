import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignInFormValues } from '../../models/forms-interfaces';

export interface INewBoardFormValue{
    title: string;
    description: string
}

export const NewBoardForm = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<INewBoardFormValue>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<INewBoardFormValue> = (data) => {
    };

    return (
        <>
            <h3>Create board</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type={'text'} {...register('title', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Board title'} />
                    {errors?.title && <p>{errors?.title.message}</p>}
                </div>
                <div>
                    <input type={'text'} {...register('description', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Board description'} />
                    {errors?.description && <p>{errors?.description.message}</p>}
                </div>

                <div>
                    <button disabled={!isValid}>Create</button>
                </div>
            </form>
        </>
    );
}
