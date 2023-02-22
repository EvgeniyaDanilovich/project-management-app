import React, { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignInFormValues } from '../../models/forms-interfaces';
import { singInTC } from '../../redux/auth-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { Navigate } from 'react-router-dom';

export const SignIn: React.FC = () => {
    const dispatch = useAppDispatch();
    const { isAuth } = useAppSelector((state) => state.auth);
    console.log(isAuth);

    const { register, handleSubmit, formState: { errors, isValid } } = useForm<ISignInFormValues>({
        mode: 'onChange'
    });

    // useEffect(() => {
    //     localStorage.clear()
    // }, [])

    if (isAuth) return <Navigate to="/boards" />;

    const onSubmit: SubmitHandler<ISignInFormValues> = (data) => {
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
