import { useContext } from "react"
import Context from "../Context";

const useAuth = () => {
  const { accessToken, initialState, dispatch } = useContext(Context)
  const linkSuccess = Boolean(localStorage.getItem('link_success'))
  const isItemAccess = accessToken || localStorage.getItem('access_token') ? true : false

  const logout = () => {
    console.log("logout")
    localStorage.clear();
    dispatch({
      type: "SET_STATE",
      state: initialState,
    });
    window.location.reload()
  }

  return { linkSuccess, accessToken, isItemAccess, logout }
}

export default useAuth