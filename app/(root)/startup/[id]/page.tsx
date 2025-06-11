import React from 'react'

type Props = {}

const Startup = async({ params }: {params: Promise<{id: string}>}) => {
const id = (await params).id;

    return (
    <>
    <h1>This is a startup number {id}</h1>
    </>
  )
}

export default Startup