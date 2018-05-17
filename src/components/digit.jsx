import React from 'react'

export default function Digit(props) {
  return (
    <div id={props.id} className='digit' onClick={props.click}>{props.children}</div>
  )
}
