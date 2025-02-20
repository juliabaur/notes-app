const Footer = () => {
    return (
      <footer className="fixed bottom-0 left-0 w-full h-20 max-h-[10vh] bg-gray-900 text-white flex items-center justify-center shadow-md">
        <p>&copy; {new Date().getFullYear()} NotesApp. All rights reserved.</p>
      </footer>
    );
  };
  
  export default Footer;
  