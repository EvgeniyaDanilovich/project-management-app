import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUpFormValues } from '../../models/forms-interfaces';
import { useAppDispatch } from '../../hooks/redux';
import { singUpTC } from '../../redux/auth-slice';
import { NavLink } from 'react-router-dom';

export const SignUp: React.FC = () => {
    const dispatch = useAppDispatch();

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<ISignUpFormValues>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<ISignUpFormValues> = (data) => {
        dispatch(singUpTC(data));
        reset();
    };

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type={'text'} {...register('name', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Name'} />
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

                <div>
                    Already have an account?
                    <NavLink to="/login"> Sign in</NavLink>
                </div>
            </form>
        </>
    );
};
