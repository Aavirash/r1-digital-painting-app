# R1 System Instructions for ImgBB Upload and Email

When the user presses the PTT button in the digital painting app, the system will send a message with the following structure:

```json
{
  "message": "USER REQUEST: Please upload this digital artwork to ImgBB and email the public URL to [user@email.com]",
  "imageBase64": "[base64_encoded_image_data]",
  "recipientEmail": "[user@email.com]",
  "useLLM": true,
  "wantsR1Response": true,
  "action": "uploadToImgBBAndEmail",
  "uploadEndpoint": "https://api.imgbb.com/1/upload",
  "apiKey": "1a2fc605085e16887ec98e57fce39914",
  "instructions": "Send POST request with API key and base64 data to ImgBB, get URL from response, email URL to recipient"
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