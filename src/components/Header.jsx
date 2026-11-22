const Header = ({ onAddClick }) => {
  return (
    <header className="header">
      <h1>Health And Fitness Tracker</h1>
      <span>Update Today's Data</span>
      <button className="btn-add" onClick={onAddClick}>
        + Add data
      </button>
    </header>
  );
};

export default Header;
