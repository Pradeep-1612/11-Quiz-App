import { useContext } from "react";
import { QuizContext } from "../store/quiz-context";
import QuestionCard from "./QuestionCard";
import QuizResult from "./QuizResult";

export default function QuizScreen() {
  const { isQuizFinished } = useContext(QuizContext);
  return <>{isQuizFinished ? <QuizResult /> : <QuestionCard />}</>;
}
