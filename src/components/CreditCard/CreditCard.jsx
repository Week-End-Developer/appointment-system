import { Fragment } from 'react';
import styles from './styles.module.scss'
import CardChip from '../../assets/svg/cardChip.svg';
import MasterCard from '../../assets/svg/mastercard.svg';

const CreditCard = ({ cardNumber, cardName, cardDateMonth, cardDateYear, cardCVV }) => {

    function cardNumberFormatter(numbers) {
        return numbers.replace(/(\d{4})(?=\d)/g, '$1  ');
    }

    return (
        <Fragment>
            <div className={styles.creditCard}>
                <div className={styles.cardTitle}><span>Credit</span><span>Card</span></div>
                <div className={styles.bankText}>BANK</div>
                <div className={styles.cardNumber}>{cardNumberFormatter(cardNumber)}</div>
                <div className={styles.cardName}>{cardName}</div>
                {cardCVV && <div className={styles.cardCVV}>CVV: {cardCVV}</div>}
                <div className={styles.cardExpirationDate}>{cardDateMonth}{cardDateMonth && cardDateYear && <>/</>}{cardDateYear}</div>
                <img src={CardChip} className={styles.cardChip} alt="" />
                <img src={MasterCard} className={styles.masterCard} alt="" />
            </div>
        </Fragment>
    );
};

export default CreditCard;