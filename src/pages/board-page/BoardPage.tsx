import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { createColumn, getColumns } from '../../redux/columns-slice';
import { Modal } from '../../components/modal/Modal';
import { CreateUpdateForm } from '../../components/createUpdateForm/CreateUpdateForm';
import { CreateUpdateFormAction, CreateUpdateFormTitles } from '../../enums/enums';
import { useParams } from 'react-router-dom';
import { ICreateUpdateFormValue } from '../../models/boards-interfaces';
import { Column } from '../../components/column/Column';

export const BoardPage = () => {
    const { boardId } = useParams();
    const dispatch = useAppDispatch();
    const [modalActive, setModalActive] = useState<boolean>(false);

    const { columns } = useAppSelector(state => state.columns);

    const boardIdState = useAppSelector(state => state.boards.currentBoardId);

    useEffect(() => {
        if (boardIdState) {
            dispatch(getColumns(boardIdState));
        }
    }, []);

    const handleCreateColumn = (data: ICreateUpdateFormValue) => {
        const title = data.title;
        if (boardId) {
            dispatch(createColumn({ boardId, title, order: 0 }));
        }
    };

    return (
        <div>
            <div onClick={() => setModalActive(true)}>Create column</div>
            <Modal active={modalActive} setActive={setModalActive}>
                <CreateUpdateForm submitAction={handleCreateColumn} closeWindow={setModalActive}
                                  title={CreateUpdateFormTitles.CREATE_COLUMN}
                                  actionType={CreateUpdateFormAction.CREATE} />
            </ Modal>
            {columns.map(column => <Column key={column._id} title={column.title}/>)}
        </div>
    );
};
