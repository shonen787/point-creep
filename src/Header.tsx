import "./Header.css";
function Header() {
  return (
    <header>
      <h2>Point Creep</h2>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/points">Points</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </header>
  );
}

export default Header;
