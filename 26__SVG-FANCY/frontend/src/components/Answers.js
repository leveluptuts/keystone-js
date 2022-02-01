import React from 'react'

const Answers = ({ className, disabled = false, submitAnswer }) => {

  const handleSubmit = (event, answerAmount) => {
    event.preventDefault();
    submitAnswer(answerAmount);
  }

  return (
    <div className={`${className} flex justify-between absolute sm:relative sm:max-w-md sm:mx-auto w-full left-0 p-2`}>
      <button className="answer" disabled={disabled} onClick={(event) => { handleSubmit(event, 1) }}>Never</button>
      <button className="answer" disabled={disabled} onClick={(event) => { handleSubmit(event, 2) }}>Meh</button>
      <button className="answer" disabled={disabled} onClick={(event) => { handleSubmit(event, 3) }}>50/50</button>
      <button className="answer" disabled={disabled} onClick={(event) => { handleSubmit(event, 4) }}>Sure</button>
      <button className="answer" disabled={disabled} onClick={(event) => { handleSubmit(event, 5) }}>100%</button>
    </div>
  )
}

export { Answers }
