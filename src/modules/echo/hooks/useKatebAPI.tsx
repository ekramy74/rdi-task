import { useMutation } from "@tanstack/react-query";
import { KatebAPI } from "../../../services/katebAPI/katebAPI";

type katebAPIRes = {
  katebFn: (body: FormData) => void;
  isKatebLoading: boolean;
  katebError: any;
  isKatebError: any;
  isKatebSuccess: boolean;
  katebRes: any;
};
export const useKateb = (): katebAPIRes => {
  const {
    mutate: katebFn,
    isLoading: isKatebLoading,
    error: katebError,
    isError: isKatebError,
    isSuccess: isKatebSuccess,
    data: katebRes,
  } = useMutation({
    mutationFn: (body: FormData) => {
      return KatebAPI(body);
    },
  });
  return {
    katebFn,
    isKatebLoading,
    isKatebError,
    katebError,
    isKatebSuccess,
    katebRes,
  };
};
