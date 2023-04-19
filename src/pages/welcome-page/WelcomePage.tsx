import React from 'react';
import styles from './WelcomePage.module.scss';
import { ReactComponent as Icon1 } from '../../assets/images/main-01.svg';

export const WelcomePage: React.FC = () => {

    return (
        <div>
            <div>
                <Icon1 />
                <div className={`${styles.title}`}>Project</div>
                <div>management</div>
                <div>software</div>
                <Icon1 />
            </div>
            <div></div>
            <div></div>
        </div>
    );
};
