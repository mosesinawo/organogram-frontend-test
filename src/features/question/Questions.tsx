import React, { useEffect, useState } from "react";
import { useGetQuestionsQuery } from "@/services/questions/questionsApi";
import Question from "./Question";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { getToken } from "@/state/user/userSlice";
import Loader from "@/components/Loader";

interface questionTypes {
  questionId: string;
  question: string;
  options: string[];
}

function Questions() {

  const router = useRouter();
  const { data: questions, isLoading, isError } = ({} = useGetQuestionsQuery());
  const token = useSelector(getToken);

  useEffect(() => {
    if (!token) {
      router.push("/token");
      toast.error("Request another token");
    }
  }, [token, router]);

  if (isLoading) return <Loader />;

  const questionsArray =
    questions !== undefined && questions !== null
      ? Object.entries(questions).map(([id, questionData]) => ({
          id,
          ...questionData,
        }))
      : [];

  return (
    <>
      {questions !== undefined &&
      questions !== null &&
      Object.keys(questions).length !== 0 ? (
        <div className="w-full px-4 sm:w-auto">
          {questionsArray.map((question) => (
            <Question
              key={question.id} 
              id={question.id} 
              question={question.question}
              options={question.options} 
            />
          ))}
        </div>
      ) : (
        <div>
          <p className="text-4xl text-gray-700 text-center">
            Click on the button above to Add Questions
          </p>
        </div>
      )}
    </>
  );
}

export default Questions;
