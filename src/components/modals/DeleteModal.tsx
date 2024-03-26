import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { useDeleteQuestionMutation } from "@/services/questions/questionsApi";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 200,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 768px)": {
    width: "90%",
  },
};

interface CreateProps {
  open: boolean;
  id: string;
  handleClose: () => void;
}

const DeleteModal: React.FC<CreateProps> = ({ open, handleClose, id }) => {
  const [loading, setloading] = React.useState(false);

  const [deleteQuestion, { isLoading, isError, isSuccess }] =
    useDeleteQuestionMutation();

  const handleDelete = async () => {
    await deleteQuestion(id);
    console.log("from delete", id);
    if (isSuccess) {
      handleClose();
      toast.success("Question deleted successfully");
    }
  };
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div className="flex flex-col justify-between h-full">
            <h4 className="text-2xl font-bold text-green text-left ">
              Delete Question
            </h4>

            <div>
              <p className="text-[16px] font-medium text-gray">
                Are you sure you want to delete this question?
              </p>
            </div>

            <div className="flex items-start justify-end  gap-5">
              <button
                onClick={handleClose}
                className="text-sm text-green border border-green py-2 px-10 rounded-lg"
              >
                Cancel
              </button>
              <button
                disabled={isLoading}
                onClick={handleDelete}
                className="text-sm text-white bg-red-600 py-2 px-10  rounded-lg"
              >
                Delete
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DeleteModal;
