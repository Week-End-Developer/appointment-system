import Payment from "../components/Payment/Payment";
import Preview from "../components/Preview/Preview";


const PreviewPaymentProcessPage = () => {
    return (
        <div className="responsive-6-6">
            <div className="container">
                <div className="left-column">
                    <Payment />
                </div>
                <div className="right-column">
                    <Preview />
                </div>
            </div>
        </div>
    )
};

export default PreviewPaymentProcessPage;
