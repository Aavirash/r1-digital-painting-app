# R1 Digital Painting App with ImgBB Integration

This is a digital painting application designed for the R1 device that allows users to create artwork and share it via email with a public URL.

## Features

- Multiple drawing tools (brush, kaleidoscope, symmetry, drip paint, lines, sacred geometry)
- Canvas with customizable background and brush colors
- Undo functionality
- Accelerometer integration for dynamic effects
- PTT button integration for screenshot capture and sharing

## ImgBB Integration

When the user presses the PTT button, the app:

1. Takes a screenshot of the current canvas
2. Prompts the user for their email address
3. Sends the image data to the R1 system with instructions to:
   - Upload the image to ImgBB using the provided API key
   - Extract the public URL from the ImgBB response
   - Send an email to the user with the public URL
   - All processing is done securely by the R1 system (not through LLM)

## Technical Implementation

The app uses the R1 Creations SDK to communicate with the device:

- `PluginMessageHandler` to send messages to the R1 system
- Base64 encoding for image data transmission
- ImgBB API for image hosting (API key: 1a2fc605085e16887ec98e57fce39914)
- Secure processing by the R1 system (no direct API calls from webview due to security restrictions)

## Files

- `apps/app/src/main.js` - Main application logic
- `R1_INSTRUCTIONS.md` - Detailed instructions for the R1 system
- `test-imgbb-upload.js` - Example script demonstrating ImgBB API usage

## Setup

1. Install dependencies: `npm install`
2. Build the app: `npm run build`
3. Run development server: `npm run dev`

## Deployment

The app is designed to run as an R1 Creation plugin. The built files in the `dist` directory can be deployed to the R1 device.

Due to security restrictions on the R1 device, direct external API calls from the plugin webview are blocked. The R1 system handles the ImgBB upload and email sending securely through its runtime environment. The LLM is only involved in sending the final email with the URL to the user.