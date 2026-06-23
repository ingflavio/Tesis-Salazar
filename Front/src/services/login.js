import { apiClient } from "./api";

export default function login(id, password) {
  return apiClient.post('auth/login', {
    'cedula': id,
    "password": password
  })
}