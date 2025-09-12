# R1 System Instructions for Email with Base64 Image Data

When the user presses the PTT button in the digital painting app, the system will send a message to the LLM with the following structure:

```json
{
  "message": "Please send an email to the user with subject 'Your Digital Artwork from R1 Digital Painting App' and body 'Here is your digital artwork base64 data! Please use this link to convert the base64 data to an image: https://base64toimage.github.io/ Copy and paste the following base64 data at the converter website: [base64_encoded_image_data]'",
  "useLLM": true,
  "wantsR1Response": false
}
```

## CRITICAL INSTRUCTIONS

**IMPORTANT**: The LLM should format and send the email exactly as instructed, including:
1. Send to the user's email address (the LLM already knows this)
2. Subject: "Your Digital Artwork from R1 Digital Painting App"
3. Body: "Here is your digital artwork base64 data! Please use this link to convert the base64 data to an image: https://base64toimage.github.io/ Copy and paste the following base64 data at the converter website: [base64_encoded_image_data]"
4. The base64 data should be included directly in the email body as plain text (NOT as an attachment)
5. Do NOT send a response back to the app (wantsR1Response is false)

## Steps for LLM:

1. **Receive the message** from the digital painting app
2. **Extract the complete message** including the base64 data that is already embedded in the message body
3. **Create an email** with:
   - TO: The user's email address (which the LLM already knows)
   - SUBJECT: "Your Digital Artwork from R1 Digital Painting App"
   - BODY: The exact message provided, which includes the converter URL and the base64 data as plain text
4. **Send the email** through the native email system
5. **Do NOT send a response back** to the app

## Email Format

The email should follow this exact format:

```
TO: [user's email address]
SUBJECT: Your Digital Artwork from R1 Digital Painting App
BODY: Here is your digital artwork base64 data! Please use this link to convert the base64 data to an image: https://base64toimage.github.io/

Copy and paste the following base64 data at the converter website:

[very long base64 string]
```

## Implementation Details:

The LLM should:
1. Parse the message to extract the instructions
2. Extract the base64 data from the message body (not from a separate field)
3. Create an email with the specified format
4. Include the base64 data directly in the email body as plain text
5. Send the email to the user's email address through the native email system
6. Do NOT send a response back to the app (since wantsR1Response is false)

## App Stability:

To prevent the app from closing:
1. Do NOT send a response back to the app (wantsR1Response is false)
2. Do NOT close the WebView or terminate the app process
3. The app should remain open and responsive after the email is sent