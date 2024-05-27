import React from 'react';
import { render } from '@testing-library/react';
import Navigation from './Navigation';

test('renders navigation links', () => {
    const { getByText } = render(<Navigation />);
    
    expect(getByText(/Home/i)).toBeInTheDocument();
    expect(getByText(/Profile/i)).toBeInTheDocument();
    expect(getByText(/Admin/i)).toBeInTheDocument();
    expect(getByText(/Login/i)).toBeInTheDocument();
    expect(getByText(/Register/i)).toBeInTheDocument();
});