# R1 System Instructions for ImgBB Upload and Email

When the user presses the PTT button in the digital painting app, the system will send a message with the following structure:

```json
{
  "message": "Please upload this digital artwork to ImgBB and email the public URL to [user@email.com]. Use API key: 1a2fc605085e16887ec98e57fce39914",
  "imageBase64": "[base64_encoded_image_data]",
  "recipientEmail": "[user@email.com]",
  "action": "uploadToImgBBAndEmail"
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
1. Make the API call programmatically (not through LLM)
2. Handle any errors that occur during the upload process
3. Send status updates back to the app using the plugin message system
4. Send the final email with the URL to the user
5. Provide success/failure feedback to the user