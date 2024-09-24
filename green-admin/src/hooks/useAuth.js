import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction, logoutAction } from "../redux/actions";
import useError from "./useError";

const useAuth = () => {
  const isLogged = useSelector((state) => state.isLogged);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { setError } = useError();

  const login = ({ username, password }) => {
    if (username !== "admin" || password !== "45rt89102") {
      localStorage.setItem("isLogged", false);
      return setError("Usuario o contraseña incorrectos");
    }
    localStorage.setItem("isLogged", true);
    dispatch(loginAction());
    navigate("/");
  };

  const logout = () => {
    dispatch(logoutAction());

    localStorage.setItem("isLogged", false);
    navigate("/");
  };

  const checkLogin = () => {
    useEffect(() => {
      if (localStorage.getItem("isLogged") !== "true") {
        dispatch(logoutAction());
        navigate("/login");
      } else {
        dispatch(loginAction());
      }
    }, [isLogged]);
  };

  return { isLogged, checkLogin, login, logout };
};

export default useAuth;
