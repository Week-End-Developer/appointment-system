import styles from './styles.module.scss'
import card from '../../assets/svg/card.svg';
import date from '../../assets/svg/date.svg';
import plus from '../../assets/svg/plus.svg';
import { useSelector } from 'react-redux';

function AppointmentStepper() {

    const locationPath = useSelector((state) => {
        return state?.locationReducer?.path;
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.line}>

                </div>
                <div className={`${styles.section} ${locationPath === '/appointment-date-selection' && styles.activeSection}`}>
                    <div className={styles.iconWrapper}>
                        <img src={date} alt="" />
                    </div>
                    <div className={styles.text}>
                        <span>Randevu ve</span>
                        <span>Tarih Seçimi</span>
                    </div>
                </div>
                <div className={`${styles.section} ${locationPath === '/complaint-pet-selection' && styles.activeSection}`}>
                    <div className={styles.iconWrapper}>
                        <img src={plus} alt="" />
                    </div>
                    <div className={styles.text}>
                        <span>Şikayet ve Pet</span>
                        <span>Seçimi</span>
                    </div>
                </div>
                <div className={`${styles.section} ${locationPath === '/preview-payment-process' && styles.activeSection}`}>
                    <div className={styles.iconWrapper}>
                        <img src={card} alt="" />
                    </div>
                    <div className={styles.text}>
                        <span>Önizleme ve</span>
                        <span>Ödeme İşlemleri</span>
                    </div>
                </div>
            </div>
        </div >
    );
}

export default AppointmentStepper;
