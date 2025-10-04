import React, { useState } from 'react';

const Counter = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800">React Counter</h2>
      <p className="text-4xl font-mono text-blue-600">
        Current Count: {count}
      </p>
      <div className="flex space-x-4">
        <button
          onClick={() => setCount(count + 1)}
          className="px-6 py-2 text-white bg-green-500 rounded-full shadow-md hover:bg-green-600 transition-colors"
        >
          Increment
        </button>
        <button
          onClick={() => setCount(count - 1)}
          className="px-6 py-2 text-white bg-yellow-500 rounded-full shadow-md hover:bg-yellow-600 transition-colors"
        >
          Decrement
        </button>
        <button
          onClick={() => setCount(0)}
          className="px-6 py-2 text-white bg-red-500 rounded-full shadow-md hover:bg-red-600 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Counter;
