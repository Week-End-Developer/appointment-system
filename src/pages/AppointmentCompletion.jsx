import { Fragment } from "react";
import Preview from "../components/Preview/Preview";
import AppointmentCompletedNotification from "../components/AppointmentCompletedNotification/AppointmentCompletedNotification";

const AppointmentCompletion = () => {
    return (
        <Fragment>
            <AppointmentCompletedNotification />
            <Preview couponDisabled={true} />
        </Fragment>
    )
};

export default AppointmentCompletion;
