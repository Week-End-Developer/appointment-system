import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { setToLocalStorage } from '../../features/reducers/appointmentSlice';
import paymentVerificationService from '../../services/paymentVerificationService';
import appointmentService from '../../services/appointmentService';

function AppointmentFooter() {
    const [continueDisabled, setContinueDisabled] = useState(true)
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const appointment = useSelector((state) => {
        return state?.appointmentReducer;
    });

    const locationPath = useSelector((state) => {
        return state?.locationReducer?.path;
    });

    useEffect(() => {
        function checkSectionStatus() {
            switch (locationPath) {
                case '/':
                case '/appointment-date-selection':
                    if (appointment.doctor_id && appointment.time && appointment.date) setContinueDisabled(false);
                    break;
                case '/complaint-pet-selection':
                    if (!appointment.complaint_Id) break;
                    if (appointment.doctor_detail?.profession === 'veterinarian' && !appointment.pet_Id) break;
                    setContinueDisabled(false);
                    break;
                case '/preview-payment-process':
                    setContinueDisabled(!paymentVerificationService.check(appointment));
                    break;
                default:
                    break;
            }
        }

        setContinueDisabled(true);
        checkSectionStatus();
    }, [appointment, locationPath]);



    function onContinueClick() {
        switch (locationPath) {
            case '/appointment-date-selection':
                navigate("/complaint-pet-selection");
                dispatch(setToLocalStorage());
                break;
            case '/':
                navigate("/complaint-pet-selection");
                dispatch(setToLocalStorage());
                break;
            case '/complaint-pet-selection':
                navigate("/preview-payment-process");
                dispatch(setToLocalStorage());
                break;
            case '/preview-payment-process':
                navigate("/appointment-completion");
                dispatch(setToLocalStorage());
                post();
                break;
            default:
                break;
        }
    }

    function onBackClick() {
        switch (locationPath) {
            case '/complaint-pet-selection':
                navigate("/appointment-date-selection");
                break;
            case '/preview-payment-process':
                navigate("/complaint-pet-selection");
                break;
            default:
                break;
        }
    }

    function post() {

        const date = appointment.date;
        const time = appointment.time;

        const [day, month, year] = date.split('-');
        const [hour, minute] = time.split(':');
        const startDate = new Date(year, month - 1, day, hour, minute);

        const endDate = new Date(startDate);
        endDate.setMinutes(startDate.getMinutes() + 30);

        const randomId = Math.floor(Math.random() * 1000);

        localStorage.setItem("last-id", randomId);

        const requestData = {
            id: 572,
            doctor_id: appointment.doctor_id,
            start_time: startDate.toLocaleString(),
            end_time: endDate.toLocaleString(),
            complaint_Id: appointment.complaint_Id,
            pet_Id: appointment.pet_Id,
            per_price: appointment.per_price,
            duration: appointment.duration,
            coupon_code: appointment.coupon_code.code,
            card_name: appointment.card_name,
            card_number: appointment.card_number,
            card_date_month: appointment.card_date_month,
            card_date_year: appointment.card_date_year,
            card_cvv: appointment.card_cvv
        }

        appointmentService.put(requestData);
    }

    return (
        <div className={styles.footerWrapper}>
            {locationPath !== '/appointment-date-selection' ? <button type="button" className="btn btn-light" onClick={onBackClick}>Geri</button> : <div></div>}
            <button type="button" className="btn btn-success" disabled={continueDisabled} onClick={onContinueClick}>
                {locationPath === '/preview-payment-process' ? 'Ödeme Yap ve Bitir' : 'Kaydet ve Devam Et'}
            </button>
        </div>
    );
}

export default AppointmentFooter;
