import { useMutation } from "@tanstack/react-query";
import { NateqAPI, NateqBody } from "../../../services/nateqAPI/NateqAPI";

type NateqAPIRes = {
  nateqFn: (body: NateqBody) => void;
  isNateqLoading: boolean;
  nateqError: any;
  isNateqError: any;
  isNateqSuccess: boolean;
  nateqRes: any;
};
export const useNateq = (): NateqAPIRes => {
  const {
    mutate: nateqFn,
    isLoading: isNateqLoading,
    error: nateqError,
    isError: isNateqError,
    isSuccess: isNateqSuccess,
    data: nateqRes,
  } = useMutation({
    mutationFn: (body: NateqBody) => {
      return NateqAPI(body);
    },
  });
  return {
    nateqFn,
    isNateqLoading,
    isNateqError,
    nateqError,
    isNateqSuccess,
    nateqRes,
  };
};
