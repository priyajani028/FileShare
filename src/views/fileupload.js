import React, { useState } from 'react';

const FileUpload= () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleUpload = () => {
    // Perform the upload action here using the selected file
    // This can be an API call or any other logic to handle the file upload
    console.log('File to upload:', file);
    alert('File uploaded successfully');
    setFile(null); // Clear the selected file
  };

  const handleCancel = () => {
    setFile(null);
  };

  return (
      <div className="container mx-auto max-w-screen-lg h-full">
        <div className="relative h-full flex flex-col bg-white shadow-xl rounded-md">
          <div className="h-full overflow-auto p-8 w-full h-full flex flex-col">
            <div className="border-dashed border-2 border-gray-400 py-12 flex flex-col justify-center items-center">
              <input
                id="hidden-input"
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                onClick={() => document.getElementById('hidden-input').click()}
                className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
              >
                Upload a file
              </button>
            </div>

            <h1 className="pt-8 pb-3 font-semibold sm:text-lg text-gray-900">
              To Upload
            </h1>

            <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              {file ? (
                <li className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                  <img
                    className="mx-auto w-32"
                    src={URL.createObjectURL(file)}
                    alt="File thumbnail"
                  />
                  <span className="text-small text-gray-500">{file.name}</span>
                </li>
              ) : (
                <li className="h-full w-full text-center flex flex-col items-center justify-center items-center">
                  <span className="text-small text-gray-500">No files selected</span>
                </li>
              )}
            </ul>
          </div>

          <div className="flex justify-end px-8 pb-8 pt-4">
            <button
              onClick={handleUpload}
              className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none"
            >
              Upload now
            </button>
            <button
              onClick={handleCancel}
              className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
  );
};

export default FileUpload;
