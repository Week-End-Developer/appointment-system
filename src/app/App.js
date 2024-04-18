// import { Provider } from 'react-redux';
import '../App.scss';
import AppointmentDateSelectionPage from '../pages/AppointmentDateSelectionPage';
import ComplaintPetSelectionPage from '../pages/ComplaintPetSelectionPage';
import PreviewPaymentProcessPage from '../pages/PreviewPaymentProcessPage';
import { Route, RouterProvider, createRoutesFromElements } from 'react-router';
import MainLayout from '../layout/MainLayout/MainLayout';
import { createBrowserRouter } from 'react-router-dom';
import AppointmentProcessLayout from '../layout/AppointmentProcessLayout/AppointmentProcessLayout';
import AppointmentCompletion from '../pages/AppointmentCompletion';

function App() {
  const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route path="/" element={<AppointmentProcessLayout />}>
        <Route path="/" element={<AppointmentDateSelectionPage />} />
        <Route path="appointment-date-selection" element={<AppointmentDateSelectionPage />} />
        <Route path="complaint-pet-selection" element={<ComplaintPetSelectionPage />} />
        <Route path="preview-payment-process" element={<PreviewPaymentProcessPage />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Route>
        <Route path="appointment-completion" element={<AppointmentCompletion />} />
    </Route>
  ))

  return (
    <RouterProvider router={router} />
  );
}

export default App;
