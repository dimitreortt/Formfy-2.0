import React from 'react';
import { render, screen } from '@testing-library/react';
import { Sidebar } from '../views/components/Sidebar';

describe('Sidebar', () => {
  it('Should render a button to toggle the sidebar open or closed', async () => {
    const { getByTestId } = render(<Sidebar />);
    const sidebarTogglerButton = getByTestId('toggle-drawer');
    expect(sidebarTogglerButton).toBeInTheDocument();
  });
});
