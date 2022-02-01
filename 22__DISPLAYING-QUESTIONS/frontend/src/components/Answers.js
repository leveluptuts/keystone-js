import React from 'react'

const Answers = ({ className, disabled = false }) => {
  return (
    <div className={`${className} flex justify-between absolute sm:relative sm:max-w-md sm:mx-auto w-full left-0 p-2`}>
      <button className="answer" disabled={disabled}>Never</button>
      <button className="answer" disabled={disabled}>Meh</button>
      <button className="answer" disabled={disabled}>50/50</button>
      <button className="answer" disabled={disabled}>Sure</button>
      <button className="answer" disabled={disabled}>100%</button>
    </div>
  )
}

export { Answers }
