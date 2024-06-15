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
import ViewBannedOrgs from '../features/ban/ViewBannedOrgs';
import ViewAllBadges from '../features/gamification/badges/ViewAllBadges';
import ViewAllRules from '../features/gamification/rules/ViewAllRules';
import NewRulePage from '../features/gamification/rules/NewRulePage';
import ViewAllPoints from '../features/gamification/points/ViewAllPoints';
import ViewShop from '../features/gamification/shop/ViewShop';
import ViewShopTickets from '../features/gamification/shop/ViewShopTickets';
import ViewWithdraws from '../features/ticketing packages/ViewWithdraws';
import ViewGiftcards from '../features/giftcards/ViewGiftcards';

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
                path: 'withdraws',
                element: <ViewWithdraws />,
            },
            {
                path: 'giftcards',
                element: <ViewGiftcards />,
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
                path: 'gamification',
                children: [
                    {
                        path: 'rules',
                        children: [
                            { index: true, element: <ViewAllRules /> },
                            { path: 'new', element: <NewRulePage /> },
                        ],
                    },
                    {
                        path: 'badges',
                        element: <ViewAllBadges />,
                    },
                    {
                        path: 'points',
                        element: <ViewAllPoints />,
                    },
                    {
                        path: 'shop',
                        element: <ViewShop />,
                        children: [
                            {
                                index:true,
                                element: <ViewShopTickets />,
                            },
                        ],
                    },
                ],
            },

            {
                path: 'blocked',
                children: [
                    {
                        path: 'orgs',
                        element: <ViewBannedOrgs />,
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
