interface Joke {
  id: string;
  joke: string;
}

const button = document.getElementById("jokeBtn");
const jokeContainer = document.getElementById("jokeSpace");

const reportJokes: {
  joke: string;
  score: number | null;
  date: string | null;
}[] = [];

async function fetchJoke() {
  console.log("Pidiendo chiste...");
  const response = await fetch("https://icanhazdadjoke.com/", {
    headers: {
      Accept: "application/json",
    },
  });
  const data: Joke = await response.json();
  console.log("Chiste recibido:", data);
  if (jokeContainer) jokeContainer.textContent = data.joke;
}

if (button) button.addEventListener("click", fetchJoke);

fetchJoke();
