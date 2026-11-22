const Header = ({ onAddClick }) => {
  return (
    <header className="header">
      <h1>Health And Fitness Tracker</h1>
      <button className="btn-add" onClick={onAddClick}>
        + Add data
      </button>
    </header>
  );
};

export default Header;
