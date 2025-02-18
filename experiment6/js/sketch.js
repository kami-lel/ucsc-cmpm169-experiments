/*
 * Accesses the GPT-4o API with the provided input string.
 * This function implements bearer authentication in the header.
 * @param {string} inputString - The input string to send to the API.
 * @returns {string|null} Returns the output string from the API, or null if an error occurs.
 */
async function accessGpt4o(inputString) {
  try {
    const apiKey =
      "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";

    const endpoint = "https://api.openai.com/v1/chat/completions";
    const response = await axios.post(
      endpoint,
      {
        model: "gpt-4o-mini", // Changed to use gpt-4o-mini model
        messages: [{ role: "user", content: inputString }],
        max_tokens: 500,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`, // Bearer authentication included
        },
      }
    );

    const outputString = response.data.choices[0].message.content;

    // Append the outputString into the paragraph with id "sentence"
    document.getElementById("sentence").innerText += outputString;

    return outputString;
  } catch (error) {
    console.error("Error accessing GPT-4o model:", error);
    return null;
  }
}
async function checkGpt4oResult(inputString) {
  const result = await accessGpt4o(inputString);
  if (result) {
    console.log(result);
    console.log(`Request: ${inputString}`);
  } else {
    console.log("Error retrieving result.");
  }
}
checkGpt4oResult("hey who are you");
