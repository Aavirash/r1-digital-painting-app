# R1 System Instructions for ImgBB Upload and Email

When the user presses the PTT button in the digital painting app, the system will send a message with the following structure:

```json
{
  "message": "SYSTEM COMMAND: Upload digital artwork to ImgBB and email URL to user",
  "imageBase64": "[base64_encoded_image_data]",
  "recipientEmail": "[user@email.com]",
  "action": "uploadToImgBBAndEmail",
  "uploadEndpoint": "https://api.imgbb.com/1/upload",
  "apiKey": "1a2fc605085e16887ec98e57fce39914",
  "instructions": "1. Make POST request to uploadEndpoint with apiKey and imageBase64 2. Parse response to get URL 3. Send email to recipientEmail with URL 4. DO NOT use LLM for any part of this process"
}
```

## CRITICAL INSTRUCTIONS - DO NOT USE LLM

**IMPORTANT**: The LLM must NOT be involved in any part of this process. Do not ask the LLM to:
- Search the web for ImgBB API documentation
- Generate code to upload the image
- Interpret the API response
- Format the email

All of these steps must be handled programmatically by the R1 system directly.

## Steps for R1 System:

1. **Receive the message** from the digital painting app
2. **Extract the base64 image data** from the `imageBase64` field
3. **Make an API call** to ImgBB with the following parameters:
   - URL: `https://api.imgbb.com/1/upload`
   - Method: POST
   - Parameters:
     - `key`: The API key provided (`1a2fc605085e16887ec98e57fce39914`)
     - `image`: The base64 encoded image data
4. **Parse the response** to extract the public URL
5. **Send an email** to the address in `recipientEmail` with the public URL

## Important Security Note:

Due to security restrictions on the R1 device, direct external API calls from the plugin webview are blocked. The R1 system must handle all external API calls securely through its runtime environment.

## ImgBB API Response Format:

The response from ImgBB will be in this format:
```json
{
  "data": {
    "url": "https://i.ibb.co/your-image-url.jpg",
    "delete_url": "https://ibb.co/delete-url"
  },
  "success": true
}
```

Extract the `data.url` field for the email.

## Implementation Details:

The R1 system should:
1. Make the API call programmatically (NOT through LLM)
2. Handle any errors that occur during the upload process
3. Send status updates back to the app using the plugin message system
4. Send the final email with the URL to the user
5. Provide success/failure feedback to the user

## Example Code Structure:

```javascript
// PSEUDOCODE - This is how the R1 system should handle the request
async function handleImgBBUpload(request) {
  try {
    // Step 1: Prepare the API call
    const formData = new FormData();
    formData.append('key', request.apiKey);
    formData.append('image', request.imageBase64);
    
    // Step 2: Make the API call directly (NOT through LLM)
    const response = await fetch(request.uploadEndpoint, {
      method: 'POST',
      body: formData
    });
    
    // Step 3: Parse the response
    const result = await response.json();
    
    if (result.success) {
      // Step 4: Send email with URL (NOT through LLM)
      await sendEmail(request.recipientEmail, result.data.url);
      
      // Step 5: Send success feedback to app
      sendFeedbackToApp("Email sent successfully!");
    } else {
      throw new Error("Upload failed");
    }
  } catch (error) {
    // Handle errors and send feedback to app
    sendFeedbackToApp("Error: " + error.message);
  }
}
```