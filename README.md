# R1 Digital Painting App with Direct Email Integration

This is a digital painting application designed for the R1 device that allows users to create artwork and share it via email with a public URL.

## Features

- Multiple drawing tools (brush, kaleidoscope, symmetry, drip paint, lines, sacred geometry)
- Canvas with customizable background and brush colors
- Undo functionality
- Accelerometer integration for dynamic effects
- PTT button integration for screenshot capture and sharing

## Direct Email Integration

When the user presses the PTT button, the app:

1. Takes a screenshot of the current canvas as a data URL
2. Prompts the user for their email address
3. Sends the image data URL directly to the R1 system with instructions to:
   - Send an email to the user with the image as an attachment
   - No external API calls or uploads are required
   - All processing is done securely by the R1 system

## Technical Implementation

The app uses the R1 Creations SDK to communicate with the device:

- `PluginMessageHandler` to send messages to the R1 system
- Canvas `toDataURL()` method for image capture
- Direct data URL transmission (no external services)
- Secure processing by the R1 system

## Files

- `apps/app/src/main.js` - Main application logic
- `R1_INSTRUCTIONS.md` - Detailed instructions for the R1 system

## Setup

1. Install dependencies: `npm install`
2. Build the app: `npm run build`
3. Run development server: `npm run dev`

## Deployment

The app is designed to run as an R1 Creation plugin. The built files in the `dist` directory can be deployed to the R1 device.

Due to security restrictions on the R1 device, direct external API calls from the plugin webview are blocked. However, sending a data URL for email attachment is permitted. The R1 system handles the email sending securely through its runtime environment without involving any external services or the LLM.