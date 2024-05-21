import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import NewOrgPage from '../features/org profiles/NewOrgPage';
import OrganizationsPage from '../features/org profiles/OrganizationsPage';
import ErrorPage from '../pages/error-page';
import ViewPackagesPage from '../features/ticketing packages/ViewPackagesPage';
import LoginPage from '../pages/login';
import AccountPage from '../features/account/AccountPage';
import FeaturedEventsPage from '../features/featured events/FeaturedEventsPage';
import ViewAttendeesPage from '../features/attendees/ViewAttendeesPage';
import ViewTransactionsPage from '../features/ticketing packages/ViewTransactionsPage';
import ViewBannedAttendees from '../features/ban/ViewBannedAttendees';

export const router = createBrowserRouter([
    {
        path: 'login',
        element: <LoginPage />,
    },
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <AccountPage />,
            },
            {
                path: '/org',
                children: [
                    {
                        index: true,
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
            {
                path: 'transactions',
                element: <ViewTransactionsPage />,
            },
            {
                path: 'featured',
                element: <FeaturedEventsPage />,
            },
            {
                path: 'attendees',
                element: <ViewAttendeesPage />,
            },

            {
                path: 'blocked',
                children: [
                    {
                        path: 'orgs',
                        element: <ViewBannedAttendees />,
                    },
                    {
                        path: 'attendees',
                        element: <ViewBannedAttendees />,
                    },
                ],
            },
        ],
    },
]);
