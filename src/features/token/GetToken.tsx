import Button from "@/components/Button";
import { setToken } from "@/state/user/userSlice";
import axios from "axios";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

function GetToken() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://qt.organogram.app/token", {
        email,
      });
      console.log(data);
      dispatch(setToken(data.token));
      console.log("called");
      toast.success("Success");
      router.push("/");
    } catch (error) {
      toast.error("An error occured");
    }
  }

  console.log(email);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center items-center"
    >
      <h5 className="text-bluePrimary text-2xl uppercase font-bold text-center">
        Enter your email address to request Token
      </h5>

      <input
        type="text"
        name=""
        value={email}
        className="w-[70%] h-10 rounded-md mt-5 mb-4 text-xl px-2 py-1"
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        type="submit"
        className="w-[70%] h-10 rounded-md mt-5 mb-4 text-xl px-2 py-1 bg-slate-100 border border-bluePrimary"
        disabled={!email}
      >
        Request Token
      </button>
    </form>
  );
}

export default GetToken;
