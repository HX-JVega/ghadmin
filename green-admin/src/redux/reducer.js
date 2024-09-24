const initialState = {
  user: null,
  error: null,
  isLogged: false,
  isLoading: false,
  categoriasCertificaciones: [],
  certificaciones: [],
  certificacionDetail: null,
  master: [],
  fabricantes: [],
  productos: [],
  distribuidores: [],
  users: [],
  productoDetail: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CATEGORIAS_CERTIFICACIONES":
      return {
        ...state,
        categoriasCertificaciones: action.payload,
      };

    case "GET_CERTIFICACIONES":
      return {
        ...state,
        certificaciones: action.payload,
      };

    case "GET_FABRICANTES":
      return {
        ...state,
        fabricantes: action.payload,
      };

    case "GET_PRODUCTOS":
      return {
        ...state,
        productos: action.payload,
      };

    case "GET_DISTRIBUIDORES":
      return {
        ...state,
        distribuidores: action.payload,
      };

    case "GET_MASTER":
      return {
        ...state,
        master: action.payload,
      };

    case "GET_CERTIFICACION_DETAIL":
      return {
        ...state,
        certificacionDetail: action.payload,
      };

    case "GET_USERS":
      return {
        ...state,
        users: action.payload,
      };

    case "SET_LOADING":
      return {
        ...state,
        isLoading: action.payload,
      };

    case "LOGIN":
      return {
        ...state,
        isLogged: true,
      };

    case "LOGOUT":
      return {
        ...state,
        isLogged: false,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    case "CLEAN_ERROR":
      return {
        ...state,
        error: null,
      };

    case "GET_PRODUCTO_DETAIL":
      return {
        ...state,
        productoDetail: action.payload,
      };

    default:
      return state;
  }
};

export default reducer;
