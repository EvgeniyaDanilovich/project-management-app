import React from 'react';
import styles from './Footer.module.scss';
import cn from 'classnames';

export const Footer = () => {
    return (
        <div className={cn(styles.footer, 'wrapperPadding')}>
            <p className={styles.text}>©Evgeniya Danilovich, 2023</p>
            <p className={styles.text}>Development by <a target={'_blank'} href={'https://github.com/EvgeniyaDanilovich'}>Evgeniya Danilovich</a></p>
            <p className={styles.text}>Design by <a target={'_blank'} href={'https://www.behance.net/kate_shpadaruk'}>Kate Shpadaruk</a></p>
        </div>
    );
};
