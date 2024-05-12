import quizCompleteLogo from "../assets/quiz-complete.png";
import QUESTIONS from "../assets/questions";
import { QuizContext } from "../store/quiz-context";
import { useContext } from "react";

export default function QuizResult() {
  const { quizAnswerSheet } = useContext(QuizContext);

  const totalQsns = QUESTIONS.length;

  const skippedPercent = Math.round(
    (Object.values(quizAnswerSheet).filter((item) => item.status === "SKIPPED")
      .length /
      totalQsns) *
      100
  );
  const incorrectPercent = Math.round(
    (Object.values(quizAnswerSheet).filter(
      (item) => item.status === "INCORRECT"
    ).length /
      totalQsns) *
      100
  );

  const correctPercent = 100 - skippedPercent - incorrectPercent;

  return (
    <section id="summary">
      <img src={quizCompleteLogo} />
      <h2>Quiz completed!</h2>
      <section id="summary-stats">
        <p>
          <span className="number">{skippedPercent}%</span>
          <span className="text">Skipped</span>
        </p>
        <p>
          <span className="number">{correctPercent}%</span>
          <span className="text">Answered correctly</span>
        </p>
        <p>
          <span className="number">{incorrectPercent}%</span>
          <span className="text">Answered incorrectly</span>
        </p>
      </section>
      {Object.keys(quizAnswerSheet).map((key, index) => {
        const classes =
          quizAnswerSheet[key].status === "CORRECT"
            ? "user-answer correct"
            : quizAnswerSheet[key].status === "INCORRECT"
            ? "user-answer wrong"
            : "user-answer skipped";

        return (
          <ol key={index}>
            <h3>{index + 1}</h3>
            <p className="question">
              {QUESTIONS.find((item) => item.id === key).text}
            </p>
            <p className={classes}>
              {quizAnswerSheet[key].selectedOption ?? "Skipped"}
            </p>
          </ol>
        );
      })}
    </section>
  );
}
