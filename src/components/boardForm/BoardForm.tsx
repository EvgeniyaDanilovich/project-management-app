import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BoardFormProps, IBoardFormValue } from '../../models/boards-interfaces';
import { resetCurrentBoardTitle } from '../../redux/boards-slice';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

export const BoardForm: React.FC<BoardFormProps> = ({ submitAction, closeWindow, keyWord }) => {
    const dispatch = useAppDispatch();
    const { currentBoardTitle } = useAppSelector(state => state.boards);
    const userId = useAppSelector(state => state.auth.id);

    const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<IBoardFormValue>({
        mode: 'onChange'
    });

    const onSubmit: SubmitHandler<IBoardFormValue> = (data) => {
        if (userId && data.title) {
            submitAction(data);
            dispatch(resetCurrentBoardTitle())
            reset();
            closeWindow(false);
        }
    };

    return (
        <>
            <h3>{keyWord} board</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type={'text'} {...register('title', {
                        required: 'Enter text please',
                        minLength: { value: 3, message: 'Min length is 3 symbols' }
                    })} placeholder={'Board title'} defaultValue={currentBoardTitle} autoFocus={true} />
                    {errors?.title && <p>{errors?.title.message}</p>}
                </div>
                {/* <div> */}
                {/*     <input type={'text'} {...register('description', { */}
                {/*         required: 'Enter text please', */}
                {/*         minLength: { value: 3, message: 'Min length is 3 symbols' } */}
                {/*     })} placeholder={'Board description'} /> */}
                {/*     {errors?.description && <p>{errors?.description.message}</p>} */}
                {/* </div> */}

                <div>
                    <button disabled={!isValid}>{keyWord}</button>
                </div>
            </form>
        </>
    );
};
