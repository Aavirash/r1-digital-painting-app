// Test script for ImgBB API upload
// This is for demonstration purposes only - the actual upload will be done by the R1 system

async function testImgBBUpload(base64ImageData, apiKey) {
  try {
    // Create form data
    const formData = new FormData();
    formData.append('key', apiKey);
    formData.append('image', base64ImageData);
    
    // Make API request
    const response = await fetch('https://api.imgbb.com/1/upload', {
      method: 'POST',
      body: formData
    });
    
    // Parse response
    const result = await response.json();
    
    if (result.success) {
      console.log('Upload successful!');
      console.log('Image URL:', result.data.url);
      console.log('Delete URL:', result.data.delete_url);
      return result.data.url;
    } else {
      console.error('Upload failed:', result);
      return null;
    }
  } catch (error) {
    console.error('Error uploading to ImgBB:', error);
    return null;
  }
}

// Example usage (this won't work in a browser due to CORS restrictions):
// const base64Data = 'iVBORw0KG...'; // Your base64 image data
// const apiKey = '1a2fc605085e16887ec98e57fce39914';
// testImgBBUpload(base64Data, apiKey);

console.log('This script demonstrates how to use the ImgBB API.');
console.log('The actual upload will be performed by the R1 system.');