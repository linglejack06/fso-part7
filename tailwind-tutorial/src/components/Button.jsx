const Button = ({ onClick, children }) => {
  return (
    <button
      className="text-md rounded-xl border border-purple-200 bg-purple-600  p-1 px-4 font-semibold text-white transition hover:scale-110 hover:bg-purple-800 sm:bg-blue-600"
      onClick={onClick}
    >
      {children}
    </button>
  );
};
export default Button;
