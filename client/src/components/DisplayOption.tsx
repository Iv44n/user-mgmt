import { Link } from 'react-router-dom'

interface DisplayOptionProps {
  title: string
  value: string
  to?: string
}

function DisplayOption({ title, value, to }: DisplayOptionProps) {
  return (
    <Link to={`/${to}`}>
      <div
        className={`py-3 px-4 ${
          title !== 'Name' && 'border-t'
        } border-blue-300 flex items-center justify-between`}
      >
        <span>
          <h2 className='font-semibold'>{title}</h2>
          <p>{value}</p>
        </span>
        <span>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            height='20px'
            viewBox='0 -960 960 960'
            width='24px'
            fill='#000'
          >
            <path d='m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z' />
          </svg>
        </span>
      </div>
    </Link>
  )
}

export default DisplayOption
