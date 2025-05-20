import React from "react";

export default function ErrorMessage({ message }) {
    return (
        <div role="alert" className="error-message">
            <p>{message}</p>
        </div>
    );
}