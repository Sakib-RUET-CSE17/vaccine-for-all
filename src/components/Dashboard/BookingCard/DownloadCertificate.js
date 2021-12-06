import React, { useState } from 'react';
import Certificate from './Certificate';

const DownloadCertificate = () => {
    const [download, setDownload] = useState(false);
    return (
        <div className="container">
            <div className="text-center mt-2">
                <button onClick={() => setDownload(true)} className="btn btn-success">Download Certificate</button>
            </div>
            <Certificate download={download} setDownload={setDownload} />
        </div>
    );
};

export default DownloadCertificate;