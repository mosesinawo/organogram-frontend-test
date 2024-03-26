import React, { useState } from "react";
import Button from "@/components/Button";
import { FaPen } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";
import UpdateModal from "@/components/modals/UpdateModal";
import DeleteModal from "@/components/modals/DeleteModal";
import InputOptions from "@/components/inputs/InputOptions";
import { useRouter } from "next/router";

interface questionProps {
  id: string;
  question: string;
  options: string[];
}

function Question({ id, question, options }: questionProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [updateModal, setupdateModal] = useState(false);
  const [deleteModal, setdeleteModal] = useState(false);

  const router = useRouter();

  const handleOptionClick = (optionValue: string | null) => {
    setSelectedOption(optionValue);
    console.log(selectedOption);
  };

  const handleOpenUpdate = () => setupdateModal(true);

  const handleCloseUpdate = () => setupdateModal(false);

  const handleOpenDelete = () => setdeleteModal(true);

  const handleCloseDelete = () => setdeleteModal(false);

  return (
    <>
      <div className="border border-bluePrimary rounded-lg mt-8 p-4  w-full">
        <div className="bg-blue-100 flex justify-center px-5 rounded-sm p-3 relative">
          <h2 className="text-bluePrimary text-4xl font-extrabold uppercase text-center">
            {question}
          </h2>
        </div>
        <p className="text-gray-800 text-lg text-center">select on option</p>

        <div className="mt-8">
          {options.map((option, index) => (
            <InputOptions
              key={index}
              name={option}
              isSelected={selectedOption === option}
              onClick={() => handleOptionClick(option)}
            />
          ))}
        </div>
        <div className="flex justify-end gap-3 mt-6 ">
          <Button
            name="Delete"
            onClick={() => handleOpenDelete()}
            icon={<IoTrashOutline color="red" size={21} />}
          />
          <Button
            name="Update"
            onClick={() => handleOpenUpdate()}
            icon={<FaPen color="stone" size={22} />}
          />
        </div>
      </div>
      <UpdateModal
        open={updateModal}
        handleClose={handleCloseUpdate}
        question={question}
        options={options}
        id={id}
      />
      <DeleteModal open={deleteModal} handleClose={handleCloseDelete} id={id} />
    </>
  );
}

export default Question;
