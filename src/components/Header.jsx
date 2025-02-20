import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full h-20 max-h-[10vh] bg-gray-900 text-white flex items-center px-16 shadow-md z-50">
      <div className="flex w-full justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">NOTESAPP</h1>
        <Navbar /> {/* Navbar stays inline with the title */}
      </div>
    </header>
  );
};

export default Header;
