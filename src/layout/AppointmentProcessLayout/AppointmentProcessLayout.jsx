import React, { Fragment, useEffect } from 'react';
import { Outlet } from 'react-router';
import AppointmentStepper from '../../components/AppointmentStepper/AppointmentStepper';
import AppointmentFooter from '../../components/AppointmentFooter/AppointmentFooter';
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux';
import { setAppointment } from '../../features/reducers/appointmentSlice';

const AppointmentProcessLayout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const state = localStorage.getItem('state');
    const stateObj = JSON.parse(state);
    if (state) dispatch(setAppointment(stateObj));
  }, [])

  return (
    <Fragment>
      <AppointmentStepper />
      <div className={styles.appointmentOutlet}>
        <Outlet />
      </div>
      <AppointmentFooter />
    </Fragment>
  );
}

export default AppointmentProcessLayout;