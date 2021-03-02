import { forwardRef } from 'react'
import { BulletPoint } from '../../containers/Sidebar/SidebarStyles'
import { Arrow, MenuContainer, MenuItem, MenuList } from './MenuStyles'
import { ReactComponent as Checkmark } from '../../assets/images/checkmark.svg'
import { ReactComponent as InboxIcon } from '../../assets/images/inbox.svg'

export const Menu = forwardRef((props, ref) => {
  const { data, state, setState, toggleOpen } = props
  // const inbox = data?.filter(project => project.title === 'Inbox')
  // const filtered = data?.filter(project => project.title !== 'Inbox')

  // inbox.push(filtered)

  // console.log({ filtered, inbox })

  return (
    <MenuContainer onClick={() => toggleOpen(false)} ref={ref}>
      <Arrow />
      <MenuList>
        {data?.map(project => (
          <MenuItem
            key={project.id}
            onClick={() => setState && setState(project.title)}
            className={state === project.title ? 'selected' : undefined}
          >
            {project.title === 'Inbox' ? (
              <BulletPoint>
                <InboxIcon style={{ color: '#246fe0' }} />
              </BulletPoint>
            ) : (
              <BulletPoint>
                <div></div>
              </BulletPoint>
            )}
            <span>{project.title}</span>
            {state === project.title && (
              <div className='checkmark'>
                <Checkmark />
              </div>
            )}
          </MenuItem>
        ))}
      </MenuList>
    </MenuContainer>
  )
})
