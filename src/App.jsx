import Header from "./components/Header";
import QuizScreen from "./components/QuizScreen";
import QuizContextProvider from "./store/quiz-context";

function App() {
  return (
    <QuizContextProvider>
      <Header />
      <QuizScreen />
    </QuizContextProvider>
  );
}

export default App;
