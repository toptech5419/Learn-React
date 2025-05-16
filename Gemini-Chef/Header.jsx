import chefClaudeLogo from "./images/chef-claude-icon.png"

export default function Header() {
    return (
        <header>
            <img src={chefClaudeLogo}/>
            <h1>Gemini Chef</h1>
        </header>
    )
}