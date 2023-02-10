import React from 'react';
import { useDispatch } from 'react-redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { singInTC } from '../../redux/auth-reducer';
import { ISignInFormValues } from '../../models/forms-interfaces';

export const SignIn: React.FC = () => {
    const dispatch = useDispatch();

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ISignInFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<ISignInFormValues> = (data) => {
        // @ts-ignore
        dispatch(singInTC(data));
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
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
                    <button disabled={!isValid}>Sign in</button>
                </div>
            </form>
        </>
    );
};
