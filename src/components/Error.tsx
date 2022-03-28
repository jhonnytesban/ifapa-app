import React from 'react'

type Props = {
  children: JSX.Element
}

const Error = ({children}: Props) => {
  return (
    <>
      {children}
    </>
  )
}

export default Error