# R1 System Instructions for Email with Base64 Image Data

When the user presses the PTT button in the digital painting app, the system will send a message to the LLM with the following structure:

```json
{
  "message": "Please send an email to [user@email.com] with the following message: \"Here is your digital artwork! Please use this link - https://base64toimage.github.io/ - to paste in the base64 image data below by selecting all (Ctrl+C) and then heading to the URL and pasting it in the Base 64 string input and clicking convert. Enjoy!\" Then include the base64 data below the message.",
  "imageBase64": "[base64_encoded_image_data]",
  "recipientEmail": "[user@email.com]",
  "useLLM": true,
  "wantsR1Response": false
}
```

## CRITICAL INSTRUCTIONS

**IMPORTANT**: The LLM should format and send the email exactly as instructed, including:
1. The personalized message with the user's email address
2. The link to https://base64toimage.github.io/
3. The base64 image data from the `imageBase64` field should be included at the end of the email
4. Do NOT process or modify the base64 data in any way
5. Do NOT send a response back to the app (wantsR1Response is false)

## Steps for LLM:

1. **Receive the message** from the digital painting app
2. **Extract the recipient email** from the `recipientEmail` field
3. **Extract the base64 image data** from the `imageBase64` field
4. **Create an email** with:
   - TO: The email address from `recipientEmail`
   - SUBJECT: "Your Digital Artwork from R1 Digital Painting App"
   - BODY: The exact message format as instructed, including the link and base64 data from the `imageBase64` field
5. **Send the email** through the native email system
6. **Do NOT send a response back** to the app

## Email Format

The email should follow this exact format:

```
TO: [recipientEmail]
SUBJECT: Your Digital Artwork from R1 Digital Painting App
BODY: 
Here is your digital artwork! Please use this link - https://base64toimage.github.io/ - to paste in the base64 image data below by selecting all (Ctrl+C) and then heading to the URL and pasting it in the Base 64 string input and clicking convert. Enjoy!

[base64_encoded_image_data_from_imageBase64_field]
```

## Implementation Details:

The LLM should:
1. Parse the message to extract the recipient email from the `recipientEmail` field
2. Extract the base64 image data from the `imageBase64` field
3. Create an email with the specified format
4. Send the email through the native email system
5. Do NOT send a response back to the app (since wantsR1Response is false)

## App Stability:

To prevent the app from closing:
1. Do NOT send a response back to the app (wantsR1Response is false)
2. Do NOT close the WebView or terminate the app process
3. The app should remain open and responsive after the email is sent