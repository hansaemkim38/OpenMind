const BASE_URL = "https://openmind-api.vercel.app/5-4";

export default async function postReaction(reaction, questionId) {
  const response = await fetch(
    `${BASE_URL}/questions/${questionId}/reaction/`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ type: reaction }),
    }
  );
  if (!response.ok) {
    return;
  }

  const body = await response.json();
  return body;
}
