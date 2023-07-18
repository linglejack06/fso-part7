import Button from "./components/Button";

function App() {
  return (
    <div className="container mx-auto flex max-w-sm space-y-2 rounded-xl bg-white px-8 py-8 shadow-lg hover:h-full hover:w-full sm:items-center sm:space-x-6 sm:space-y-0 sm:py-4">
      <div className="space-y-2 text-center sm:text-left">
        <div className="space-y-0.5">
          <p className="text-lg font-semibold text-black">Erin Lindford</p>
          <p className="font-medium text-slate-500">Product Engineer</p>
        </div>
        <Button onClick={() => console.log("boom")}>Boom!</Button>
      </div>
    </div>
  );
}

export default App;
