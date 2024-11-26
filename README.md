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
