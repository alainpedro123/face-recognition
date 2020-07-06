import React from 'react';

const ImageLinkForm = ({ enteringUrl, onPictureSubmit }) => {
    return (
        <div>
            <p>
                {'This Magic Brain will detect faces in your pictures. Give it a try and enter an image URL below'}
            </p>
            <div className="image-link-form">
                <div className="form center">
                    <input className='input center' type="text" onChange={enteringUrl}></input>
                    <button className="button" onClick={onPictureSubmit}>Detect</button>
                </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;