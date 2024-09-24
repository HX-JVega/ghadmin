import axios from "axios";
import Swal from "sweetalert2";

export const getAllCertificaciones = () => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    fetch("https://www.greenhomes.com.ar/green-back/getCertificaciones.php")
      .then((res) => res.json())

      .then((data) => {
        dispatch({
          type: "GET_CERTIFICACIONES",
          payload: data.certificaciones,
        });
      })

      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
        fetch(
          "https://www.greenhomes.com.ar/green-back/getCategoriasCertificaciones.php"
        )
          .then((res) => res.json())
          .then((data) => {
            dispatch({
              type: "GET_CATEGORIAS_CERTIFICACIONES",
              payload: data.categorias,
            });
          });
      });
  };
};

export const getCertificacionDetail = (id) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    fetch(
      `https://www.greenhomes.com.ar/green-back/getCertificacionById.php?id=${id}`
    )
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_CERTIFICACION_DETAIL",
          payload: data.certificacion[0],
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const createCertificacion = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .post(
        `https://www.greenhomes.com.ar/green-back/createCertificacion.php`,
        data
      )
      .then((res) => {
        dispatch(getAllCertificaciones());
        Swal.fire({
          title: "Certificacion creada",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al crear certificacion",
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const deleteCertificacion = (id) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .delete(
        `https://www.greenhomes.com.ar/green-back/deleteCertificacion.php`,
        {
          data: { id },
        }
      )
      .then(() => {
        dispatch(getAllCertificaciones());
        Swal.fire({
          title: "Certificacion eliminada",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al eliminar certificacion",
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const getAllMaster = () => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    fetch("https://www.greenhomes.com.ar/green-back/getMaster.php")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_MASTER",
          payload: data,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const getFabricantes = () => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    fetch("https://www.greenhomes.com.ar/green-back/getFabricantes.php")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_FABRICANTES",
          payload: data,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const bulkCreateFabricantes = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .post(
        `https://www.greenhomes.com.ar/green-back/bulkCreateFabricantes.php`,
        data
      )
      .then((res) => {
        dispatch(getFabricantes());
        Swal.fire({
          title: "Fabricantes creados",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al crear fabricantes",
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const getProductos = () => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    fetch("https://www.greenhomes.com.ar/green-back/getProductos.php")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_PRODUCTOS",
          payload: data,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const getDistribuidores = () => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });
    fetch("https://www.greenhomes.com.ar/green-back/getDistribuidores.php")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_DISTRIBUIDORES",
          payload: data,
        });
      })
      .catch((err) => {
        dispatch({
          type: "SET_ERROR",
          payload: "Error al obtener los Distribuidores",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const createDistribuidor = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .post(
        `https://www.greenhomes.com.ar/green-back/createDistribuidor.php`,
        data
      )
      .then((res) => {
        console.log(res);
        dispatch(getDistribuidores());
        Swal.fire({
          title: "Distribuidor creado",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al crear distribuidor",
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const bulkCreateDistribuidores = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .post(
        `https://www.greenhomes.com.ar/green-back/bulkCreateDistribuidores.php`,
        {
          distribuidores: data,
        }
      )
      .then((res) => {
        dispatch(getDistribuidores());
        Swal.fire({
          title: "Distribuidores creados",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al crear distribuidores",
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const deleteFabricante = (id) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .delete(`https://www.greenhomes.com.ar/green-back/deleteFabricante.php`, {
        data: { id },
      })
      .then(() => {
        dispatch(getFabricantes());
        Swal.fire({
          title: "Fabricante eliminado",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al eliminar fabricante",
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const createFabricante = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .post(
        `https://www.greenhomes.com.ar/green-back/createFabricante.php`,
        data
      )
      .then((res) => {
        dispatch(getFabricantes());
        Swal.fire({
          title: "Fabricante creado",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al crear fabricante",
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const loginAction = () => {
  return (dispatch) => {
    dispatch({ type: "LOGIN" });
  };
};

export const logoutAction = () => {
  return (dispatch) => {
    dispatch({ type: "LOGOUT" });
  };
};

export const updateRegister = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .post(`https://www.greenhomes.com.ar/green-back/updateRegister.php`, data)
      .then((res) => {
        dispatch(getAllMaster());
        Swal.fire({
          title: "Registro actualizado",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((err) => {
        Swal.fire({
          title: "Error al actualizar registro",
          icon: "error",
          confirmButtonText: "Ok",
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });

        dispatch(data.action());
      });
  };
};

export const getUsers = (data) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    fetch("https://www.greenhomes.com.ar/green-back/getUsers.php", data)
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "GET_USERS",
          payload: data,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};

export const getProductoDetail = (id) => {
  return (dispatch) => {
    dispatch({ type: "SET_LOADING", payload: true });

    axios
      .post(`https://www.greenhomes.com.ar/green-back/getProductoDetail.php`, {
        id: id,
      })
      .then((data) => {
        console.log(data);
        dispatch({
          type: "GET_PRODUCTO_DETAIL",
          payload: data.data,
        });
      })
      .finally(() => {
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };
};
