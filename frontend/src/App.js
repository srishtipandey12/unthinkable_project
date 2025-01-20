import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [pdfText, setPdfText] = useState('');
  const [filePath, setFilePath] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [summaryStatus, setSummaryStatusStatus] = useState('');
  const [extractStatus, setExtractStatusStatus] = useState('');
  const [summarizedText, setSummarizedText] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) return alert('Please select a file first.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      setUploadStatus('Uploading...');
      const response = await axios.post('https://unthinkableproject-production.up.railway.app/api/v1/files/file-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setFilePath(response.data.data.file);
      setUploadStatus('File uploaded successfully!');
    } catch (error) {
      setUploadStatus('Upload failed!');
      console.error('Error uploading file:', error);
    }
  };

  const extractTextFromPDF = async () => {
    setExtractStatusStatus("Extracting....");
    if (!filePath) return alert('No file uploaded. Please upload a file first.');

    try {
      const responseText = await axios.post(
        'https://unthinkableproject-production.up.railway.app/api/v1/files/extract-text',
        { filePath },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
    setExtractStatusStatus("Extracting Successful.");
      setPdfText(responseText.data.data.text);
    } catch (error) {
      console.error('Error extracting text:', error);
    }
  };const summarizeText = async () => {
    setSummaryStatusStatus("Summarizing....");
    if (!pdfText) return alert('No text extracted. Please extract text first.');
  
    const payload = {
      inputs: pdfText, 
    };
  
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/facebook/bart-large-cnn", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.REACT_APP_AI_API_KEY}`, 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
       setSummaryStatusStatus("Summarized Successful.");
      if (result && result[0] && result[0].summary_text) {
        setSummarizedText(result[0].summary_text);
      } else {
        setSummarizedText("Failed to summarize text.");
      }
    } catch (error) {
      console.error('Error summarizing text:', error);
      setSummarizedText("Error: Unable to connect to the API.");
    }
  };
  
  return (
    <div className="container">
    <h1 className="title">PDF Upload & Summarizer</h1>
    <div className="upload-container">
      <label htmlFor="fileInput" className="file-label">
        Choose a File
      </label>
      <input
        type="file"
        id="fileInput"
        onChange={handleFileChange}
        className="file-input"
      />
      <button onClick={handleFileUpload} className="upload-button">
        Upload
      </button>
      <p className="status">{uploadStatus}</p>
    </div>

    {uploadStatus === "File uploaded successfully!" && (
      <div className="text-extraction">
        <button onClick={extractTextFromPDF} className="extract-button">
          Extract Text
        </button>
      <p className="status">{extractStatus}</p>
        {pdfText && (
          <div className="result">
            <h3>Extracted Text</h3>
            <p>{pdfText}</p>
          </div>
        )}
      </div>
    )}

    {pdfText && (
      <div className="summarization">
        <button onClick={summarizeText} className="summarize-button">
          Summarize Text
        </button>
       <p className="status">{summaryStatus}</p>
        {summarizedText && (
          <div className="result">
            <h3>Summarized Text</h3>
            <p>{summarizedText}</p>
          </div>
        )}
      </div>
    )}
  </div>
  );
}

export default App;
