import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss'
import couponCodeService from '../../services/couponCodeSevice';
import { useEffect, useState } from 'react';
import { setAppointment, setCouponCode } from '../../features/reducers/appointmentSlice';

function Preview({ couponDisabled }) {
    const [coupons, setCoupons] = useState([]);
    const [couponUser, setCouponUser] = useState([]);
    const [coupon, setCoupon] = useState([]);
    const dispatch = useDispatch();

    const appointment = useSelector((state) => {
        return state?.appointmentReducer;
    });

    useEffect(() => {
        if (!appointment.date) {
            const state = localStorage.getItem('state');
            const stateObj = JSON.parse(state);
            if (state) dispatch(setAppointment(stateObj));
            setCoupon(stateObj?.coupon_code);
        }

        if (!couponDisabled) {
            const fetchCoupons = async () => {
                try {
                    const coupons = await couponCodeService.getCoupons();
                    setCoupons(coupons);
                } catch (error) {
                    console.error('Error fetching pets:', error);
                }
            };
            fetchCoupons();
        }

        if (appointment.coupon_code) {
            setCoupon(appointment.coupon_code);
        }
    }, [])

    const handleCouponCodeChange = (e) => {
        const { value } = e.target;
        setCouponUser(value);
    };

    function onCouponCodeClick() {
        const result = coupons.find(x => x.code === couponUser.toUpperCase());
        if (result) {
            setCoupon(result);
            dispatch(setCouponCode(result));
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.innerSectionWrapper}>
                    <div className={styles.section}>
                        <span className={styles.doctorName}>{appointment.doctor?.title}</span>
                        <span className={styles.profession}>({appointment.doctor_detail?.profession})</span>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.label}>Randevu Tarihi</div>
                        <div>{appointment.date}</div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.label}>Randevu Saati</div>
                        <div>{appointment.time}</div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.label}>Randevu Süresi</div>
                        <div>{appointment.duration} dk</div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.label}>Pet Adı</div>
                        <div>{appointment.pet?.name}</div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.label}>Şikayet</div>
                        <div>{appointment.complaint_Id}</div>
                    </div>
                    <div className={styles.section} hidden={couponDisabled}>
                        <div className="form-group m-0">
                            <input
                                className='form-control'
                                type="text"
                                id="coupon-code"
                                value={couponUser}
                                onChange={handleCouponCodeChange}
                                placeholder='Kupon Kodu'
                            />
                        </div>
                        <button type="button" className="btn btn-secondary" onClick={() => onCouponCodeClick()}>Kodu Kullan</button>
                    </div>
                    <div className={`${styles.section} ${styles.paymentDetail}`}>
                        <div>
                            <div className={styles.label}>Dakika Başı Ücret</div>
                            <div>{appointment.per_price} TL</div>
                        </div>
                        <div>
                            <div className={styles.label}>Randevu Süresi</div>
                            <div>{appointment.duration} dk</div>
                        </div>
                        <div>
                            <div className={styles.label}>Tutar</div>
                            <div>{appointment.duration * appointment.per_price} TL</div>
                        </div>
                        <div>
                            <div className={styles.label}>İndirim <span style={{ marginLeft: '6px' }}>{coupon && coupon.code && <span>({coupon.code})</span>}</span></div>
                            <div>{coupon && coupon.discount_amount ? coupon.discount_amount : 0} TL</div>
                        </div>
                    </div>
                    <div className={styles.section}>
                        <div className={styles.label}>Toplam Tutar</div>
                        <div> {(appointment.duration * appointment.per_price) - (coupon && coupon.discount_amount ? coupon.discount_amount : 0)} TL</div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default Preview;
