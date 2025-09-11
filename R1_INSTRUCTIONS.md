# R1 System Instructions for Email with Image Attachment

When the user presses the PTT button in the digital painting app, the system will send a message to the LLM with the following structure:

```json
{
  "message": "Please send an email to [user@email.com] with the artwork attached. The artwork is provided as a data URL: data:image/png;base64,... Please format the email so the image is displayed properly, either as an inline image or attachment.",
  "useLLM": true,
  "wantsR1Response": true
}
```

## CRITICAL INSTRUCTIONS - LLM ONLY FOR EMAIL

**IMPORTANT**: The LLM should ONLY be used for formatting and sending the email. No external API calls or uploads are required.

## Steps for LLM:

1. **Receive the message** from the digital painting app
2. **Extract the data URL** from the message text
3. **Format an email** to the recipient with the image properly displayed
4. **Send the email** through the R1 email system

## Important Security Note:

Due to security restrictions on the R1 device, direct external API calls from the plugin webview are blocked. However, sending a data URL through the LLM for email formatting is permitted.

## Implementation Details:

The LLM should:
1. Parse the data URL from the message
2. Create an email with the image properly formatted (either inline or as attachment)
3. Send the email to the recipient
4. Provide success/failure feedback to the user

## Data URL Format:

The data URL contains a complete image in this format:
```
data:image/png;base64,[base64_encoded_image_data]
```

This can be used directly as an image source in HTML emails or converted to a file attachment.

## Email Formatting Guidelines:

1. **Subject**: "Your Digital Artwork"
2. **Body**: "Here is the artwork you created in the R1 Digital Painting App."
3. **Image**: Should be displayed properly either as:
   - Inline image in the email body
   - Attachment to the email
4. **Format**: HTML email preferred for better image display

## Example Email Structure:

```html
<!DOCTYPE html>
<html>
<head>
    <title>Your Digital Artwork</title>
</head>
<body>
    <h2>Your Digital Artwork</h2>
    <p>Here is the artwork you created in the R1 Digital Painting App.</p>
    <img src="data:image/png;base64,..." alt="Digital Artwork" style="max-width: 100%;">
</body>
</html>
```