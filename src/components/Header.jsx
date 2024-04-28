import quizLogo from "../assets/quiz-logo.png";
export default function Header() {
  return (
    <header>
      <img src={quizLogo} />
      <h1>React quiz</h1>
    </header>
  );
}
