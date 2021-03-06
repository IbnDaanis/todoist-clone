import styled from 'styled-components/macro'

export const SidebarContainer = styled.div`
  position: absolute;
  top: 44px;
  left: 0;
  height: calc(100vh - 44px);
  background: ${props => props.theme.foreground};
  width: 305px;
  transition: transform 0.3s ease-in-out;
  z-index: 100;
  overflow-x: hidden;
  position: fixed;

  @media (max-width: 750px) {
    transform: translateX(-310px);
  }
  &.closed {
    transform: translateX(-310px);

    @media (max-width: 750px) {
      transform: translateX(0px);
    }
  }
`

export const Container = styled.div`
  padding: 30px 0 0 47px;
  transform: translateX(-12px);
`

export const SidebarButtonContainer = styled.div`
  width: 265px;
  padding: 5px 16px 5px 0px;
  border-radius: 3px;

  &.active {
    span {
      font-weight: 400;
    }
  }
`

export const SidebarItem = styled.div`
  color: ${props => props.theme.text};
  border: 0;
  outline: 0;
  background: none;
  font-size: 14px;
  font-weight: 300;
  text-align: left;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;

  small {
    padding: 2px 0 0 5px;
    display: inline-block;
    color: ${props => props.theme.textSecondary};
    font-size: 12px;
    min-width: 10px;
    margin-left: auto;
  }
`

export const ProjectsButtonContainer = styled.div`
  width: 265px;
  border-bottom: 1px solid ${props => props.theme.border};
  padding: 10px 16px 10px 0px;

  .dropdown {
    width: 38px;
    display: grid;
    place-content: center;
  }

  svg {
    transform: translate(0px, 0px);
    transform-origin: 50% 50%;
    transition: transform 0.15s cubic-bezier(0.4, 0, 0.2, 1) 0ms;

    &.projects-closed {
      transform: rotate(-90deg);
    }
  }
`

export const ProjectsButton = styled.button`
  margin-top: 1rem;
  color: ${props => props.theme.textColour};
  border: 0;
  outline: 0;
  background: none;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  width: 224px;
  height: 100%;
  cursor: pointer;
  display: flex;
  align-items: center;
`

export const ProjectTitles = styled.ul`
  width: 265px;
  overflow-y: hidden;
  max-height: ${props => props.height}px;

  &.projects-closed {
    max-height: 0;
  }

  li {
    min-height: 24px;
    font-size: 14px;
    font-weight: 300;
    list-style: none;
    cursor: pointer;
    border-radius: 3px;
    overflow: hidden;
    transition: background-color 0.1s ease-in;
    color: ${props => props.theme.text};
    line-height: 24px;
    margin: 0 0 0.2rem;

    a {
      text-decoration: none;
      display: block;
      width: 100%;
      height: 100%;
      padding: 5px 16px 5px 0px;

      .container {
        display: flex;
        align-items: center;

        .text {
          display: flex;
          align-items: center;
          flex: 1;

          span {
            color: ${props => props.theme.text};
            word-break: break-word;
          }

          small {
            display: inline-block;
            padding: 2px 0 0 5px;
            color: ${props => props.theme.textSecondary};
            font-size: 12px;
            min-width: 10px;
            min-height: 26px;
            margin-left: auto;
          }
        }
      }
    }

    &:hover {
      background-color: ${props => props.theme.active};
    }

    .active {
      background-color: ${props => props.theme.active};
      font-weight: 400;

      &:hover {
        button {
          opacity: 1;
          cursor: pointer;
          display: inline;
          pointer-events: initial;
        }
      }
    }
  }
`

export const BulletPoint = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 38px;

  div {
    &::before {
      content: '';
      display: inline-block;
      width: 10px;
      height: 10px;
      background-color: rgb(128, 128, 128);
      border-radius: 50%;
    }
  }
`

export const AddProjectFormToggler = styled.div`
  padding: 5px 16px 5px 0px;
`

export const AddProjectFormTogglerButton = styled.button`
  outline: 0;
  cursor: pointer;
  font-size: 1.3rem;
  font-weight: 300;
  transition: background 0.2s ease-in-out;
  display: flex;
  align-items: center;
  background: none;
  border: none;

  &:hover {
    span {
      color: ${props => props.theme.lightRed};
    }

    .icon {
      &-wrapper {
        background: ${props => props.theme.lightRed};

        svg {
          color: ${props => props.theme.foreground};
        }
      }
    }
  }

  .icon {
    display: flex;
    align-items: center;
    width: 38px;
    transform: translate(10.5px, 0px);

    &-wrapper {
      height: 17px;
      width: 17px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;

      svg {
        color: ${props => props.theme.lightRed};
      }
    }
  }
`

export const AddProjectFormTogglerText = styled.span`
  background: none;
  outline: 0;
  border: 0;
  padding: 5px 16px 5px 0;
  font-size: 14px;
  font-weight: 300;
  color: ${props => props.theme.textSecondary};
  transition: 0.2s ease-in-out;
  transform: translateY(0px);
`
