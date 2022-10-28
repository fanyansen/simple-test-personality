import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";
import LinearProgressCustom from "./Components/LinearProgressCustom";
import QuestionCard from "./Components/QuestionCard";
import { useState } from "react";

const questions = [
  {
    title: "I Value",
    options: ["Justice", "Mercy"],
  },
  {
    title: "I appreciate a wide variety of music",
    options: [
      "Rarely",
      "Occasionally",
      "Sometimes",
      "Usually",
      "Almost Always",
    ],
  },
  {
    title: "A quiet weekend at home is",
    options: ["Boring", "rejuvenating"],
  },
  {
    title: "I prefer speakers that communicate",
    options: ["literally", "figuratively"],
  },
  {
    title: "With people, I am more often",
    options: ["brief and to the point", "friendly and warm "],
  },
];

function App() {
  const [progress, setProgress] = useState(0);
  questions.sort(() => Math.random() - 0.5);

  return (
    <Container maxWidth="xl">
      <Grid container spacing={2}>
        <Grid item xs={8}></Grid>
        <Grid item xs={4}></Grid>
        <Grid item xs={12}>
          <LinearProgressCustom progress={progress * 20} />
        </Grid>
        <Grid item xs={12}>
          <QuestionCard
            questions={questions}
            progress={progress}
            setProgress={(value: number) => setProgress(value)}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
