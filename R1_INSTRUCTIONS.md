# R1 System Instructions for Email with Image Attachment

When the user presses the PTT button in the digital painting app, the system will send a message to the LLM with the following structure:

```json
{
  "message": "Please send an email to [user@email.com] with the attached artwork. Format the email with a subject 'Your Digital Artwork' and include the image as an attachment.",
  "imageBase64": "[base64_encoded_image_data]",
  "recipientEmail": "[user@email.com]",
  "useLLM": true,
  "wantsR1Response": true
}
```

## CRITICAL INSTRUCTIONS - LLM ONLY FOR EMAIL

**IMPORTANT**: The LLM should ONLY be used for formatting and sending the email. No external API calls or uploads are required.

## Steps for LLM:

1. **Receive the message** from the digital painting app
2. **Extract the base64 image data** from the `imageBase64` field
3. **Format an email** to the recipient with the image properly attached
4. **Send the email** through the R1 email system

## Important Security Note:

Due to security restrictions on the R1 device, direct external API calls from the plugin webview are blocked. However, sending base64 image data through the LLM for email formatting is permitted.

## Implementation Details:

The LLM should:
1. Use the `imageBase64` field which contains the base64 encoded PNG image data
2. Create an email with the image as an attachment
3. Send the email to the address in `recipientEmail`
4. Provide success/failure feedback to the user

## Email Formatting Guidelines:

1. **Subject**: "Your Digital Artwork"
2. **Body**: "Here is the artwork you created in the R1 Digital Painting App."
3. **Attachment**: The image should be attached to the email
4. **Format**: HTML email preferred for better presentation

## Example Email Structure:

```
To: [recipientEmail]
Subject: Your Digital Artwork
Body: Here is the artwork you created in the R1 Digital Painting App.
Attachment: artwork.png (created from the base64 data)
```