import React from 'react';
import { DeleteConfirmFormProps } from '../../models/forms-interfaces';

export const DeleteConfirmForm: React.FC<DeleteConfirmFormProps> = ({submitActions, closeWindow, typeItem}) => {

    const handleDelete = () => {
        submitActions();
    }

    return (
        <div>
            <h3>Are you sure you want to delete the {typeItem}?</h3>
            <div onClick={() => closeWindow(false)}>cancel</div>
            <div onClick={handleDelete}>delete</div>
        </div>
    );
};
