import { createBrowserRouter, Navigate } from "react-router-dom";
import DashLayout from "../Layout/DashLayout ";
import NoticeLists from "@/components/Notice/NoticeLists/NoticeLists";
import NoticeAdd from "@/components/Notice/NoticeAdd/NoticeAdd";

let router = createBrowserRouter([
  {
    path: "/",
    // element: <Main></Main>,
    element: <DashLayout />,
    children: [
      // {
      //   index: true,
      //   element: <Navigate to="/" replace />,
      // },
      {
        path: "/notice/create",
        element: <NoticeAdd />,
      },
      {
        path: "/",
        element: <NoticeLists />,
      },
    ],
  },
]);

export default router;
