import { useLocation } from 'react-router-dom'

export const useTimeOverride = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  return queryParams.get('time')
}