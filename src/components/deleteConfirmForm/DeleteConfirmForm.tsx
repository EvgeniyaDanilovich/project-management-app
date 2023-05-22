import React from 'react';
import { DeleteConfirmFormProps } from '../../models/forms-interfaces';
import cn from 'classnames';
import styles from './DeleteConfirmForm.module.scss'

export const DeleteConfirmForm: React.FC<DeleteConfirmFormProps> = ({ submitActions, closeWindow, typeItem }) => {

    const handleDelete = () => {
        submitActions();
    };

    return (
        <div>
            <h3 className={cn('title20', 'marginBottom25')}>Do you want to delete this {typeItem}?</h3>
            <div className={styles.btns}>
                <div onClick={() => closeWindow(false)} className={styles.btn}>cancel</div>
                <div onClick={handleDelete} className={cn(styles.btn, styles.btn__red)}>delete</div>
            </div>
        </div>
    );
};
