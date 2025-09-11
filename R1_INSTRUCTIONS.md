# R1 System Instructions for Email with Image Attachment

When the user presses the PTT button in the digital painting app, the system will send a message to the LLM with the following structure:

```json
{
  "message": "Create and send an email with the following details:\n        TO: [user@email.com]\n        SUBJECT: Your Digital Artwork from R1 Digital Painting App\n        BODY: Here is the artwork you created in the R1 Digital Painting App. The image is attached below.\n        ATTACHMENT: The image is provided in the imageBase64 field. Please attach it as a PNG file named \"artwork.png\".",
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
3. **Create an email** with the specified TO, SUBJECT, and BODY
4. **Attach the image** as a PNG file named "artwork.png" using the base64 data
5. **Send the email** through the R1 email system

## Important Security Note:

Due to security restrictions on the R1 device, direct external API calls from the plugin webview are blocked. However, sending base64 image data through the LLM for email formatting is permitted.

## Implementation Details:

The LLM should:
1. Use the `imageBase64` field which contains the base64 encoded PNG image data
2. Decode the base64 data to create a PNG file attachment
3. Create an email with:
   - TO: The address specified in `recipientEmail`
   - SUBJECT: "Your Digital Artwork from R1 Digital Painting App"
   - BODY: "Here is the artwork you created in the R1 Digital Painting App. The image is attached below."
   - ATTACHMENT: A PNG file named "artwork.png" created from the base64 data
4. Send the email through the R1 email system
5. Provide success/failure feedback to the user

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