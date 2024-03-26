import { api } from "../api";

import {QuestionsData} from "./questions.types";

export const questionApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getQuestions: builder.query<QuestionsData, void>({
      query: () => "/questions",
      providesTags: ["Questions"],
    }),
    addNewQuestion: builder.mutation({
      query: (question) => ({
        url: "/questions",
        method: "POST",
        body: question,
      }),
      invalidatesTags: ["Questions"],
    }),
    updateQuestion: builder.mutation({
      query: (question) => ({
        url: `questions/${question.id}`,
        method: "PUT",
        body: question,
      }),
      invalidatesTags: ["Questions"],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => {
        console.log("from api", id); // Logging the id parameter
        console.log("im here"); // Logging the id parameter
        return {
          url: `questions/${id}`,
          method: "DELETE",
        };
      },
      invalidatesTags: ["Questions"],
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useAddNewQuestionMutation,
  useDeleteQuestionMutation,
  useUpdateQuestionMutation,
} = questionApi;
