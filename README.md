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
3. Sends the image data and email to the R1 system with clear instructions to:
   - Upload the image to ImgBB using the provided API key
   - Extract the public URL from the ImgBB response
   - Send an email to the user with the public URL
   - All processing is done programmatically by the R1 system (not through LLM)

## Technical Implementation

The app uses the R1 Creations SDK to communicate with the device:

- `PluginMessageHandler` to send messages to the R1 system
- Base64 encoding for image data transmission
- ImgBB API for image hosting (API key: 1a2fc605085e16887ec98e57fce39914)
- Direct programmatic API calls (no LLM involvement in the upload process)

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

The R1 system will handle the ImgBB upload and email sending programmatically, without involving the LLM in those steps. The LLM will only be used for sending the final email with the URL to the user.