import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "@/pages/main/LoginPage.tsx";
import MainPage from "@/pages/main/MainPage.tsx";
import DashboardPage from "@/pages/dashboard/DashboardPage.tsx";
import ChallengeGroupPage from "@/pages/dashboard/ChallengeGroupPage.tsx";
import DashboardLayout from "@/pages/dashboard/DashboardLayout.tsx";

const router = createBrowserRouter([
  {index: true, path: "/", element: <MainPage/>},
  {path: "/login", element: <LoginPage/>},
  {
    path: "/dashboard", element: <DashboardLayout/>,
    children: [
      {path: "", element: <DashboardPage/>},
      {path: "challenge-group", element: <ChallengeGroupPage/>},
    ],
  },
]);

export default function Router() {


  return (
    <RouterProvider router={router}/>
  );
}