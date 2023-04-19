import React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAppSelector } from '../../hooks/redux';
import { ItemType } from '../../enums/enums';
import { CreateUpdateFormProps, ICreateUpdateFormValue } from '../../models/forms-interfaces';

export const CreateForm: React.FC<CreateUpdateFormProps> = (
    { submitAction, closeWindow, title, page }) => {

    // const [updatedTitle, setUpdatedTitle] = useState('');

    // const { updatedBoardTitle } = useAppSelector(state => state.boards);
    // const { updatedColumnTitle } = useAppSelector(state => state.columns);
    // const { updatedTaskTitle } = useAppSelector(state => state.task);
    // const { updatedTaskDescription } = useAppSelector(state => state.task);

    const userId = useAppSelector(state => state.auth.id);

    // useEffect(()=>{
    //     if (page === ItemType.BOARDS) {
    //             setUpdatedTitle(updatedBoardTitle);
    //     } else if (page === ItemType.COLUMNS) {
    //         // setUpdatedTitle(updatedColumnTitle);
    //     } else if(page === ItemType.TASK){
    //         setUpdatedTitle(updatedTaskTitle)
    //     }
    // },[updatedBoardTitle, updatedTaskTitle])

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
                    })} placeholder={'Title'} autoFocus={true} />
                    {errors?.title && <p>{errors?.title.message}</p>}
                </div>
`
                {page === ItemType.TASK ?
                    <div>
                        <input type={'text'} {...register('description',
                        //     {
                        //     required: 'Enter description',
                        //     minLength: { value: 3, message: 'Min length is 3 symbols' }
                        // }
                        )} placeholder={'Task description'} />
                        {/* {errors?.description && <p>{errors?.description.message}</p>} */}
                    </div> : undefined
                }

                <div>
                    <button disabled={!isValid}>Create</button>
                </div>
            </form>
        </>
    );
};
