import { useState } from "react";
import "./App.css";
import Box from "./component/Box";

import Rock from "./images/Rock.png";
import Scissors from "./images/Sicssors.png";
import Paper from "./images/Paper.png";
import Question from "./component/Question";

const questions = {
  Win: {
    num: 1,
    question: "컴퓨터를 이겨주세요",
  },
  Lose: {
    num: 2,
    question: "컴퓨터를 져주세요",
  },
  Tie: {
    num: 3,
    question: "컴퓨터를 비겨주세요",
  },
};

const choice = {
  Rock: {
    name: "Rock",
    img: `${Rock}`,
  },
  Scissors: {
    name: "Scissors",
    img: `${Scissors}`,
  },
  Paper: {
    name: "Paper",
    img: `${Paper}`,
  },
};

function App() {
  const [gameFlag, setgameFlag] = useState(false);
  const [ComputerSelect, setComputerSelect] = useState(null);
  const [gameCount, setGameCount] = useState(10);
  const [questionSelect, setQuestionSelect] = useState(null);
  const [userSelect, setUserSelect] = useState(null);
  const [result, setResult] = useState("");
  const [winCount, setWinCount] = useState(0);
  const [loseCount, setLoseCount] = useState(0);
  const [comResult, setComResult] = useState(" ");

  const playStart = () => {
    let computerChoice = randomChoiceItem(); // 내가입력한 값과 컴퓨터가 선택한 값으로 승패를 결정 짓는다.
    setComputerSelect(computerChoice);
    let questionsChoice = randomChoiceQuestion();
    setQuestionSelect(questionsChoice);
  };

  const play = (userChoice) => {
    setUserSelect(choice[userChoice]);
    let userResult = judgement(
      choice[userChoice],
      ComputerSelect,
      questionSelect
    );
    setResult(userResult);
    setComResult(comJudgement(userResult));
    if (gameCount > 0) {
      setGameCount(gameCount - 1);
    } else {
      alert("gameOver");
    }
    if (userResult === "win") {
      // UserResult 값이 win이면 winCount +1
      setWinCount(winCount + 1);
    }
    if (userResult === "lose") {
      // UserResult 값이 lose이면 loseCount +1
      setLoseCount(loseCount + 1);
    }
  };
  const comJudgement = (result) => {
    return result === "win" ? "lose" : "win";
  };

  const judgement = (user, computer, question) => {
    console.log("use", user, "computer", computer, "question", question);

    if (question.num == 1) {
      if (user.name === "Rock")
        return computer.name === "Scissors" ? "win" : "lose";
      else if (user.name === "Scissors")
        return computer.name === "Paper" ? "win" : "lose";
      else if (user.name === "Paper")
        return computer.name === "Rock" ? "win" : "lose";
      else {
        return "lose";
      }
    } else if (question.num == 2) {
      if (user.name === "Rock")
        return computer.name === "Scissors" ? "lose" : "win";
      else if (user.name === "Scissors")
        return computer.name === "Paper" ? "lose" : "win";
      else if (user.name === "Paper")
        return computer.name === "Rock" ? "lose" : "win";
      else {
        return "lose";
      }
    } else if (question.num == 3) {
      if (user.name === computer.name) {
        return "win";
      } else {
        return "lose";
      }
    }
  };

  const startGame = () => {
    setgameFlag(true);
    playStart();
  };
  const endGame = () => {
    setgameFlag(false);
  };

  const randomChoiceItem = () => {
    let itemArray = Object.keys(choice);
    let randomItem = Math.floor(Math.random() * itemArray.length);
    let finalItem = itemArray[randomItem];
    return choice[finalItem];
  };
  const randomChoiceQuestion = () => {
    let questionsArray = Object.keys(questions);
    let randomQuestion = Math.floor(Math.random() * questionsArray.length);
    let finalQuestion = questionsArray[randomQuestion];
    return questions[finalQuestion];
  };

  const reflesh = () => {
    let computerChoice = randomChoiceItem(); // 내가입력한 값과 컴퓨터가 선택한 값으로 승패를 결정 짓는다.
    setComputerSelect(computerChoice);
    let questionsChoice = randomChoiceQuestion();
    setQuestionSelect(questionsChoice);
    setUserSelect("null");
  };
  return (
    <div>
      {gameFlag ? (
        <div>
          <Question item={questionSelect} />
          <Box title="You" item={userSelect} result={result} />
          <Box title="Computer" item={ComputerSelect} result={result} />
          <button onClick={() => play("Scissors")}>가위</button>
          <button onClick={() => play("Rock")}>바위</button>
          <button onClick={() => play("Paper")}>보</button>
          <div>
            <p>게임횟수 : {gameCount}</p>
            <p>이긴횟수 : {winCount}</p>
            <p>진횟수 : {loseCount}</p>
            <button onClick={reflesh}>초기화</button>
          </div>
        </div>
      ) : (
        <button onClick={startGame}>Start</button>
      )}
    </div>
  );
}

export default App;
