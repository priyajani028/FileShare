import React, { useState ,useEffect} from 'react';
import { openDB } from 'idb';


const DB_NAME = 'fileUploadDB';
const STORE_NAME = 'files';
const DB_VERSION = 1;

async function initDB() {
  const db = await openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      db.createObjectStore(STORE_NAME);
    },
  });
  return db;
}

const Page1 = () => {
  const [files, setFiles] = useState([]);
  const [token, setToken] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [inputToken, setInputToken] = useState('');
  const [db, setDb] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    initDB().then(setDb);
  }, []);

  const handleFileChange = (event) => {
    setFiles([...event.target.files]);
  };

  const handleUpload = async () => {
    if (files.length > 0 && db) {
      const generatedToken = Math.random().toString(36).substr(2, 9);
      for (const file of files) {
        await db.put(STORE_NAME, file, generatedToken + file.name);
      }
      setToken(generatedToken);
      setShowPopup(true);
      setTimeout(() => {
        files.forEach(file => {
          db.delete(STORE_NAME, generatedToken + file.name);
        });
      }, 15 * 60 * 1000); // Token expires after 15 minutes
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(token);
  };

  const handleCancel = () => {
    setFiles([]);
    setToken('');
  };

  const handleTokenChange = (event) => {
    setInputToken(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (db) {
      const fileKeys = await db.getAllKeys(STORE_NAME);
      const matchedFiles = fileKeys.filter(key => key.startsWith(inputToken));
      const filesToDisplay = await Promise.all(
        matchedFiles.map(key => db.get(STORE_NAME, key))
      );
      setUploadedFiles(filesToDisplay.map((file, index) => ({
        file: file,
        fileName: matchedFiles[index].substring(inputToken.length)
      })));
    }
  };
  

  const viewFile = (file) => {
    const url = URL.createObjectURL(file);
    window.open(url, '_blank');
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

    return (
      <div className='h-screen w-full overflow-hidden bg-[#E5F6FF] flex items-center justify-center'>
        <div className='flex flex-col text-[#3056D3] mt-8 w-2/5 h-2/3 items-center justify-center'>
          <div className='text-5xl font-bold text-center mb-5'>
            FileShare
          </div>
  
          <div className="container mx-auto max-w-screen-lg relative flex flex-col bg-white shadow-xl rounded-md p-8">
            <div className='h-full overflow-auto p-8 w-full flex flex-col justify-center items-center mb-5'>
              <div className='text-md font-semibold mb-3'>
                Access video by entering token
              </div>
              <div className="relative flex h-10 w-full min-w-[200px] max-w-[24rem]" >
                <form onSubmit={handleSubmit}>
                <input
                  type="token"
                  className="peer h-full w-full rounded-sm border border-blue-gray-200 bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-700 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                  value={inputToken}
                  onChange={handleTokenChange}
                  placeholder=" "
                  required
                />
                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[12px]  font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-700 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-blue-700 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-blue-700 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                  Token
                </label>

                <button
                  className="!absolute right-1 top-1 z-10 select-none rounded-sm bg-blue-700 py-2 px-4 text-center align-middle font-sans text-xs font-semibold text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 hover:bg-blue-500 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                  data-ripple-light="true" type="submit">
                  Access
                </button>
                <div className="uploaded-files-list">
                  {uploadedFiles.map(({ file, fileName }) => (
                    <div key={fileName}>
                      {fileName} 
                      <button onClick={() => viewFile(file)}>View</button>
                    </div>
                  ))}
                </div>
                </form>
              </div>
            </div>
  
            {/* {showUploadSection ? ( */}
            <div className=''>
              <div className="border-dashed border-2 border-gray-400 py-14 flex flex-col justify-center items-center h-36" >
                <p className="mb-3 font-semibold text-gray-900 flex flex-wrap justify-center">
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
  
              <h1 className="pt-6 pb-3 font-semibold sm:text-md text-gray-900">
                To Upload
              </h1>
  
              {/* <ul id="gallery" className="flex flex-1 flex-wrap -m-1">
              {files ? (
                <li  key={file.name}  className="h-full w-full text-center flex flex-col items-center justify-center">
                  <img
                    className="mx-auto w-32"
                    src={URL.createObjectURL(file)}
                    alt="File thumbnail"
                  />
                  <span className="text-small text-gray-500">{file.name}</span>
                </li>
              ) : (
                <li className="h-full w-full text-center flex flex-col items-center justify-center ">
                  <span className="text-small text-gray-500">No files selected</span>
                </li>
              )}
            </ul> */}

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
            </div>


{/* Pop-up */}
{showPopup && (
        <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-30 z-10">
          <div className="bg-white p-8 rounded-md shadow-xl">
            <div className="text-xl font-semibold mb-3">Token</div>
            <p>{token}</p>
            <div className="mt-4">
              <button className="bg-blue-700 text-white rounded-md px-3 py-1 mr-3" onClick={handleCopyToClipboard}>
                Copy to Clipboard
              </button>
              <button className="bg-gray-300 rounded-md px-3 py-1" onClick={handleClosePopup}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
          </div>
        </div>
      </div>
    );
  }
  
  export default Page1;
  

