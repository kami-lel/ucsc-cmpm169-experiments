/*
 * Accesses the GPT-4o API with the provided input string.
 * This function implements bearer authentication in the header.
 * @param {string} inputString - The input string to send to the API.
 * @returns {string|null} Returns the output string from the API, or null if an error occurs.
 */

function genPrompt(word) {
  return `
Take the following single word:
${word}.
Create a single interesting sentence that includes this saying or quote and incorporates at least three fascinating concepts, highlighting those concepts in brackets [].
Ensure that the interesting saying itself contains the fascinating concepts.
The sentence should resonate with meaning and perspective, offering an engaging view into the connections between the word and the concepts.

Response Example:
Art: Art is the most beautiful of all lies because it brings together [creativity], [emotion], and [expression]. (Pablo Picasso)
  `;
}

async function generateNewParagraph(word) {
  try {
    const apiKey = "sk-fee0681d136d4e5fbb1bb74a0d023e5a";

    const endpoint = "http://47.251.29.212:3000/api/chat/completions";
    const response = await axios.post(
      endpoint,
      {
        model: "gpt-4o-mini", // Changed to use gpt-4o-mini model
        messages: [{ role: "user", content: genPrompt(word) }],
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
    addParagraphToLines(outputString);

    // Append the outputString into the paragraph with id "sentence"
    document.getElementById("sentence").innerText += outputString;

    return outputString;
  } catch (error) {
    console.error("Error accessing GPT-4o model:", error);
    return null;
  }
}

/**
 * Function to find a div with ID "lines" and attach a paragraph to it,
 * while bolding any words enclosed in square brackets and making them links to google.com.
 * @param {String} inputContent - The content to be added to the paragraph.
 */
function addParagraphToLines(inputContent) {
  // Find the div with ID "lines"
  const linesDiv = document.getElementById("lines");

  // Check if the div exists
  if (linesDiv) {
    // Create a new paragraph element
    const paragraph = document.createElement("p");

    // Create a regex to find words within square brackets
    const regex = /\[(.*?)\]/g;

    // Replace the matches with bolded text and link to google.com
    const formattedContent = inputContent.replace(
      regex,
      `<strong><a href="javascript:void(0)" onclick="generateNewParagraph('$1')">$1</a></strong>`
    );

    // Set the content of the paragraph using innerHTML to allow HTML formatting
    paragraph.innerHTML = formattedContent;
    // Append the paragraph to the div
    linesDiv.appendChild(paragraph);
  } else {
    console.error('Div with ID "lines" not found.'); // Handle case if div doesn't exist
  }
}

generateNewParagraph("love");
