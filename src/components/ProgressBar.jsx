import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../store/quiz-context";

export default function ProgressBar({timeout}) {
  const { activeQuestion } = useContext(QuizContext);
  const [remainingTime, setRemainingTime] = useState(timeout);

  useEffect(() => {
    setRemainingTime(timeout);
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [activeQuestion, timeout]);

  return <progress value={remainingTime} max={timeout} />;
}
