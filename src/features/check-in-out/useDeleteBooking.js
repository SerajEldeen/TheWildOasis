import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking as deleteBookingApi } from "../../services/apiBookings";

export function useDeleteBooking() {
  const queryClient = useQueryClient();
  const { mutate: deleteBooking, isloading: isDeleting } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      toast.success("booking Successfully deleted!");
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
    },
    onError: (err) => toast.error(err.message),
  });
  return { deleteBooking, isDeleting };
}
