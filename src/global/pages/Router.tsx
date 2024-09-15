import {createBrowserRouter, RouterProvider} from "react-router-dom";
import LoginPage from "@/_user/pages/LoginPage.tsx";
import MainPage from "@/global/pages/main/MainPage.tsx";
import DashboardPage from "@/global/pages/dashboard/DashboardPage.tsx";
import ChallengeGroupPage from "@/_challenge-group/pages/ChallengeGroupPage.tsx";
import DashboardLayout from "@/global/pages/dashboard/DashboardLayout.tsx";
import RootLayout from "@/global/pages/RootLayout.tsx";
import MyPage from "@/_user/pages/MyPage.tsx";
import ManageAccountPage from "@/_user/pages/ManageAccountPage.tsx";
import {ChallengeReviewPage} from "@/_challenge-review/pages/ChallengeReviewPage.tsx";


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