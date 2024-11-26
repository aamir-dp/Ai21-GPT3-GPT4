function GPT(prompt, modelName, temperature, topP) {
    const AI21_API_KEY = "your-api-key-goes-here";
    const ENDPOINT = "https://api.ai21.com/studio/v1/chat/completions";
  
    const payload = {
      model: modelName,
      messages: [
        { role: "user", content: prompt }
      ],
      temperature: temperature || 0.7, // Default temperature
      top_p: topP || 1.0               // Default top_p
    };
  
    const options = {
      method: "post",
      contentType: "application/json",
      headers: {
        Authorization: `Bearer ${AI21_API_KEY}`
      },
      payload: JSON.stringify(payload)
    };
  
    let maxRetries = 5; // Set a maximum number of retries
    let delay = 2000; // Initial delay between retries (1 second)
  
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = UrlFetchApp.fetch(ENDPOINT, options);
        const responseJson = JSON.parse(response.getContentText());
  
        const content = responseJson.choices[0].message.content.trim(); // Extract the response
  
        return content; // Return the response content
      } catch (error) {
        if (attempt < maxRetries) {
          // If not the last attempt, wait and retry
          Utilities.sleep(delay);
          delay *= 2; // Exponential backoff
        } else {
          // If all retries fail, throw the error
          return `Error after ${maxRetries} retries: ${error.message}`;
        }
      }
    }
  }
  
  function GPT3(prompt, cellValue, temperature, topP) {
    // Combine the prompt with the cell value
    const finalPrompt = `${prompt} ${cellValue}`;
    Utilities.sleep(2000); // Add a 2-second delay per request
    return GPT(finalPrompt, "jamba-1.5-mini", temperature, topP);
  }
  
  function GPT4(prompt, cellValue, temperature, topP) {
    // Combine the prompt with the cell value
    const finalPrompt = `${prompt} ${cellValue}`;
    Utilities.sleep(2000); // Add a 2-second delay per request
    return GPT(finalPrompt, "jamba-1.5-large", temperature, topP);
  }
  
  // Help function for GPT3 and GPT4
  function GPTHelp(model) {
    var helpText = {};
    helpText["GPT3"] = "### GPT-3 Help Guide\n" +
      "**How to Use**:\n" +
      "1. Enter your desired **prompt** (the request you want the model to respond to).\n" +
      "2. Optionally, set the **temperature** and **top_p** parameters for more control over the output.\n\n" +
      "**Parameters**:\n" +
      "- **Prompt**: Your input text that guides the model on what to generate.\n" +
      "- **Temperature**: Controls randomness in the output. Values range from 0 to 1. Lower values make the output more deterministic (e.g., 0.2), while higher values increase creativity (e.g., 0.8).\n" +
      "- **Top_P**: Controls diversity via nucleus sampling. It considers the smallest possible set of tokens whose cumulative probability is greater than `top_p`. A value of 1.0 means the model uses the whole probability distribution, while a smaller value narrows the choice of tokens.\n\n" +
      "**Example**:\n" +
      "- Prompt: \"Write a creative title for a blog about traveling in nature.\"\n" +
      "- Temperature: 0.7\n" +
      "- Top_P: 1.0\n\n" +
      "**Result**: The model will generate creative titles with some degree of randomness based on your input.\n\n" +
      "---\n" +
      "Example Formula:\n" +
      "=GPT3Sheet(\"Write a creative blog title for nature travel.\", 0.7, 1.0)\n\n---";
  
    helpText["GPT4"] = "### GPT-4 Help Guide\n" +
      "**How to Use**:\n" +
      "1. Enter your desired **prompt** (the request you want the model to respond to).\n" +
      "2. Optionally, set the **temperature** and **top_p** parameters for more control over the output.\n\n" +
      "**Parameters**:\n" +
      "- **Prompt**: Your input text that guides the model on what to generate.\n" +
      "- **Temperature**: Controls randomness in the output. Values range from 0 to 1. Lower values make the output more deterministic (e.g., 0.2), while higher values increase creativity (e.g., 0.8).\n" +
      "- **Top_P**: Controls diversity via nucleus sampling. It considers the smallest possible set of tokens whose cumulative probability is greater than `top_p`. A value of 1.0 means the model uses the whole probability distribution, while a smaller value narrows the choice of tokens.\n\n" +
      "**Example**:\n" +
      "- Prompt: \"Write a creative title for a blog about traveling in nature.\"\n" +
      "- Temperature: 0.7\n" +
      "- Top_P: 1.0\n\n" +
      "**Result**: The model will generate creative titles with some degree of randomness based on your input.\n\n" +
      "---\n" +
      "Example Formula:\n" +
      "=GPT4Sheet(\"Write a creative blog title for nature travel.\", 0.7, 1.0)\n\n---";
  
    return helpText[model] || "Help not available for this model.";
  }
  
  