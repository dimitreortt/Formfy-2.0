import React from 'react';
import { render, screen } from '@testing-library/react';
import { within, getByText, findByText } from '@testing-library/dom';
import App from '../views/components/App';

describe('App', () => {
  //(???)
  it('it renders', () => {
    render(<App />);
  });

  beforeAll(() => {});

  it('Should render a collapsible Sidebar component', () => {
    const { getByTestId } = render(<App />);
    const appHeader = getByTestId('app-header');
    const collaspsibleSidebar = within(appHeader).getByTestId('collapsible-sidebar');
    expect(collaspsibleSidebar).toBeInTheDocument();
  });

  it('Should initially not show the Sidebar', () => {
    render(<App />);
    expect(screen.queryByTestId('collapsible-sidebar')).not.toBeVisible();
  });
});
