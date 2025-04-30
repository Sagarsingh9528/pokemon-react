import React from 'react'
import { useState } from 'react'

function Search({getQuery}) {
    const [text, setText] = useState("")
    const onChange = (q) =>{
        setText(q)
        const lower = q.toLowerCase()
        getQuery(lower)

    }
  return (
    <section className='search border-none'>
            <form>
                <input 
                    type='text' 
                    className='w-[60%] h-12 rounded-md font-medium outline-none bg-red-200 p-4 text-2xl'
                    placeholder='Search here'
                    value={text}
                    onChange={(e) => onChange(e.target.value)}
                    autoFocus
                />
            </form>
        </section>
  )
}

export default Search
