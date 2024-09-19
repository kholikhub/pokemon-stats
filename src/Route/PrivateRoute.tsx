import { Navigate, Outlet,} from "react-router-dom";

function PrivateRoute() {
  const isLogin = localStorage.getItem('token') !== null;
  return isLogin ? <Outlet/> : <Navigate to="formLogin"/>;
}

export default PrivateRoute;
