import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-8">Fresh Start</h1>
        <div className="space-y-4">
          <p className="text-xl">Ready to build something amazing!</p>
          <button
            onClick={() => setCount((count) => count + 1)}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold transition-colors"
          >
            Count is {count}
          </button>
        </div>
      </div>
    </div>
  )
}

export default App