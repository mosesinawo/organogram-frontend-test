import * as React from "react";
import Box from "@mui/material/Box";

import Modal from "@mui/material/Modal";
import InputModal from "../inputs/InputText";
import { LiaTimesSolid } from "react-icons/lia";
import { IoIosAdd } from "react-icons/io";
import { useAddNewQuestionMutation } from "@/services/questions/questionsApi";
import toast from "react-hot-toast";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  height: 483,
  overflowY: "scroll",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 768px)": {
    width: "90%",
    height: "90%",
    top: "5%",
    left: "5%",
    transform: "translate(0, 0)",
  },
};

interface CreateProps {
  open: boolean;
  id: string;
  handleClose: () => void;
}

const CreateModal: React.FC<CreateProps> = ({ open, handleClose, id }) => {
  const [question, setQuestion] = React.useState("");
  const [options, setOptions] = React.useState<string[]>([""]);
  const [addNewQuestion, { data, isLoading, isError, isSuccess }] =
    useAddNewQuestionMutation();

  const handleAddMore = () => {
    if (options.length < 5) {
      setOptions([...options, ""]);
    }
  };
  const handleRemove = (index: number) => {
    const newOptions = [...options];
    newOptions.splice(index, 1);
    setOptions(newOptions);
  };
  const handleSubmit = async () => {
    if (options.length >= 3) {
    if(question){
      await addNewQuestion({
        question,
        options,
      });
      if (isSuccess) {
        handleClose();
        toast.success("Question was successfully added.");
      }
      if (isError) return toast.error("Something went wrong");
      console.log(data);
    }else{
      toast.error("Please enter a question");
    }
    }else{
      toast.error("Maximum of 3 options required.");
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
          <h4 className="text-2xl font-bold text-black text-left mb-4">
            Add Question
          </h4>

          <div className="flex items-start justify-start flex-col mt-12">
            <div className="flex flex-wrap items-center justify-between w-full">
              <InputModal
                textLabel="Question"
                placeholder="Question"
                value={question}
                setValue={setQuestion}
              />
            </div>

            <h5 className="text-2xl font-bold text-black text-left mt-4">
              Options
            </h5>
            <div className="mt-1 flex flex-col gap-3  w-full">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-3">
                  <InputModal
                    textLabel=""
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    setValue={(newValue) => {
                      const newOptions = [...options];
                      //@ts-ignore
                      newOptions[index] = newValue;
                      setOptions(newOptions);
                    }}
                  />
                  {options.length > 3 && (
                    <button
                      onClick={() => handleRemove(index)}
                      className="flex items-center p-1 bg-red-500 rounded-full cursor-pointer"
                    >
                      <LiaTimesSolid size={20} color="white" />
                    </button>
                  )}
                </div>
              ))}
              {options.length < 5 && (
                <div
                  onClick={handleAddMore}
                  className="flex items-center py-1 px-2 bg-bluePrimary w-fit rounded-md cursor-pointer"
                >
                  <p className="text-white">Add More</p>
                  <IoIosAdd size={20} color="white" />
                </div>
              )}
            </div>
            <div className="flex gap-4  mt-10">
              <button
                onClick={handleClose}
                className="text-sm text-green border border-green py-2 px-10 rounded-lg"
                disabled={isLoading}
              >
                cancel
              </button>
              <button
                onClick={handleSubmit}
                className="text-sm bg-greenPrimary py-2 px-10 rounded-lg"
                disabled={isLoading}
              >
                Add
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default CreateModal;
