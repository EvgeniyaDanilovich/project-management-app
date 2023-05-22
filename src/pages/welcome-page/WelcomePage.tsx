import React from 'react';
import styles from './WelcomePage.module.scss';
import cn from 'classnames';
import { ReactComponent as Icon1 } from '../../assets/images/main-01.svg';
import { ReactComponent as Icon2 } from '../../assets/images/main-02.svg';
import { ReactComponent as Icon3 } from '../../assets/images/main-03.svg';
import { ReactComponent as Icon4 } from '../../assets/images/main-04.svg';
import { ReactComponent as Icon5 } from '../../assets/images/main-05.svg';
import { ReactComponent as Technl1 } from '../../assets/images/technl1.svg';
import { ReactComponent as Technl2 } from '../../assets/images/technl2.svg';
import { ReactComponent as Technl3 } from '../../assets/images/technl3.svg';
import { ReactComponent as Technl4 } from '../../assets/images/technl4.svg';
import Anim1 from '../../assets/images/anim1.jpg';
import { Footer } from '../../components/footer/Footer';

export const WelcomePage: React.FC = () => {

    return (
        <div>
            <section className={`${styles.mainWrapper}`}>
                <div>
                    <Icon2 className={`${styles.icon} ${styles.icon3}`} />
                    <Icon3 className={`${styles.icon} ${styles.icon4}`} />
                </div>
                <div className={styles.box}>
                    <Icon1 className={styles.icon1} />
                    <h1 className={`${styles.title} ${styles.title1}`}>Project</h1>
                    <h1 className={`${styles.title} ${styles.title2}`}>management</h1>
                    <h1 className={`${styles.title} ${styles.title3}`}>software</h1>
                    <Icon1 className={styles.icon2} />
                </div>
                <div className={`text ${styles.text}`}>Our software will help you organize your workflow, set tasks, customer information, team management</div>
                <div className={`btn`}>Get started</div>
                <div>
                    <Icon4 className={`${styles.icon} ${styles.icon5}`} />
                    <Icon5 className={`${styles.icon} ${styles.icon6}`} />
                </div>
            </section>

            <section className={`${styles.aboutWrapper} ${styles.wrapperMargin} container`}>
                <div className={styles.aboutBox}>
                    <div className={styles.anim}><img src={Anim1} alt="anim" /></div>
                    <div className={styles.aboutInfo}>
                        <div className={styles.aboutNumber}>1</div>
                        <div>
                            <h2 className={cn('title45', styles.aboutTitle)}>User</h2>
                            <h2 className={cn('title45', styles.aboutTitle)}>registration</h2>
                        </div>
                        <div className={`text ${styles.aboutText}`}>You can add and remove users, edit their accounts, assign task performers</div>
                    </div>
                </div>
                <div className={styles.aboutBox}>
                    <div className={styles.anim}><img src={Anim1} alt="anim" /></div>
                    <div className={styles.aboutInfo}>
                        <div className={styles.aboutNumber}>2</div>
                        <div>
                            <h2 className={cn('title45', styles.aboutTitle)}>Task</h2>
                            <h2 className={cn('title45', styles.aboutTitle)}>management</h2>
                        </div>
                        <div className={`text ${styles.aboutText}`}>You can manage projects by creating multiple boards, columns and tasks with the ability to
                            edit its
                        </div>
                    </div>
                </div>
            </section>

            <section className={`${styles.technologiesWrapper} ${styles.wrapperMargin}`}>
                <h2 className={cn ('title45', styles.technologiesTitle)}>The following technologies were used in the development of the application</h2>
                <div className={styles.technologiesRow}>
                    <div className={styles.technologiesItem}>
                        <Technl1 className={cn(styles.technologiesIcon)} />
                        <p className={styles.technologiesText}>React</p>
                    </div>
                    <div className={styles.technologiesItem}>
                        <Technl2 className={cn(styles.technologiesIcon)} />
                        <p className={styles.technologiesText}>Redux Toolkit</p>
                    </div>
                    <div className={styles.technologiesItem}>
                        <Technl3 className={cn(styles.technologiesIcon)} />
                        <p className={styles.technologiesText}>React Hook Form</p>
                    </div>
                    <div className={styles.technologiesItem}>
                        <Technl4 className={cn(styles.technologiesIcon)} />
                        <p className={styles.technologiesText}>TypeScript</p>
                    </div>
                </div>
            </section>
        </div>
    );
};
