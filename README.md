# Documentation for GPT Utility Functions

This documentation provides a detailed explanation of the utility functions for interacting with AI21 Studio's GPT-based APIs.

---

## `GPT(prompt, modelName, temperature, topP)`

### Description:
This function sends a request to AI21 Studio's GPT-based API to generate a response based on the provided prompt.

### Parameters:
- **`prompt`** *(string)*: The input text that guides the AI model's response.
- **`modelName`** *(string)*: The name of the AI model to use (e.g., `jamba-1.5-mini` or `jamba-1.5-large`).
- **`temperature`** *(number, optional)*: Controls the randomness of the output. Default is `0.7`.  
  - Lower values (e.g., `0.2`) produce more deterministic results.
  - Higher values (e.g., `0.8`) increase creativity.
- **`topP`** *(number, optional)*: Controls diversity via nucleus sampling. Default is `1.0`.  
  - `1.0` uses the entire probability distribution.
  - Smaller values narrow the token selection.

### Key Features:
- Implements **exponential backoff** for retrying requests in case of failure (up to 5 retries).
- Returns the generated text or an error message after retries.

---

## `GPT3(prompt, cellValue, temperature, topP)`
## `GPT4(prompt, cellValue, temperature, topP)`

### Description:
Combines the provided `prompt` with a `cellValue` and sends the request to the `jamba-1.5-mini` model.

### Parameters:
- **`prompt`** *(string)*: The input text that guides the model's response.
- **`cellValue`** *(string)*: Additional text appended to the prompt.
- **`temperature`** *(number, optional)*: Controls randomness in the response (default: `0.7`).
- **`topP`** *(number, optional)*: Controls diversity via nucleus sampling (default: `1.0`).

### Example:
```javascript
GPT3("Summarize this text:", "Artificial intelligence is transforming industries.", 0.7, 1.0);
GPT4("Generate a blog title:", "The benefits of mindfulness in daily life.", 0.7, 1.0);
```
## `GPTHelp(model)`

### Description:
Provides a help guide for using GPT3 and GPT4 utility functions.

### Parameters:
- **`model`** *(string)*: Specify `"GPT3"` or `"GPT4"` to get help for the respective function.

### Output:
Returns detailed instructions on how to use the specified model, including descriptions of parameters and example formulas.

### Example:
```javascript
GPTHelp("GPT3");
GPTHelp("GPT4");
```
## General Notes

### Retry Logic:
- The `GPT` function retries failed requests up to 5 times with exponential backoff, starting with a 2-second delay between attempts.

### Delays:
- Both `GPT3` and `GPT4` introduce a 2-second delay between requests to prevent rate limits.

### AI21 Studio API Key:
- Replace `"your-api-key-goes-here"` with your actual API key for AI21 Studio.
