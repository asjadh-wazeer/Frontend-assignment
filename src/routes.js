import { useRoutes, Navigate } from "react-router-dom";
import Login from "./Login";
import BarChart from "./components/BarChat";
import {data} from "./datas"

export default function Router() {
  return useRoutes([
    {
      path: "",
      element: <Login />,
    },
    {
      path: "/chart",
      element: <BarChart data={data} />,
    },
  ]);
}
