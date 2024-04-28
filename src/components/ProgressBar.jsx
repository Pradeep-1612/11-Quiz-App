import { useContext, useEffect, useState } from "react";
import { QuizContext } from "../store/quiz-context";

export default function ProgressBar() {
  const { activeQuestion } = useContext(QuizContext);
  const [remainingTime, setRemainingTime] = useState(3000);

  useEffect(() => {
    setRemainingTime(3000);
    const interval = setInterval(() => {
      setRemainingTime((prevRemainingTime) => prevRemainingTime - 10);
    }, 10);
    return () => {
      clearInterval(interval);
    };
  }, [activeQuestion]);

  return <progress value={remainingTime} max="3000" />;
}
