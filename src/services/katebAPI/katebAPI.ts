import axios, { AxiosError } from "axios";
import { Endpoints } from "../../utils/APIConfig";

export const KatebAPI = async (body: FormData) => {
  const res = await axios.post(Endpoints.katebAPI, body, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  if (res.status !== 200) throw new AxiosError(res.data.description);
  return res;
};
