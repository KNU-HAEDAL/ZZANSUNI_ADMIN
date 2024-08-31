import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "@/pages/main/LoginPage.tsx";
import MainPage from "@/pages/main/MainPage.tsx";
import DashboardPage from "@/pages/dashboard/DashboardPage.tsx";
import ChallengeGroupPage from "@/pages/dashboard/ChallengeGroupPage.tsx";
import DashboardLayout from "@/pages/dashboard/DashboardLayout.tsx";
import RootLayout from "@/pages/RootLayout.tsx";
import MyPage from "@/pages/dashboard/MyPage.tsx";
import ManageAccountPage from "@/pages/dashboard/ManageAccountPage.tsx";
import {ChallengeReviewPage} from "@/pages/dashboard/ChallengeReviewPage.tsx";


const router = createBrowserRouter([
  {path: "/", element: <RootLayout/>, children: [
      {path: "", element: <MainPage/>},
      {
        path: "/dashboard", element: <DashboardLayout/>,
        children: [
          {path: "", element: <DashboardPage/>},
          {path: "challenge-group", element: <ChallengeGroupPage/>},
          {path: "challenge-review", element: <ChallengeReviewPage/>},
          {path:"my", element:<MyPage/>},
          {path: "manage-account", element: <ManageAccountPage/>},
        ],
      },
      {path: "login", element: <LoginPage/>},
    ]},
]);


export default function Router() {


  return (
    <RouterProvider router={router}/>
  );
}