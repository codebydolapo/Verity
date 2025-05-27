import React from 'react'

type Props = {
    searchParams: {
        q: string
    }
}

async function searchPage({searchParams: {q}}: Props) {

console.log(q)
  return (
    <div className='min-h-[90vh]'>searchPage</div>
  )
}

export default searchPage