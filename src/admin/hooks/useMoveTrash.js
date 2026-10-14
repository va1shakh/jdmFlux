import {
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { updateDeleteStatus } from "../api/updateDeleteStatus";
import Swal from "sweetalert2";

export function useMoveToTrash() {
  const queryClient = useQueryClient();
  const MoveToTrashMutation = useMutation({
    mutationFn: updateDeleteStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      Swal.fire({
        title: "Moved to Trash",
        text: "Your product has been successfully moved to trash.",
        icon: "success",
        confirmButtonText: "Done",
        confirmButtonColor: "#0057ff",
      });
    },
    onError: () => {
      Swal.fire({
        title: "Can't move to trash",
        text: "Something went wrong",
        icon: "error",
        confirmButtonText: "Ok",
        confirmButtonColor: "#b50e02",
      });
    },
  });

  const handleMoveToTrash = (id) => {
    MoveToTrashMutation.mutate({id, isDeleted: true})
  }

  return handleMoveToTrash;
}
