import { useDispatch, useSelector } from 'react-redux';
import styles from './styles.module.scss'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { setToLocalStorage } from '../../features/reducers/appointmentSlice';
import paymentVerificationService from '../../services/paymentVerificationService';

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
                    console.log("Giriyor.");
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

    return (
        <div className={styles.footerWrapper}>
            {locationPath !== '/appointment-date-selection' ? <button type="button" className="btn btn-light" onClick={onBackClick}>Geri</button> : <div></div>}
            <button type="button" className="btn btn-success" disabled={continueDisabled} onClick={onContinueClick}>
                {locationPath === '/preview-payment-process' ? 'Ödeme Yap ve Bitir' : 'Kaydet ve Devam Et' }
            </button>
        </div>
    );
}

export default AppointmentFooter;
