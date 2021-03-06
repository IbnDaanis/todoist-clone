import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { InboxIcon as InboxIconSvg, UpcomingIcon as UpcomingIconSvg } from '../../assets/'
import { ThemeContext } from '../../App'

export const InboxIcon = () => {
  const { darkTheme } = useContext(ThemeContext)
  return (
    <div
      style={{
        color: darkTheme ? '#5297ff' : '#246fe0',
        width: '38px',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <InboxIconSvg />
    </div>
  )
}

export const TodayIcon = ({ date }) => {
  const { darkTheme } = useContext(ThemeContext)
  return (
    <div
      style={{
        color: darkTheme ? '#25b84c' : '#058527',
        width: '38px',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <svg width='24' height='24'>
        <g fill='currentColor' fillRule='evenodd'>
          <path
            fillRule='nonzero'
            d='M6 4.5h12A1.5 1.5 0 0119.5 6v2.5h-15V6A1.5 1.5 0 016 4.5z'
            opacity='.1'
          />
          <path
            fillRule='nonzero'
            d='M6 4h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2zm0 1a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V6a1 1 0 00-1-1H6zm1 3h10a.5.5 0 110 1H7a.5.5 0 010-1z'
          />
          <text
            fontFamily="-apple-system, system-ui, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol'"
            fontSize='9'
            transform='translate(4 2)'
            fontWeight='500'
          >
            <tspan x='8' y='15' textAnchor='middle'>
              {date}
            </tspan>
          </text>
        </g>
      </svg>
    </div>
  )
}

TodayIcon.propTypes = { date: PropTypes.string }

export const UpcomingIcon = () => {
  const { darkTheme } = useContext(ThemeContext)
  return (
    <div
      style={{
        color: darkTheme ? '#a970ff' : '#692fc2',
        width: '38px',
        display: 'grid',
        placeContent: 'center',
      }}
    >
      <UpcomingIconSvg />
    </div>
  )
}
