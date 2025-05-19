import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import ListScreen from './ListScreen';
import { useNavigation } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ navigate: jest.fn() }),
}));

global.fetch = jest.fn();

describe('ListScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render loading indicator initially', () => {
    const { getByText } = render(<ListScreen />);
    expect(getByText('Carregando produtos...')).toBeTruthy();
  });

  it('should render products correctly', async () => {
    global.fetch.mockResolvedValueOnce({
      json: async () => ([
        { id: 1, name: 'Produto 1', brand: 'Marca 1', description: 'Descrição 1', price: 100, image: 'https://example.com/image1.jpg' },
        { id: 2, name: 'Produto 2', brand: 'Marca 2', description: 'Descrição 2', price: 200, image: 'https://example.com/image2.jpg' }
      ])
    }).mockResolvedValueOnce({
      json: async () => ({ id: 1, feedback: 'Ótimo produto' })
    }).mockResolvedValueOnce({
      json: async () => ({})
    });

    const { findByText } = render(<ListScreen />);
    expect(await findByText('Produto 1')).toBeTruthy();
    expect(await findByText('Produto 2')).toBeTruthy();
    expect(await findByText('✅ Já avaliado')).toBeTruthy();
    expect(await findByText('❌ Ainda não avaliado')).toBeTruthy();
  });

  it('should navigate to Avaliation screen on button press', async () => {
    const mockNavigate = useNavigation().navigate;

    global.fetch.mockResolvedValueOnce({
      json: async () => ([
        { id: 1, name: 'Produto 1', brand: 'Marca 1', description: 'Descrição 1', price: 100, image: 'https://example.com/image1.jpg' }
      ])
    }).mockResolvedValueOnce({
      json: async () => ({})
    });

    const { findByText } = render(<ListScreen />);
    const button = await findByText('Avaliar');
    fireEvent.press(button);
    expect(mockNavigate).toHaveBeenCalledWith('Avaliation', { productId: 1 });
  });

  it('should handle fetch errors gracefully', async () => {
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    const { findByText } = render(<ListScreen />);
    expect(await findByText('Carregando produtos...')).toBeTruthy();
  });
});
