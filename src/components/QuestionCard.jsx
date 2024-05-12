import { useContext, useEffect } from "react";
import QUESTIONS from "../assets/questions";
import { QuizContext } from "../store/quiz-context";
import ProgressBar from "./ProgressBar";

export default function QuestionCard() {

  const { activeQuestion, shiftToNextQuestion } = useContext(QuizContext);
  const currentQsn = QUESTIONS.filter(
    (item) => item.id === activeQuestion
  )[0];
  const timeout = 10000;

  useEffect(() => {
    const timer = setTimeout(() => {
        shiftToNextQuestion(undefined);
    }, timeout);
    return () => {
      clearTimeout(timer);
    };
  }, [activeQuestion]);
  return (
    <>
      <section key={currentQsn.id} id="quiz">
        <section id="question">
          <ProgressBar timeout={timeout}/>
          <h2>{currentQsn.text}</h2>
        </section>
        <section id="answers">
          {currentQsn.answers.map((option) => {
            return (
              <div key={option} className="answer">
                <button onClick={() => shiftToNextQuestion(option)}>{option}</button>
              </div>
            );
          })}
        </section>
      </section>
    </>
  );
}
