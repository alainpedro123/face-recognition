import React from 'react';

const FaceRecognition = ({ imageFromUrl, box }) => {
    return (
        <div className="face-recognition center ma">
            <div className='absolute mt2'>
                <img id='inputimage' alt="" src={imageFromUrl} />
                <div className='bounding-box' style={{ top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol }}></div>
            </div>
        </div>
    )
}

export default FaceRecognition;