import React from "react";
import Button from "./Button";
import { HiSquare2Stack } from "react-icons/hi2";
import { MdCreateNewFolder } from "react-icons/md";
import DeleteModal from "./modals/DeleteModal";
import CreateModal from "./modals/CreateModal";
import { TbLogout2 } from "react-icons/tb";
import { useDispatch } from "react-redux";
import { removeToken } from "@/state/user/userSlice";
import { useRouter } from "next/router";

function Header() {
  const [createModal, setCreateModal] = React.useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const handleOpenCreate = () => setCreateModal(true);

  const handleCloseCreate = () => setCreateModal(false);

  function handleOpenClear() {
    dispatch(removeToken());
    router.push("/token");
  }

  return (
    <>
      <div className="h-12 flex gap-4 justify-end items-center">
        <Button
          name="Clear Token"
          icon={<TbLogout2 size={22} />}
          onClick={handleOpenClear}
        />
        <Button
          name="Create Question"
          onClick={() => handleOpenCreate()}
          icon={<MdCreateNewFolder size={22} />}
        />
      </div>
      <CreateModal open={createModal} handleClose={handleCloseCreate} id="" />
    </>
  );
}

export default Header;
