import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import ErrorPage from '../pages/error-page';
import ConfigOrgPage from '../features/org profiles/ConfigOrgPage';
import NewOrgPage from '../features/org profiles/NewOrgPage';
import OrganizationsPage from '../features/org profiles/OrganizationsPage';

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
            path: '/org/all',
            element: <OrganizationsPage />,
          },
          {
            path: '/org/new',
            element: <NewOrgPage />,
          },
        ],
      },
    ],
  },
]);
