import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

function Header({ title }: { title: string }) {
  const path = useLocation().pathname

  useEffect(() => {
    document.title = title
  })

  return (
    <header className='p-4 flex items-center justify-center relative'>
      {path !== '/home' && path !== '/' && (
        <Link to='/home' className='text-blue-500 absolute left-4'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20px'
            viewBox='0 -960 960 960'
            width='24px'
            fill='#000'
          >
            <path d='M400-80 0-480l400-400 71 71-329 329 329 329-71 71Z' />
          </svg>
        </Link>
      )}
      <h1 className='text-xl font-semibold'>{title}</h1>
    </header>
  )
}

export default Header
