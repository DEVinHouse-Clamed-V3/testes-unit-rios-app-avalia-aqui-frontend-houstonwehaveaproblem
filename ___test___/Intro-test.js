import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import HomeScreen from './HomeScreen';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('HomeScreen', () => {
  it('should render the title, description, and button correctly', () => {
    const { getByText } = render(<HomeScreen />);
    expect(getByText('Avalie Aqui')).toBeTruthy();
    expect(getByText('Escolha o produto que deseja avaliar e compartilhe sua experiência com outros consumidores.')).toBeTruthy();
    expect(getByText('Entrar')).toBeTruthy();
  });

  it('should render all images', () => {
    const { getAllByRole } = render(<HomeScreen />);
    const images = getAllByRole('image');
    expect(images.length).toBe(3);
  });

  it('should navigate to List screen on button press', () => {
    const mockNavigate = jest.fn();
    const { getByText } = render(<HomeScreen navigation={{ navigate: mockNavigate }} />);
    const button = getByText('Entrar');
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledWith('List');
  });
});
