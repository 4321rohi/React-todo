import React, { useLayoutEffect, useState } from 'react'

const Counter = () => {

  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(prev => prev + 1);
  }


  const decrement = () => {
    setCount(prev => prev - 1);
  }

  const reset = () => {
    setCount(0);
  }

  useLayoutEffect(() => {

    if (count > 10) {
      setCount(0);
    }

  }, [count])

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter
