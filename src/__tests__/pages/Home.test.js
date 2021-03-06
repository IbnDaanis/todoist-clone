import React from 'react'
import { render, screen } from '@testing-library/react'
import { Home } from '../../pages'
import { Provider } from 'react-redux'
import store from '../../store/store'
import { BrowserRouter as Router } from 'react-router-dom'

test('Homepage should load', () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>
  )

  expect(screen.getByTestId('heading')).toBeTruthy()
})
