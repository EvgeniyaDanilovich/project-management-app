import React from 'react';
import cn from 'classnames';
import styles from './CardCreate.module.scss';
import { ReactComponent as Plus } from '../../assets/images/plus.svg';

export interface CreateCardProps{
    text: string;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    minVersion: boolean
}

export const CardCreate: React.FC<CreateCardProps> = ({text, setModalActive, minVersion}) => {
    return (
        <div onClick={() => setModalActive(true)} className={cn(styles.createCard, 'boardCard', { [styles.minHeight]: minVersion})}>
            <Plus className={styles.plusMax} />
            <p>{text}</p>
        </div>
    );
};
