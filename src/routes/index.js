import { Navigate, useRoutes } from "react-router-dom";
import LoginPage from "../pages/auth-pages/login-page";
import Register from "../pages/auth-pages/signup-page";
import DashboardLayout from "../pages/dashboard/DashboardLayout";
import Demo from "../pages/demo";
import DashboardAppPage from "../pages/dashboard/pages/DashboardAppPage";
import NotFound from "../pages/NotFound";
import PrivateRoute from "./privateRoute";
import GuruPrivateRoute from "./guruPrivateRoute";
import GuruDashboardLayout from "../guru-pages/dashboard/DashboardLayout";
import GuruDashboardAppPage from "../guru-pages/dashboard/pages/DashboardAppPage";
import GuruLoginPage from "../guru-pages/auth-pages/login-page";
import GuruRegister from "../guru-pages/auth-pages/signup-page";
import StandardExams from "../guru-pages/dashboard/pages/StandardExams";
import StandardExam from "../pages/dashboard/pages/StandardExam";

export default function Router() {
    const routes = useRoutes([
        {
            path: '/',
            //element: 
            element: <PrivateRoute />
        },
        {
            path: '/login',
            element: <LoginPage />,
        },
        {
            path: '/login/:token',
            element: <LoginPage />,
        },
        {
            path: '/sign-up',
            element: <Register />
        },
        {
            path: '/dashboard',
            element: <DashboardLayout />,
            children: [
                { element: <Navigate to="/dashboard/app" />, index: true },
                { path: 'app', element: <DashboardAppPage /> },
                { path: 'standard-exams', element: <StandardExam /> },
                { path: 'competitive-exams', element: <StandardExam /> },
                { path: 'entrance-exams', element: <StandardExam /> },                
            ],
        },
        {
            path: '/guru',
            element: <GuruPrivateRoute />
        },
        {
            path: '/guru/dashboard',
            element: <GuruDashboardLayout />,
            children: [
                { element: <Navigate to="/guru/dashboard/app" />, index: true },
                { path: 'app', element: <GuruDashboardAppPage /> },
                { path: 'standard-exams', element: <StandardExams /> },
                { path: 'competitive-exams', element: <Demo /> },
                { path: 'entrance-exams', element: <Demo /> },                
            ]
        },
        {
            path: '/guru/login',
            element: <GuruLoginPage />
        },
        {
            path: '/guru/login/:token',
            element: <GuruLoginPage />
        },
        {
            path: '/guru/sign-up',
            element: <GuruRegister />
        },
        {
            path: "*",
            element: <NotFound />
        }
    ])
    return routes;
}