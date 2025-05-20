import React from "react";
import chefClaudeLogo from "../images/chef-claude-icon.png";

export default function Header() {
    return (
        <header>
            <div className="header-container">
                <img 
                    src={chefClaudeLogo} 
                    alt="Chef Claude logo" 
                    className="chef-logo"
                />
                <h1>Gemini Chef</h1>
            </div>
        </header>
    );
}