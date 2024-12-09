import { useEffect, useReducer } from "react";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import Startscreen from "./Startscreen";
import Question from "./Question";
import Nextbutton from "./Nextbutton";
import Progress from "./Progress"; // Corrected component name
import Finished from "./Finished"; 

const initialstate = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  point: 0, // Added point to track score
};

function reducer(state, action) {
  switch (action.type) {
    case 'datareceived':
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case 'error':
      return {
        ...state,
        status: "error",
      };
    case 'start':
      return {
        ...state,
        status: "active",
      };
    case 'newAnswer': {
      const question = state.questions.at(state.index); // Corrected access to questions
      return {
        ...state,
        answer: action.payload,
        point:
          action.payload === question.correctOption
            ? state.point + question.points // Added correct points increment
            : state.point,
      };
    }
    case 'nextquestion': {
      const isLastQuestion = state.index === state.questions.length - 1;
      return isLastQuestion
        ? { ...state, status: "finished" } // Mark quiz as finished
        : { ...state, index: state.index + 1, answer: null }; // Go to the next question
    }
    case 'reset': 
      return initialstate;
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  const [{ questions, status, index, answer, point }, dispatch] = useReducer(reducer, initialstate);
  const numquestions = questions.length;
  
  // Corrected points calculation
  const maxpoints = questions.reduce((prev, cur) => prev + cur.points, 0);

  useEffect(() => {
    fetch('http://localhost:9000/questions')
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => dispatch({ type: 'datareceived', payload: data }))
      .catch((err) => {
        console.error("Fetch error:", err.message);
        dispatch({ type: 'error' });
      });
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <Startscreen numquestions={numquestions} dispatch={dispatch} />}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numquestions={numquestions} // Corrected typo here
              point={point}
              maxpoints={maxpoints}
              answer = {answer}
            />
            <Question
              question={questions[index]}
              dispatch={dispatch}
              answer={answer}
            />
            <Nextbutton
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        {status === "finished" 
        && <Finished point={ point} maxpoints={maxpoints} />
        }
      </Main>
    </div>
  );
}
