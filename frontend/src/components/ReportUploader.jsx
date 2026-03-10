import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileText, X, CheckCircle } from 'lucide-react';
import api from '../services/api';
import Spinner from './ui/Spinner';
import Button from './ui/Button';

const ReportUploader = ({ onReportProcessed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [reportData, setReportData] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.startsWith('image/'))) {
      setFile(droppedFile);
    }
  };

  const handleFileSelect = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setUploading(true);
    setProgress(20);

    try {

      const res = await api.post(
        "/report/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );

      setProgress(60);
      setUploading(false);
      setProcessing(true);

      const uploadedReport = res.data;

      setTimeout(() => {

        setProgress(100);

        const report = {
          uploadId: uploadedReport?.report?._id || Date.now(),
          fileName: file.name,
          uploadedAt: new Date().toISOString(),
          status: "stored"
        };

        setReportData(report);

        onReportProcessed?.(report);

        setProcessing(false);

      }, 1500);

    } catch (error) {

      console.error("Upload error:", error);
      setUploading(false);
      setProcessing(false);

      alert("Upload failed");

    }
  };

  const handleRemove = () => {
    setFile(null);
    setReportData(null);
    setProgress(0);
  };

  return (
    <div className="w-full">

      {!file && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className={`
            border-2 border-dashed rounded-xl p-8 text-center cursor-pointer
            transition-all duration-200
            ${isDragging
              ? 'border-primary-green bg-green-50'
              : 'border-gray-300 hover:border-primary-green hover:bg-green-50'
            }
          `}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,image/*"
            onChange={handleFileSelect}
            className="hidden"
          />

          <Upload className="w-12 h-12 mx-auto mb-4 text-primary-green" />

          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Upload Medical Report
          </h3>

          <p className="text-gray-500 mb-4">
            Drag and drop or click to select
          </p>

          <p className="text-sm text-gray-400">
            Supported: PDF, PNG, JPG (Max 10MB)
          </p>
        </motion.div>
      )}

      {file && !reportData && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border p-6"
        >
          <div className="flex items-center gap-4 mb-6">

            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-primary-green" />
            </div>

            <div className="flex-1">
              <h4 className="font-medium text-gray-800">{file.name}</h4>
              <p className="text-sm text-gray-500">
                {(file.size / 1024).toFixed(1)} KB
              </p>
            </div>

            <button
              onClick={handleRemove}
              className="p-2 hover:bg-gray-100 rounded-lg"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>

          </div>

          {(uploading || processing) && (
            <div className="mb-6">

              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">
                  {uploading ? 'Uploading...' : 'Processing Report...'}
                </span>

                <span className="text-primary-green font-medium">
                  {progress}%
                </span>
              </div>

              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  className="h-full bg-primary-green rounded-full"
                />
              </div>

            </div>
          )}

          {processing && (
            <div className="text-center py-4">
              <Spinner size="lg" text="Structuring Diagnostic Report Data..." />
            </div>
          )}

          {!uploading && !processing && (
            <div className="flex gap-3">

              <Button
                variant="primary"
                onClick={handleUpload}
                className="flex-1"
              >
                Process Report
              </Button>

              <Button
                variant="secondary"
                onClick={handleRemove}
              >
                Cancel
              </Button>

            </div>
          )}

        </motion.div>
      )}

      {reportData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-xl p-6"
        >

          <div className="flex items-center gap-3 mb-4">
            <CheckCircle className="w-6 h-6 text-success" />
            <h4 className="font-semibold text-gray-800">
              Report Uploaded Successfully
            </h4>
          </div>

          <p className="text-gray-600 mb-4">
            Your report has been uploaded and is available for doctors to review.
          </p>

        </motion.div>
      )}

    </div>
  );
};

export default ReportUploader;