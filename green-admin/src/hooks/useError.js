import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";

const useError = () => {
  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);

  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "error",
        title: "Ha ocurrido un error",
        text: error,
        confirmButtonText: "Ok",
        confirmButtonColor: "#f27474",
        willClose: () => {
          dispatch({
            type: "CLEAN_ERROR",
          });
        },
      });
    }
  }, [error]);

  const setError = (error) => {
    dispatch({
      type: "SET_ERROR",
      payload: error,
    });
  };

  return { setError };
};

export default useError;
