import ReactLogo from '../assets/react-logo.png';

export default function Header() {
  return (
    <header>
      <nav>
        <img src={ReactLogo} alt="React logo" />
      </nav>
    </header>
  );
}