import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../pages/HomePage/Home";
import Login from "../pages/Authentication/LoginPage/Login";
import Register from "../pages/Authentication/Register/Register";
import ErrorPage from "../pages/Error/ErrorPage";
import Community from "../pages/Community/Community";
import Trips from "../pages/Trips/Trips";
import About from "../pages/About/About";
import TourGuideProfile from "../pages/TourGuideProfile/TourGuideProfile";
import PackageDetails from "../pages/PackageDetails/PackageDetails";
import DeshboardLayout from "../Layouts/DeshboardLayout";
import MyBookings from "../pages/Deashboard/MyBookings/MyBookings";
import ManageProfile from "../pages/Deashboard/ManageProfile/ManageProfile";
import AddStory from "../pages/Deashboard/AddStory.jsx/AddStory";
import ManageStories from "../pages/Deashboard/ManageStories/ManageStories";
import JoinAsTourGuide from "../pages/Deashboard/JoinAsTourGuide/JoinAsTourGuide";
import MyAssignedTours from "../pages/Deashboard/MyAssignedTours/MyAssignedTours";
import ManageCandidates from "../pages/Deashboard/ManageCandidates/ManageCandidates";
import AddPackage from "../pages/Deashboard/AddPackage/AddPackage";
import Payment from "../pages/Deashboard/Payment/Payment";
import EditStory from "../pages/Deashboard/ManageStories/EditStory";
import ManageUsers from "../pages/Deashboard/ManageUsers/ManageUsers";
import GuideDetails from "../Component/GuideDetails/GuideDetails";
import PrivetRoute from "../PrivetRoute/PrivetRoute";
import Forbidden from "../Component/Forbidden/Forbidden";
import AdminRoute from "../PrivetRoute/AdminRoute";
import ToureGuideRoute from "../PrivetRoute/ToureGuideRoute";
import ForgetPass from "../Component/FogetPass/ForgetPass";

export const router = createBrowserRouter([
    {
        path: '/',
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path: '/community',
                Component: Community
            },
            {
                path: '/trips',
                Component: Trips
            },
            {
                path: '/about',
                Component: About
            },
            {
                path: '/guides_details/:id',
                Component: TourGuideProfile
            },
            {
                path: '/packageDetails/:id',
                Component: PackageDetails,
            },
        ]
    },
    {
        path: '/login',
        Component: Login,
    },
    {
        path: '/register',
        Component: Register,
    },
    {
        path: '/*',
        Component: ErrorPage,
    },
    {
        path: '/forbidden',
        Component: Forbidden,
    },
    {
        path: '/deshboard/payment/:bookingId',
        Component: Payment,
    },
    {
        path: '/forgetPass',
        Component: ForgetPass,
    },
    {
        path: '/deshboard',
        element: <PrivetRoute>
            <DeshboardLayout></DeshboardLayout>
        </PrivetRoute>,
        children: [
            {
                index: true,
                Component: ManageProfile
            },
            {
                path: 'myBookings',
                Component: MyBookings
            },
            {
                path: 'addStory',
                Component: AddStory
            },
            {
                path: 'mangeStories',
                Component: ManageStories
            },
            {
                path: 'asTourGuide',
                Component: JoinAsTourGuide
            },
            {
                path: 'myAssignedTours',
                element:<ToureGuideRoute>
                    <MyAssignedTours></MyAssignedTours>
                </ToureGuideRoute>
            },
            {
                path: 'manageCandidates',
                element:<AdminRoute>
                    <ManageCandidates></ManageCandidates>
                </AdminRoute>
            },
            {
                path: 'added-packge',
                element:<AdminRoute>
                    <AddPackage></AddPackage>
                </AdminRoute>
            },
            {
                path: '/deshboard/edit-story/:id',
                Component: EditStory
            },
            {
                path: '/deshboard/manageUsers',
                element: <AdminRoute>
                    <ManageUsers></ManageUsers>
                </AdminRoute>
            },
        ]
    },
])