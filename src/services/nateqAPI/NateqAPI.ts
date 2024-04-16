import axios, { AxiosError } from "axios";
import { Endpoints } from "../../utils/APIConfig";

export interface NateqBody {
  text: string;
}

export const NateqAPI = async (body: NateqBody) => {
  const res = await axios.post(Endpoints.nateqAPI, body, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (res.status !== 200) throw new AxiosError(res.data.description);
  return res;
};
