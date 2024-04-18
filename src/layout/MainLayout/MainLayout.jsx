import React, { useEffect } from 'react';
import Header from '../../components/Header/Header';
import { Outlet, useLocation } from 'react-router';
import styles from './styles.module.scss'
import { useDispatch } from 'react-redux';
import { updatePath } from '../../features/reducers/locationSlice';

const MainLayout = () => {

  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    dispatch(updatePath(location.pathname));
  }, [location]);

  return (
    <>
      <Header />
      <div className={styles.mainBody}>
        <Outlet />
      </div>
    </>
  );
}

export default MainLayout;