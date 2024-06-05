import { loginData } from "@/types/requestTypes/loginData";
import axios, { AxiosResponse } from "axios";

export async function login(credentials: loginData) {
  try {
    console.log("loginmetod körs");
    const response: AxiosResponse = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/login`,
      credentials,
      { withCredentials: true }
    );
    if (response.status === 200) {
      console.log("Login successful");
    }
  } catch (error) {
    console.log(error);
  }
}
