import axios from "axios"
import { ReturnUpdate } from "../types/user"

export function handleAxiosError(
  error: unknown,
  errorHandler: (errorMessage: string) => ReturnUpdate
) {
  console.error('Request failed', error)
  const errorMessage =
    axios.isAxiosError(error) && error.message
      ? error.response?.data.error
      : ''
  return errorHandler(errorMessage)
}
