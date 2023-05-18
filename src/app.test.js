import { render, screen } from '@testing-library/react';
import Home from '../pages/index';

test('renders learn react link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Quests/i);
  expect(linkElement).toBeInTheDocument();
});
