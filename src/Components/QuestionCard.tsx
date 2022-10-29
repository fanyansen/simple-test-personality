import React, { ChangeEvent, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

interface OutlinedCardProps {
  questions: Array<QuestionValue>;
  progress: number;
  setProgress: (value: number) => void;
}

interface QuestionValue {
  title: string;
  options: Array<string>;
}

const questionsCard = (
  questions: Array<QuestionValue>,
  noQuiz: number,
  setNoQuiz: (noQuiz: number) => void,
  allAnswer: Array<string>,
  setAllAnswer: (allAnswer: Array<string>) => void,
  testDone: boolean,
  setTestDone: (value: boolean) => void,
  progress: number,
  setProgress: (value: number) => void
) => (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
        {`${questions[noQuiz].title}`}
      </Typography>

      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Answer</FormLabel>
        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
        >
          {questions[noQuiz].options.map((option, idx) => (
            <FormControlLabel
              value={option}
              checked={!!allAnswer[noQuiz] && allAnswer[noQuiz] === option}
              control={
                <Radio
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    const currentAllAnswer = [...allAnswer];
                    currentAllAnswer.splice(noQuiz, 1, e.target.value);
                    setAllAnswer(currentAllAnswer);
                  }}
                />
              }
              label={option}
            />
          ))}
        </RadioGroup>
      </FormControl>
    </CardContent>
    <CardActions>
      <Button
        size="small"
        onClick={() => {
          setNoQuiz(noQuiz - 1);
          setProgress(progress - 1);
        }}
        disabled={!noQuiz}
      >
        Previous
      </Button>
      <Button
        size="small"
        onClick={() => {
          setNoQuiz(noQuiz + 1);
          setProgress(progress + 1);
        }}
        disabled={!allAnswer[noQuiz] || noQuiz === questions.length - 1}
      >
        Next
      </Button>
      <Button
        size="small"
        onClick={() => {
          setTestDone(true);
          setProgress(progress + 1);
        }}
        disabled={!allAnswer[noQuiz] || !(noQuiz === questions.length - 1)}
      >
        Done
      </Button>
    </CardActions>
  </React.Fragment>
);

const resultCard = (
  questions: Array<QuestionValue>,
  noQuiz: number,
  answer: string
) => (
  <React.Fragment>
    <CardContent>
      <Typography sx={{ mb: 1.5 }} variant="h5" component="div">
        {`${questions[noQuiz].title}`}
      </Typography>

      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">Answer</FormLabel>
        <Typography sx={{ mb: 1.5 }} variant="h6" component="div">
          {`${answer}`}
        </Typography>
      </FormControl>
    </CardContent>
  </React.Fragment>
);

export default function OutlinedCard(props: OutlinedCardProps) {
  const { questions, progress, setProgress } = props;
  const [allAnswer, setAllAnswer] = useState<string[]>([]);
  const [noQuiz, setNoQuiz] = useState(0);
  const [testDone, setTestDone] = useState(false);
  const [currentQuestions, setQuestions] = useState([...questions]);

  return (
    <Box sx={{ minWidth: 275 }}>
      {!testDone && (
        <Card variant="outlined">
          {questionsCard(
            currentQuestions,
            noQuiz,
            (value: number) => setNoQuiz(value),
            allAnswer,
            (answers: string[]) => setAllAnswer(answers),
            testDone,
            (value: boolean) => setTestDone(value),
            progress,
            (value: number) => setProgress(value)
          )}
        </Card>
      )}
      {testDone &&
        allAnswer.map((value, idx) => (
          <Card variant="outlined">
            {resultCard(currentQuestions, idx, value)}
          </Card>
        ))}
      {testDone && (
        <Card variant="outlined">
          <CardContent>
            <Button
              size="small"
              onClick={() => {
                setAllAnswer([]);
                setNoQuiz(0);
                setTestDone(false);
                setProgress(0);
                currentQuestions.sort(() => Math.random() - 0.5);
                setQuestions(currentQuestions);
              }}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      )}
    </Box>
  );
}
