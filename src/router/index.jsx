import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/error-page';
import NewOrgPage from '../features/org profiles/NewOrgPage';
import OrganizationsPage from '../features/org profiles/OrganizationsPage';
import EditFormPage from '../features/dynamic forms/EditFormPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/org',
        children: [
          {
            path: 'all',
            element: <OrganizationsPage />,
          },
          {
            path: 'new',
            element: <NewOrgPage />,
          },
        ],
      },
      {
        path: '/form',
        children: [
          {
            path: 'edit',
            element: <EditFormPage />,
          },
        ],
      },
    ],
  },
]);
