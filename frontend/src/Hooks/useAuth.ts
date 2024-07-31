const useAuth = () => {
  const linkSuccess = Boolean(localStorage.getItem('link_success'))
  const accessToken = localStorage.getItem('access_token')
  const isItemAccess = accessToken ? true : false

  return { linkSuccess, accessToken, isItemAccess }
}

export default useAuth