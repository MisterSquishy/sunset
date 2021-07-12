import { useLocation } from 'react-router-dom'

export const useDebug = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  return queryParams.get('debug')
}