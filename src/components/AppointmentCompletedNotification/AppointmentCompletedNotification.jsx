import styles from './styles.module.scss'
import CalendarDone from '../../assets/svg/calendarDone.svg'

function AppointmentCompletedNotification() {

    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                <img src={CalendarDone} alt="" />
            </div>
            <div className={styles.title}>
                Randevu kaydınız alınmıştır.
            </div>
            <div className={styles.content}>
                <p>Randevu özetiniz aşağıdaki gibidir.</p>
                <p>
                    Randevu kaydınızda değişiklik veya yeni randevu almak için aşağıdaki linkleri kullanabilirsiniz.
                </p>
            </div>
            <div className={styles.buttons}>
                <button type="button" className="btn btn-primary">Yeni Randevu Al</button>
                <button type="button" className="btn btn-primary">Randevuyu Güncelle</button>
                <button type="button" className="btn btn-primary">Randevuyu İptal Et</button>
            </div>

        </div>
    );
}

export default AppointmentCompletedNotification;
