# R1 System Instructions for Email with Image Attachment

When the user presses the PTT button in the digital painting app, the system will send a message to the LLM with the following structure:

```json
{
  "message": "SEND_EMAIL_WITH_ATTACHMENT: Please send an email with the attached digital artwork to [user@email.com]. Use the native email functionality to create and send an email with the subject \"Your Digital Artwork from R1 Digital Painting App\" and body \"Here is the artwork you created in the R1 Digital Painting App. The image is attached below.\" Attach the image as a PNG file named \"artwork.png\". Do not process or analyze the image data yourself, just send it as an email attachment.",
  "imageBase64": "[base64_encoded_image_data]",
  "recipientEmail": "[user@email.com]",
  "action": "sendEmailWithAttachment",
  "subject": "Your Digital Artwork from R1 Digital Painting App",
  "body": "Here is the artwork you created in the R1 Digital Painting App. The image is attached below.",
  "useLLM": true,
  "wantsR1Response": false,
  "nativeEmail": true,
  "attachmentName": "artwork.png"
}
```

## CRITICAL INSTRUCTIONS - EMAIL FORMATTING AND SENDING

**IMPORTANT**: The LLM should handle the email sending directly using its native email functionality, NOT by processing or analyzing the image data.

When the message field contains "SEND_EMAIL_WITH_ATTACHMENT", this is a special instruction that indicates the LLM should:

1. Use its native email functionality to create and send an email
2. NOT process or analyze the image data in any way
3. Simply attach the image as a PNG file and send the email

## Steps for LLM:

1. **Receive the message** from the digital painting app
2. **Extract the base64 image data** from the `imageBase64` field
3. **Create an email** using the native email system with:
   - TO: The address from `recipientEmail`
   - SUBJECT: The value from `subject`
   - BODY: The value from `body`
   - ATTACHMENT: Create a PNG file from the base64 data and attach it
4. **Send the email** through the native email system
5. **Do NOT send a response back** to the app (wantsR1Response is false)

## Important Security Note:

Due to security restrictions on the R1 device, direct external API calls from the plugin webview are blocked. However, sending base64 image data for native email attachment is permitted.

## Implementation Details:

The LLM should:
1. Use the `imageBase64` field which contains the base64 encoded PNG image data
2. Decode the base64 data to create a PNG file attachment
3. Use the native email system to create and send an email with:
   - TO: The address specified in `recipientEmail`
   - SUBJECT: "Your Digital Artwork from R1 Digital Painting App"
   - BODY: "Here is the artwork you created in the R1 Digital Painting App. The image is attached below."
   - ATTACHMENT: A PNG file named "artwork.png" created from the base64 data
4. Send the email through the native email system
5. Do NOT send a response back to the app (since wantsR1Response is false)

## Email Formatting Guidelines:

1. **TO**: Use the email address from `recipientEmail`
2. **SUBJECT**: "Your Digital Artwork from R1 Digital Painting App"
3. **BODY**: "Here is the artwork you created in the R1 Digital Painting App. The image is attached below."
4. **ATTACHMENT**: Create a PNG file from the base64 data and name it "artwork.png"

## Example Email Structure:

```
TO: [recipientEmail]
SUBJECT: Your Digital Artwork from R1 Digital Painting App
BODY: Here is the artwork you created in the R1 Digital Painting App. The image is attached below.
ATTACHMENT: artwork.png (created from the base64 data in imageBase64 field)
```

## App Stability:

To prevent the app from closing:
1. Do NOT send a response back to the app (wantsR1Response is false)
2. Do NOT close the WebView or terminate the app process
3. The app should remain open and responsive after the email is sent