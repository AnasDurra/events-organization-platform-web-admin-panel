import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../AppLayout';
import NewOrgPage from '../features/org profiles/NewOrgPage';
import OrganizationsPage from '../features/org profiles/OrganizationsPage';
import ErrorPage from '../pages/error-page';
import ViewPackagesPage from '../features/ticketing packages/ViewPackagesPage';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
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
                path: 'packages',
                element: <ViewPackagesPage />,
            },
        ],
    },
]);
