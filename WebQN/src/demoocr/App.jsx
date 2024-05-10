import { useState } from 'react'

// Import Worker
import { Worker } from '@react-pdf-viewer/core';
// Import the main Viewer component
import { Viewer } from '@react-pdf-viewer/core';
// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';
// default layout plugin
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
// Import styles of default layout plugin
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import axiosHttpService from 'src/utils/httpService';



const App = (props) => {

  // creating new plugin instance
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  // pdf file onChange state
  const [pdfFile, setPdfFile] = useState(null);
  // pdf file error state
  const [pdfError, setPdfError] = useState('');


  // handle file onChange event
  const allowedFiles = ['application/pdf'];
  const handleFile = async (e) => {
    let selectedFile = e.target.files[0];
    // console.log(selectedFile.type);
    if (selectedFile) {
      console.log("uploaded file:", selectedFile);
      if (selectedFile && allowedFiles.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = (e) => {
          setPdfError('');
          setPdfFile(e.target.result);
        }

        console.log("Props day tml:", props);

        // call API
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('ratio', '20,1');
        formData.append('threshold', '0.7');

        try {
          props.setDocNo("Đang phân tích ...");
          props.setDocDate("Đang phân tích ...");
          props.setDocSigner("Đang phân tích ...");
          const response = await axiosHttpService.post('http://157.230.37.228:4444/extract', formData);
          console.log(response.data);
          props.setDocNo(response.data.no.join(' '));
          props.setDocDate(response.data.date.join(' '));
          props.setDocSigner(response.data.signer.join(' '));
        } catch (error) {
          console.error(error);
        }
      }

      else {
        setPdfError('Chỉ hỗ trợ file PDF');
        setPdfFile('');
      }
    }
    else {
      console.log('please select a PDF');
    }
  }

  return (
    <div className="container">

      {/* Upload PDF */}
      <form>

        <label><h5>Tải tài liệu lên (PDF)</h5></label>
        <br></br>

        <input type='file' className="form-control"
          onChange={handleFile}></input>

        {/* we will display error message in case user select some file
        other than pdf */}
        {pdfError && <span className='text-danger'>{pdfError}</span>}

      </form>

      {/* View PDF */}
      <h5>Xem trước tài liệu (PDF)</h5>
      <div className="viewer">

        {/* render this if we have a pdf file */}
        {pdfFile && (
          <Worker workerUrl="https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.3.122/pdf.worker.min.js">
            <Viewer fileUrl={pdfFile}
              plugins={[defaultLayoutPluginInstance]}></Viewer>
          </Worker>
        )}

        {/* render this if we have pdfFile state null   */}
        {!pdfFile && <>No file is selected yet</>}

      </div>

    </div>
  );
}

export default App;
