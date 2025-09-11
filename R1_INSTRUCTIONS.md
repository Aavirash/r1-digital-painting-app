# R1 System Instructions for Email with Base64 Image Data

When the user presses the PTT button in the digital painting app, the system will send a message to the LLM with instructions to send an email containing base64 image data and a link to https://base64toimage.github.io/.

## Message Format

The message will contain instructions similar to:
```
"Please send an email to [user@email.com] with the following message: "Here is your digital artwork! Please use this link - https://base64toimage.github.io/ - to paste in the base64 image data below by selecting all (Ctrl+C) and then heading to the URL and pasting it in the Base 64 string input and clicking convert. Enjoy!" Then include the base64 data below the message: [base64_data]"
```

## CRITICAL INSTRUCTIONS

**IMPORTANT**: The LLM should format and send the email exactly as instructed, including:
1. The personalized message with the user's email address
2. The link to https://base64toimage.github.io/
3. The complete base64 image data at the end of the email
4. Do NOT process or modify the base64 data in any way
5. Do NOT send a response back to the app (wantsR1Response is false)

## Steps for LLM:

1. **Receive the message** from the digital painting app
2. **Extract the recipient email** from the message
3. **Extract the base64 image data** from the message
4. **Create an email** with:
   - TO: The extracted email address
   - SUBJECT: "Your Digital Artwork from R1 Digital Painting App"
   - BODY: The exact message format as instructed, including the link and base64 data
5. **Send the email** through the native email system
6. **Do NOT send a response back** to the app

## Email Format

The email should follow this exact format:

```
TO: [user@email.com]
SUBJECT: Your Digital Artwork from R1 Digital Painting App
BODY: 
Here is your digital artwork! Please use this link - https://base64toimage.github.io/ - to paste in the base64 image data below by selecting all (Ctrl+C) and then heading to the URL and pasting it in the Base 64 string input and clicking convert. Enjoy!

[base64_encoded_image_data]
```

## Implementation Details:

The LLM should:
1. Parse the message to extract the recipient email and base64 data
2. Create an email with the specified format
3. Send the email through the native email system
4. Do NOT send a response back to the app (since wantsR1Response is false)

## App Stability:

To prevent the app from closing:
1. Do NOT send a response back to the app (wantsR1Response is false)
2. Do NOT close the WebView or terminate the app process
3. The app should remain open and responsive after the email is sent