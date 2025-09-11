# R1 System Instructions for Email with Image Attachment

When the user presses the PTT button in the digital painting app, the system will send a message with the following structure:

```json
{
  "message": "Please send an email to [user@email.com] with the attached artwork",
  "imageDataURL": "data:image/png;base64,iVBORw0KG...",
  "recipientEmail": "[user@email.com]",
  "action": "sendEmailWithImageAttachment"
}
```

## CRITICAL INSTRUCTIONS - NO UPLOAD REQUIRED

**IMPORTANT**: Do NOT upload the image to any external service. The image data is already provided as a complete data URL.

## Steps for R1 System:

1. **Receive the message** from the digital painting app
2. **Extract the image data** from the `imageDataURL` field
3. **Send an email** to the address in `recipientEmail` with the image as an attachment
4. **DO NOT** use the LLM for any part of this process

## Important Security Note:

Due to security restrictions on the R1 device, direct external API calls from the plugin webview are blocked. However, sending a data URL for email attachment is permitted.

## Implementation Details:

The R1 system should:
1. Extract the data URL from the `imageDataURL` field
2. Create an email with the image as an attachment
3. Send the email to the recipient
4. Provide success/failure feedback to the user
5. DO NOT involve the LLM in any part of this process

## Data URL Format:

The `imageDataURL` field contains a complete data URL in this format:
```
data:image/png;base64,[base64_encoded_image_data]
```

This can be directly used as an image source in HTML emails or converted to a file attachment.

## Example Code Structure:

```javascript
// PSEUDOCODE - This is how the R1 system should handle the request
async function handleEmailWithImage(request) {
  try {
    // Step 1: Extract the data URL
    const dataURL = request.imageDataURL;
    
    // Step 2: Send email with image attachment (NOT through LLM)
    await sendEmailWithAttachment(request.recipientEmail, dataURL);
    
    // Step 3: Send success feedback to app
    sendFeedbackToApp("Email sent successfully!");
  } catch (error) {
    // Handle errors and send feedback to app
    sendFeedbackToApp("Error: " + error.message);
  }
}
```