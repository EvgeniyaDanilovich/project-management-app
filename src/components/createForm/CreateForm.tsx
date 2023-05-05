import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';
import { ItemType } from '../../enums/enums';
import { CreateUpdateFormProps, ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { ButtonBorder } from '../../ui/buttonBorder/ButtonBorder';
import cn from 'classnames';

export const CreateForm: React.FC<CreateUpdateFormProps> = (
    { submitAction, closeWindow, title, page }) => {

    const userId = useAppSelector(state => state.auth.id);

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
            <h3 className={cn('marginBottom25' ,'title30')}>{title}</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={'inputBox'}>
                    <input type={'text'} {...register('title', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Title'} autoFocus={true} className={'input'} />
                    {errors?.title && <p>{errors?.title.message}</p>}
                </div>

                {page === ItemType.TASK ?
                    <div className={'inputBox'}>
                        <input type={'text'} {...register('description',
                        //     {
                        //     required: 'Enter description',
                        //     minLength: { value: 3, message: 'Min length is 3 symbols' }
                        // }
                        )} placeholder={'Task description'}  className={'input'}/>
                        {/* {errors?.description && <p>{errors?.description.message}</p>} */}
                    </div> : undefined
                }

                <div>
                    <ButtonBorder text={'Create'}  isValid={isValid} />
                    {/* <button disabled={!isValid}>Create</button> */}
                </div>
            </form>
        </>
    );
};
