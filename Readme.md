# PDF Upload & Summarization Tool

This project is a React-based web application that allows users to upload PDF files, extract text from them, and summarize the extracted text. It supports different summary types (short, medium, and long) and uses external APIs for text extraction and summarization.

## Features

- *PDF Upload*: Upload PDF files to the server.
- *Text Extraction*: Extract text from uploaded PDF files.
- *Text Summarization*: Summarize extracted text into short, medium, or long summaries.
- *Responsive Design*: Works across different devices and screen sizes.

## Technologies Used

- *Frontend*: React, CSS
- *Backend*: Express.js
- *APIs*:
  - Text Extraction: Custom backend endpoint
  - Summarization: Hugging Face's facebook/bart-large-cnn model

## Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   bash
   git clone https://github.com/srishtipandey12/unthinkable_project.git
   

2. Navigate to the project directory:
   bash
   cd unthinkable_project
   
3. For frontend
    bash
   cd frontend
4. For backend
   bash
   cd backend

5. Install dependencies:
   bash
   npm install
   

6. Create a .env file in the root directory and add the following variables:
   env
   REACT_APP_AI_API_KEY=your_hugging_face_api_key
   

### Running the Application

1. Start the development server:
   bash
   npm start
   

2. Open your browser and navigate to:
   
   http://localhost:3000

## API Endpoints

### Backend

#### File Upload
- *Endpoint*: POST /api/v1/files/file-upload
- *Description*: Uploads a PDF file and returns the file path.

#### Text Extraction
- *Endpoint*: POST /api/v1/files/extract-text
- *Description*: Extracts text from the uploaded PDF file.

### Summarization
- *Endpoint*: Hugging Face Inference API
- *Description*: Summarizes the extracted text based on the selected type (short, medium, long).

## Usage

1. Upload a PDF file using the "Choose a File" button.
2. Click "Upload" to upload the file to the server.
3. Once uploaded, click "Extract Text" to extract text from the PDF.
4. Choose the summary type (short, medium, or long) and click "Summarize Text" to generate a summary.

## Customization

- *Styling*: Modify App.css for custom styles.
- *APIs*: Update endpoints in App.js for custom backends or APIs.

## Troubleshooting

- Ensure the .env file contains a valid Hugging Face API key.
- Verify backend endpoints are reachable.
- Check the browser console for errors.
