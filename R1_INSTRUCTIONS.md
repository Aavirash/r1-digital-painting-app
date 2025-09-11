# R1 System Instructions for Email with Base64 Image Data

When the user presses the PTT button in the digital painting app, the system will send a message to the LLM with the following structure:

```json
{
  "message": "Please send an email to the user with subject 'Your Digital Artwork from R1 Digital Painting App'. Create an email body with the text 'Here is your digital artwork!' and attach the image data I'm providing as a PNG file attachment named 'artwork.png'.",
  "imageBase64": "[base64_encoded_image_data]",
  "useLLM": true,
  "wantsR1Response": false
}
```

## CRITICAL INSTRUCTIONS

**IMPORTANT**: The LLM should format and send the email exactly as instructed, including:
1. Send to the user's email address (the LLM already knows this)
2. Subject: "Your Digital Artwork from R1 Digital Painting App"
3. Body: "Here is your digital artwork!"
4. Create a PNG file attachment named "artwork.png" from the base64 data in the `imageBase64` field
5. Do NOT send a response back to the app (wantsR1Response is false)

## Steps for LLM:

1. **Receive the message** from the digital painting app
2. **Extract the base64 image data** from the `imageBase64` field
3. **Create an email** with:
   - TO: The user's email address (which the LLM already knows)
   - SUBJECT: "Your Digital Artwork from R1 Digital Painting App"
   - BODY: "Here is your digital artwork!"
   - ATTACHMENT: Create a PNG file named "artwork.png" from the base64 data in the `imageBase64` field
4. **Send the email** through the native email system
5. **Do NOT send a response back** to the app

## Email Format

The email should follow this exact format:

```
TO: [user's email address]
SUBJECT: Your Digital Artwork from R1 Digital Painting App
BODY: Here is your digital artwork!
ATTACHMENT: artwork.png (created from the base64 data in imageBase64 field)
```

## Implementation Details:

The LLM should:
1. Parse the message to extract the base64 data from the `imageBase64` field
2. Decode the base64 data to create a PNG image file
3. Create an email with the specified format and attachment
4. Send the email to the user's email address through the native email system
5. Do NOT send a response back to the app (since wantsR1Response is false)

## App Stability:

To prevent the app from closing:
1. Do NOT send a response back to the app (wantsR1Response is false)
2. Do NOT close the WebView or terminate the app process
3. The app should remain open and responsive after the email is sent