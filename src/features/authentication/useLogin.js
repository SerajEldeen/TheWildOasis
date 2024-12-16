import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) =>
      loginApi({
        email,
        password,
      }),
    onSuccess: () => {
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR" + err);
      toast.error("incorrect Email or Password");
    },
  });
  return { login, isPending };
}
