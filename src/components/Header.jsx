export default function Header({ openLogin, user, logout }) {
  return (
    <nav className="flex justify-between items-center p-4 bg-black sticky top-0 z-10">
      <div className="text-red-600 font-bold">Chicken</div>
      <ul className="flex space-x-4">
        <li><a href="#home" className="hover:text-red-600">Home</a></li>
        <li><a href="#menu" className="hover:text-red-600">Menu</a></li>
        <li><a href="#about" className="hover:text-red-600">About</a></li>
        <li><a href="#contact" className="hover:text-red-600">Contact</a></li>
        <li><a href="#profile" className="hover:text-red-600">Profile</a></li>

      </ul>
      {user ? (
        <div className="flex items-center space-x-4">
          <span className="text-white">Hi, {user.email}</span>
          <button onClick={logout} className="bg-red-800 px-4 py-2 rounded">Logout</button>
        </div>
      ) : (
        <button onClick={openLogin} className="bg-red-800 px-4 py-2 rounded">Sign In</button>
      )}
    </nav>
  );
}