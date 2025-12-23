import { createBrowserRouter } from "react-router-dom";
import DashLayout from "../Layout/DashLayout ";
import NoticeLists from "@/components/Notice/NoticeLists/NoticeLists";

let router = createBrowserRouter([
  {
    path: "/",
    // element: <Main></Main>,
    element: <DashLayout />,
    children: [
      {
        path: "/",
        element: <NoticeLists />,
      },
    ],
  },
]);

export default router;
