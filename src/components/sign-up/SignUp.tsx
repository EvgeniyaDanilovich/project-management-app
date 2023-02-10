import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { singUpTC } from '../../redux/auth-reducer';
import { ISignUpFormValues } from '../../models/forms-interfaces';

export const SignUp: React.FC = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ISignUpFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<ISignUpFormValues> = (data) => {
        // @ts-ignore
        dispatch(singUpTC(data));
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type={'text'} {...register('name', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Email'} />
                    {errors?.name && <p>{errors?.name.message}</p>}
                </div>
                <div>
                    <input type={'text'} {...register('login', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Email'} />
                    {errors?.login && <p>{errors?.login.message}</p>}
                </div>
                <div>
                    <input type={'password'} {...register('password', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Password'} />
                    {errors?.password && <p>{errors?.password.message}</p>}
                </div>

                <div>
                    <button disabled={!isValid}>Sign up</button>
                </div>
            </form>
        </>
    );
};
