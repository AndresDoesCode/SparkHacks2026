import { useState } from 'react'

import './App.css'

function App() {
  //cool = var
  //setCool = how you change the variable
  //useState = 
  const [cool, setCool] = useState(0)

  function evenBetter() {
    setCool(prev => prev + 1)
  }

  return (
    <>
    <div className='background'>
      <p>{cool}</p>
      <button onClick={(evenBetter)}>Click me</button>
      <p className="cool_thing">
        geygvhcgyevcguyevcegec hello world of html
      </p>
    </div>

    </>
  )

}

export default App
