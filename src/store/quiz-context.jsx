import { useReducer } from "react";
import { createContext } from "react";
import QUESTIONS from "../assets/questions";

export const QuizContext = createContext({
  activeQuestion: QUESTIONS[0].id,
  isQuizFinished: false,
  quizAnswerSheet: {},
  shiftToNextQuestion: () => {},
});

function reducer(state, action) {
  if (action.type === "NEW_QUESTION") {
    const prevQuizAnswerSheet = { ...state.quizAnswerSheet };

    const currentQsn = QUESTIONS.filter(
      (item) => (item.id === state.activeQuestion)
    )[0];
    let status = "SKIPPED";
    if (action.payload) {
      status =
        action.payload === currentQsn.answers[0] ? "CORRECT" : "INCORRECT";
    }
    prevQuizAnswerSheet[state.activeQuestion] = {
      selectedOption: action.payload,
      status,
    };
    const nextAvailableQsns = QUESTIONS.filter(
      (item) => !Object.keys(prevQuizAnswerSheet).includes(item.id)
    );
    if (nextAvailableQsns.length === 0) {
      return {
        ...state,
        isQuizFinished: true,
        quizAnswerSheet: prevQuizAnswerSheet,
      };
    }
    return {
      ...state,
      activeQuestion: nextAvailableQsns[0].id,
      quizAnswerSheet: prevQuizAnswerSheet,
    };
  }
  return state;
}

export default function QuizContextProvider({ children }) {
  const [quizState, quizActionDispatch] = useReducer(reducer, {
    activeQuestion: QUESTIONS[0].id,
    quizAnswerSheet: {},
    isQuizFinished: false,
  });

  const contextValue = {
    activeQuestion: quizState.activeQuestion,
    isQuizFinished: quizState.isQuizFinished,
    quizAnswerSheet: quizState.quizAnswerSheet,
    shiftToNextQuestion: (option) =>
      quizActionDispatch({
        type: "NEW_QUESTION",
        payload: option,
      }),
  };

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
}
