import React from 'react';

const EditableAvatar = ({ imageURL, handleImageUpload }) => {
    return (
        <>
            <img className="img-fluid"
                src={imageURL}
                alt="upload"
            />
            <input
                type="file"
                accept="image/*"
                style={{
                    position: "absolute",
                    maxWidth: "100%",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    opacity: 0,
                    cursor: "pointer"
                }}
                onChange={handleImageUpload}
            />
        </>
    );
};

export default EditableAvatar;