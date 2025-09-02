import { Button } from "./components/ui/button"

function App() {

  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-blue-600">
        React + Vite + Tailwind + TS
      </h1>
      <Button>Click me</Button>
    </div>
  )
}

export default App
