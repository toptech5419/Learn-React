import React from "react";

export default function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer>
            <div className="footer-content">
                <p>© {currentYear} Gemini Chef. All recipes are AI-generated suggestions.</p>
                <nav className="footer-nav">
                    <a href="#" className="footer-link">About</a>
                    <a href="#" className="footer-link">Privacy</a>
                    <a href="#" className="footer-link">Terms</a>
                </nav>
            </div>
        </footer>
    );
}