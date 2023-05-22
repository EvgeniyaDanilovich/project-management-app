import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getColumns } from '../../redux/columns-slice';
import { Modal } from '../../components/modal/Modal';
import { CreateForm } from '../../components/createForm/CreateForm';
import { CreateUpdateFormTitles, ItemType } from '../../enums/enums';
import { NavLink, useParams } from 'react-router-dom';
import { Column } from '../../components/column/Column';
import { getBoardById, resetUpdatedBoardTitle, updateBoard } from '../../redux/boards-slice';
import styles from './ColumnsPage.module.scss';
import { ICreateUpdateFormValue } from '../../models/forms-interfaces';
import { useForm } from 'react-hook-form';
import { getUserId } from '../../utils/localStorage';
import cn from 'classnames';
import { ReactComponent as Arrow } from '../../assets/images/arrow.svg';
import { ButtonWithoutBorder } from '../../ui/buttonWithoutBorder/ButtonWithoutBorder';
import { CardCreate } from '../../ui/cardCreate/CardCreate';

export const ColumnsPage = () => {
    const { register, handleSubmit } = useForm<ICreateUpdateFormValue>();
    const { boardId } = useParams();
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState<boolean>(false);
    const [editMode, setEditMode] = useState<boolean>(false);

    // @ts-ignore
    const userId = getUserId();
    const { columns } = useAppSelector(state => state.columns);
    const { currentBoardTitle } = useAppSelector(state => state.boards);

    useEffect(() => {
        if (boardId) {
            dispatch(getColumns(boardId));
            dispatch(getBoardById(boardId));
        }
    }, [boardId]);

    const handleCreateColumn = (data: ICreateUpdateFormValue) => {
        const title = data.title;
        if (boardId) {
            dispatch(createColumn({ boardId, title, order: 0 }));
        }
    };

    const handleUpdateBoardTitle = (data: ICreateUpdateFormValue) => {
        if (boardId && userId) {
            dispatch(updateBoard({ boardId, title: data.title, owner: userId, users: [] }));
            dispatch(resetUpdatedBoardTitle());
            setEditMode(false);
        }
    };

    return (
        <div className={cn(styles.pageWrapper, 'wrapperPadding')}>
            <div className={styles.top}>
                <NavLink to={'/boards'}>
                    <Arrow className={styles.arrow} />
                    Back
                </NavLink>
                {editMode ?
                    <form onSubmit={handleSubmit(handleUpdateBoardTitle)}>
                        <input className={'input input__s'} type={'text'} {...register('title')} defaultValue={currentBoardTitle} />
                        <button className={'buttonUpdate'}>Update</button>
                    </form>
                    : <div className={'title30'} onClick={() => setEditMode(true)}>{currentBoardTitle}</div>
                }

                <ButtonWithoutBorder text={'New column'} setModalActive={setModalActive} />
                <Modal active={modalActive} setActive={setModalActive}>
                    <CreateForm submitAction={handleCreateColumn} closeWindow={setModalActive}
                                title={CreateUpdateFormTitles.CREATE_COLUMN} page={ItemType.COLUMNS}
                    />
                </ Modal>
            </div>
            <div className={styles.columnsWrapper}>
                <div className={styles.columnsContent}>
                    {columns.map((column) => {
                            if (boardId) {
                                return <Column key={column._id} title={column.title} boardId={boardId}
                                               columnId={column._id} />;
                            }
                        }
                    )}
                    <CardCreate text={'create new column'} setModalActive={setModalActive} minVersion={true} />
                </div>
            </div>
        </div>
    );
};
