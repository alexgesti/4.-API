// Función fetchJoke
// Devuelve un chiste tipo single y lo guarda en currentJoke.
function mockFetchJokeSingle() {
  return Promise.resolve({
    json: () =>
      Promise.resolve({
        id: 123,
        type: "single",
        joke: "Why do programmers prefer dark mode? Because light attracts bugs!",
      }),
  });
}

// Resetea currentScore a null después de introducir un chiste.
function resetCurrentScore() {
  let currentScore = 2;
  currentScore = null;
  return currentScore;
}

// Inserta correctamente el texto en jokeContainer.
function insertJokeInContainer(joke) {
  const jokeContainer = { textContent: "" };
  jokeContainer.textContent = joke;
  return jokeContainer.textContent;
}

// Función saveReport
// Añade un nuevo chiste con score y date al array reportJokes.
function saveNewReport(reportJokes, currentJoke, currentScore) {
  const report = {
    joke: currentJoke.joke,
    score: currentScore,
    date: currentScore ? new Date().toISOString() : null,
  };
  reportJokes.push(report);
  return reportJokes;
}

// Si el chiste ya existe, actualice el score en vez de duplicarlo.
function updateExistingReport(reportJokes, currentJoke, currentScore) {
  const idx = reportJokes.findIndex((r) => r.joke === currentJoke.joke);
  const report = {
    joke: currentJoke.joke,
    score: currentScore,
    date: currentScore ? new Date().toISOString() : null,
  };
  if (idx >= 0) {
    reportJokes[idx] = report;
  } else {
    reportJokes.push(report);
  }
  return reportJokes;
}

// Si no hay currentScore, el date se guarde como null.
function saveReportWithNullDate(reportJokes, currentJoke) {
  const currentScore = null;
  const report = {
    joke: currentJoke.joke,
    score: currentScore,
    date: currentScore ? new Date().toISOString() : null,
  };
  reportJokes.push(report);
  return reportJokes;
}

// Botones de puntuación
// Al hacer click en un botón, el currentScore cambie al valor correcto (1, 2 o 3).
function changeCurrentScoreOnClick(buttonIndex) {
  let currentScore = null;
  currentScore = buttonIndex + 1;
  return currentScore;
}

// Tras puntuar se guarde en reportJokes.
function saveScoreOnClick(reportJokes, currentJoke, buttonIndex) {
  let currentScore = buttonIndex + 1;
  const report = {
    joke: currentJoke.joke,
    score: currentScore,
    date: currentScore ? new Date().toISOString() : null,
  };
  const idx = reportJokes.findIndex((r) => r.joke === currentJoke.joke);
  idx >= 0 ? (reportJokes[idx] = report) : reportJokes.push(report);
  return reportJokes;
}

module.exports = {
  mockFetchJokeSingle,
  resetCurrentScore,
  insertJokeInContainer,
  saveNewReport,
  updateExistingReport,
  saveReportWithNullDate,
  changeCurrentScoreOnClick,
  saveScoreOnClick,
};
