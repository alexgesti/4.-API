const {
  mockFetchJokeSingle,
  resetCurrentScore,
  insertJokeInContainer,
  saveNewReport,
  updateExistingReport,
  saveReportWithNullDate,
  changeCurrentScoreOnClick,
  saveScoreOnClick,
} = require("./tests");

describe("mockFetchJokeSingle", () => {
  it("Devuelve un chiste tipo single", async () => {
    const response = await mockFetchJokeSingle();
    const data = await response.json();
    expect(data.type).toBe("single");
    expect(data.joke).toContain("programmers");
  });
});

describe("resetCurrentScore", () => {
  it("Resetea el score a null", () => {
    expect(resetCurrentScore()).toBeNull();
  });
});

describe("insertJokeInContainer", () => {
  it("Inserta el texto correctamente", () => {
    const result = insertJokeInContainer("Hola mundo");
    expect(result).toBe("Hola mundo");
  });
});

describe("saveNewReport", () => {
  it("Guarda un nuevo report con score y date", () => {
    const reports = [];
    const currentJoke = { joke: "Joke 1" };
    const result = saveNewReport(reports, currentJoke, 2);

    expect(result).toHaveLength(1);
    expect(result[0].score).toBe(2);
    expect(result[0].date).not.toBeNull();
  });
});

describe("updateExistingReport", () => {
  it("Actualiza un report existente", () => {
    const reports = [{ joke: "Joke 1", score: 1, date: "2025-01-01" }];
    const currentJoke = { joke: "Joke 1" };
    const result = updateExistingReport(reports, currentJoke, 3);

    expect(result).toHaveLength(1);
    expect(result[0].score).toBe(3);
  });

  it("Añade un report si no existe", () => {
    const reports = [];
    const currentJoke = { joke: "Joke 2" };
    const result = updateExistingReport(reports, currentJoke, 2);

    expect(result).toHaveLength(1);
    expect(result[0].joke).toBe("Joke 2");
  });
});

describe("saveReportWithNullDate", () => {
  it("Guarda fecha como null si no hay score", () => {
    const reports = [];
    const currentJoke = { joke: "Joke 3" };
    const result = saveReportWithNullDate(reports, currentJoke);

    expect(result[0].date).toBeNull();
  });
});

describe("changeCurrentScoreOnClick", () => {
  it("Cambia currentScore según el botón", () => {
    expect(changeCurrentScoreOnClick(0)).toBe(1);
    expect(changeCurrentScoreOnClick(2)).toBe(3);
  });
});

describe("saveScoreOnClick", () => {
  it("Guarda la puntuación en reportJokes", () => {
    const reports = [];
    const currentJoke = { joke: "Joke 4" };
    const result = saveScoreOnClick(reports, currentJoke, 1);

    expect(result[0].score).toBe(2);
  });

  it("Actualiza un chiste existente", () => {
    const reports = [{ joke: "Joke 4", score: 1, date: null }];
    const currentJoke = { joke: "Joke 4" };
    const result = saveScoreOnClick(reports, currentJoke, 2);

    expect(result[0].score).toBe(3);
  });
});
