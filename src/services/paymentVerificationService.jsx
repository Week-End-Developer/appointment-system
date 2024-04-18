const paymentVerificationService = {
    check: (appointment) => {
        console.log(appointment);
        if (
            !appointment.card_name || 
            !appointment.card_number ||
            !appointment.card_date_month ||
            !appointment.card_date_year ||
            !appointment.card_cvv
        ) return false;

        if (appointment.card_name.length === 0)
            return false;
        if (appointment.card_number.toString().length !== 16)
            return false;
        if (appointment.card_date_month && appointment.card_date_month.toString().length !== 2)
            return false;
        if (appointment.card_date_year && appointment.card_date_year.toString().length !== 2)
            return false;
        if (appointment.card_cvv && appointment.card_cvv.length !== 3)
            return false;

        return true;
    },
};

export default paymentVerificationService;
