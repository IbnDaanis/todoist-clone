import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  RightContainer,
  Container,
  NavbarContainer,
  NavButton,
  NavbarItem,
  LeftContainer,
  Header,
} from './NavbarStyles'
import { HomeIcon, MenuTogglerIcon, todoerLogo, todoerLogoSmRed } from '../../assets/'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ProfileMenu } from '../../components'

export const Navbar = ({ setSidebarClosed = null }) => {
  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  useEffect(() => {
    const setViewPort = () => setWindowWidth(window.innerWidth)
    window.addEventListener('resize', setViewPort)
    return () => window.removeEventListener('resize', setViewPort)
  }, [])

  return (
    <Header>
      <NavbarContainer style={{ background: !userInfo && '#fff' }} className={!userInfo && 'home'}>
        <Container className={!userInfo && 'home'}>
          {userInfo ? (
            <>
              <NavbarItem>
                <MenuTogglerIcon
                  className='menu-toggler'
                  onClick={() => setSidebarClosed(prev => !prev)}
                />
              </NavbarItem>
              <NavbarItem className='home'>
                <Link
                  to={userInfo ? '/app/today' : '/'}
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <HomeIcon />
                </Link>
              </NavbarItem>
            </>
          ) : (
            <LeftContainer>
              <div className='logo'>
                <Link to='/' style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={windowWidth > 770 ? todoerLogo : todoerLogoSmRed} alt='Todoer Logo' />
                </Link>
              </div>
              <div className='nav-links'>
                <NavButton>Features</NavButton>
                <NavButton>Premium</NavButton>
                <NavButton>For Teams</NavButton>
                <NavButton>Resources</NavButton>
              </div>
            </LeftContainer>
          )}
          <RightContainer>
            {!userInfo ? (
              <>
                <NavLink to='/login' activeClassName='active-link'>
                  <NavButton className={!userInfo && 'home'}>Log in</NavButton>
                </NavLink>
                <NavLink to='/signup' activeClassName='active-link'>
                  <NavButton className={`signup ${!userInfo && 'home'}`}>Sign Up</NavButton>
                </NavLink>
              </>
            ) : (
              <ProfileMenu />
            )}
          </RightContainer>
        </Container>
      </NavbarContainer>
    </Header>
  )
}

Navbar.propTypes = { setSidebarClosed: PropTypes.func }
