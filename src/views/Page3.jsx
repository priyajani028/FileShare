{/* <div className='border-2 border-red-500'>
<div className="border-dashed border-2 border-gray-400 py-14 flex flex-col justify-center items-center h-36" >
<div 
onDragOver={handleDragOver}
onDrop={handleDrop}
>
  <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center border-2 border-pink-400">
    <span>Drag and drop your</span>&nbsp;<span>file anywhere or</span>
  </p>
  <input
  id="hidden-input"
  type="file"
  multiple
  onChange={handleFileChange}
  className="hidden"
/>
  <button id="button" className="mt-2 rounded-sm px-3 py-1 bg-gray-200 hover:bg-gray-300 focus:shadow-outline focus:outline-none" onClick={() => document.getElementById('hidden-input').click()}>
    Upload files
  </button>
  </div>
</div>

<h1 className="pt-6 pb-3 font-semibold sm:text-md text-gray-900">
  To Upload
</h1>



{files.length > 0 && (
  <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
      {files.map((file) => (
          <li key={file.name} className="h-full w-full text-center flex flex-col items-center justify-center">
              <img
                  className="mx-auto w-32"
                  src={URL.createObjectURL(file)}
                  alt="File thumbnail"
              />
              <span className="text-small text-gray-500">{file.name}</span>
          </li>
      ))}
  </ul>
)}


<div className="flex justify-end px-8 pb-4 pt-6">
  <button id="submit" className="rounded-sm px-3 py-1 bg-blue-700 hover:bg-blue-500 text-white focus:shadow-outline focus:outline-none" onClick={handleUpload}>
    Upload
  </button>

  <button id="cancel" className="ml-3 rounded-sm px-3 py-1 hover:bg-gray-300 focus:shadow-outline focus:outline-none" onClick={handleCancel}> 
    Cancel
  </button>
</div>
</div> */}