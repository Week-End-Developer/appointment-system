import { useEffect, useState } from 'react';
import styles from './styles.module.scss'
import CreditCard from '../CreditCard/CreditCard';
import { useDispatch } from 'react-redux';
import { removeCardDetails, saveCardCVV, saveCardDateMonth, saveCardDateYear, saveCardName, saveCardNumber } from '../../features/reducers/appointmentSlice';

function Payment() {
    const [cardNumber, setCardNumber] = useState('');
    const [cardName, setCardName] = useState('');
    const [cardDateMonth, setCardDateMonth] = useState('');
    const [cardDateYear, setCardDateYear] = useState('');
    const [cardCVV, setCardCVV] = useState('');
    const [errors, setErrors] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        console.log("tetikkkk");
      dispatch(removeCardDetails());
    },[])

    const handleCardNumberChange = (e) => {
        const { value } = e.target;
        if (/^[0-9]{0,16}$/.test(value)) {
            setCardNumber(value);
            dispatch(saveCardNumber(value));
            setErrors(prevErrors => ({ ...prevErrors, cardNumber: '' }));
        }
    };

    const handleCardNameChange = (e) => {
        let value = e.target.value;
        if (!value) setCardName('');

        const uppercaseValue = value.toLocaleUpperCase('tr-TR');

        value = value.replace(/ı/g, 'I').toUpperCase();
        value = value.replace(/ğ/g, 'Ğ').toUpperCase();
        value = value.replace(/ü/g, 'Ü').toUpperCase();
        value = value.replace(/ş/g, 'Ş').toUpperCase();
        value = value.replace(/ö/g, 'Ö').toUpperCase();
        value = value.replace(/ç/g, 'Ç').toUpperCase();

        if (/^[a-zA-ZçÇğĞıİöÖşŞüÜ\s]+$/.test(uppercaseValue)) {
            setCardName(uppercaseValue);
            dispatch(saveCardName(uppercaseValue));
            setErrors('');
        }
    };

    const handleCardDateMonthChange = (e) => {
        const { value } = e.target;
        if (!value) setCardDateMonth('');

        if (/^(0[1-9]{0,1}|1[1-2]{0,1}?)$/.test(value)) {
            setCardDateMonth(value);
            dispatch(saveCardDateMonth(value));
            setErrors(prevErrors => ({ ...prevErrors, cardDateMonth: '' }));
        }
    };

    const handleCardDateYearChange = (e) => {
        const { value } = e.target;
        if (!value) setCardDateYear('');

        if (/^([2-9][2-9]{0,1}|[0-9][0-9]{0,1})$/.test(value)) {
            setCardDateYear(value);
            dispatch(saveCardDateYear(value));
            setErrors(prevErrors => ({ ...prevErrors, cardDateYear: '' }));
        }
    };

    const handleCardCVVChange = (e) => {
        const { value } = e.target;
        if (/^[0-9]{0,3}$/.test(value)) {
            setCardCVV(value);
            dispatch(saveCardCVV(value));
            setErrors(prevErrors => ({ ...prevErrors, cardCVV: '' }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (cardNumber && cardName && cardDateMonth && cardDateYear && cardCVV) {
            console.log('Form submitted successfully');
        } else {
            setErrors({
                cardNumber: cardNumber ? '' : 'Card number is required',
                cardName: cardName ? '' : 'Cardholder name is required',
                cardDateMonth: cardDateMonth ? '' : 'Expiration month is required',
                cardDateYear: cardDateYear ? '' : 'Expiration year is required',
                cardCVV: cardCVV ? '' : 'CVV is required',
            });
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.cardImageContainer}>
                <CreditCard
                    cardNumber={cardNumber}
                    cardName={cardName}
                    cardDateMonth={cardDateMonth}
                    cardDateYear={cardDateYear}
                    cardCVV={cardCVV}
                />
            </div>
            <div className={styles.cardDetailContainer}>
                <form id="payment-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="cardName">Kartın Üzerindeki İsim</label>
                        <input
                            className='form-control'
                            type="text"
                            id="cardName"
                            value={cardName}
                            onChange={handleCardNameChange}
                            placeholder="Kart sahibinin ismini giriniz."
                        />
                        {errors.cardName && <span className="error">{errors.cardName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="cardNumber">Kart Numarası</label>
                        <input
                            className='form-control'
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={handleCardNumberChange}
                            placeholder="Kart numaranızı giriniz."
                        />
                        {errors.cardNumber && <span className="error">{errors.cardNumber}</span>}
                    </div>

                    <div className={styles.bottomSide}>
                        <div className="form-group m-0">
                            <label htmlFor="cardDateMonth">Ay</label>
                            <input
                                className='form-control'
                                type="text"
                                id="cardDateMonth"
                                value={cardDateMonth}
                                onChange={handleCardDateMonthChange}
                                placeholder="MM"
                            />
                            {errors.cardDateMonth && <span className="error">{errors.cardDateMonth}</span>}
                        </div>
                        <div className="form-group m-0">
                            <label htmlFor="cardDateYear">Yıl</label>
                            <input
                                className='form-control'
                                type="text"
                                id="cardDateYear"
                                value={cardDateYear}
                                onChange={handleCardDateYearChange}
                                placeholder="YY"
                            />
                            {errors.cardDateYear && <span className="error">{errors.cardDateYear}</span>}
                        </div>
                        <div className="form-group m-0">
                            <label htmlFor="cardCVV">CVV</label>
                            <input
                                className='form-control'
                                type="text"
                                id="cardCVV"
                                value={cardCVV}
                                onChange={handleCardCVVChange}
                                placeholder="CVV"
                            />
                            {errors.cardCVV && <span className="error">{errors.cardCVV}</span>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Payment;
