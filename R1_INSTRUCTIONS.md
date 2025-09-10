# R1 System Instructions for ImgBB Upload and Email

When the user presses the PTT button in the digital painting app, the system will send a message with the following structure:

```json
{
  "message": "SYSTEM INSTRUCTION: Upload digital artwork to ImgBB and email URL to [user@email.com]",
  "imageBase64": "[base64_encoded_image_data]",
  "recipientEmail": "[user@email.com]",
  "action": "uploadToImgBBAndEmail",
  "uploadEndpoint": "https://api.imgbb.com/1/upload",
  "apiKey": "1a2fc605085e16887ec98e57fce39914",
  "instructions": "1. Make POST request to uploadEndpoint with apiKey and imageBase64 2. Parse response to get URL 3. Send email to recipientEmail with URL"
}
```

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
1. Make the API call programmatically (not through LLM)
2. Handle any errors that occur during the upload process
3. Send status updates back to the app using the plugin message system
4. Send the final email with the URL to the user
5. Provide success/failure feedback to the user