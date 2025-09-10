// Jokes
interface Joke {
  id: string;
  joke: string;
}

const button = document.getElementById("jokeBtn");
const jokeContainer = document.getElementById("jokeSpace");
const scoreBtns = [
  document.getElementById("score1"),
  document.getElementById("score2"),
  document.getElementById("score3"),
];

const reportJokes: {
  joke: string;
  score: number | null;
  date: string | null;
}[] = [];

let currentJoke: Joke | null = null;
let currentScore: number | null = null;

async function fetchJoke() {
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data: Joke = await response.json();
  currentJoke = data;
  currentScore = null;
  if (jokeContainer) jokeContainer.textContent = data.joke;
}

function saveReport() {
  if (currentJoke) {
    const idx = reportJokes.findIndex((r) => r.joke === currentJoke!.joke);
    const report = {
      joke: currentJoke.joke,
      score: currentScore,
      date: currentScore ? new Date().toISOString() : null,
    };
    idx >= 0 ? (reportJokes[idx] = report) : reportJokes.push(report);
    console.log(reportJokes);
  }
}

scoreBtns.forEach((btn, index) => {
  if (btn) {
    btn.addEventListener("click", () => {
      currentScore = index + 1;
      saveReport();
    });
  }
});

if (button)
  button.addEventListener("click", () => {
    saveReport();
    fetchJoke();
  });

// Carga del primer chiste al iniciar
fetchJoke();

// Meterología
async function fetchWeather() {
  const weatherDiv = document.getElementById("weatherInfo");
  const lat = 41.3888; // Barcelona
  const lon = 2.159;
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const temp = data.current_weather.temperature;
    const wind = data.current_weather.windspeed;
    if (weatherDiv) {
      weatherDiv.innerHTML = `Current temperature: ${temp}°C<br>Current wind speed: ${wind} km/h`;
    }
  } catch (error) {
    if (weatherDiv) {
      weatherDiv.textContent = "Failed to fetch weather data.";
    }
  }
}

fetchWeather();
