import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
import AvaliationScreen from './AvaliationScreen';
import { useNavigation, useRoute } from '@react-navigation/native';

jest.mock('@react-navigation/native', () => ({
  useNavigation: () => ({ goBack: jest.fn() }),
  useRoute: () => ({ params: { productId: 1 } }),
}));

describe('AvaliationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render all input fields and buttons', () => {
    const { getByPlaceholderText, getByText } = render(<AvaliationScreen />);
    expect(getByPlaceholderText('Seu nome')).toBeTruthy();
    expect(getByPlaceholderText('Seu e-mail')).toBeTruthy();
    expect(getByPlaceholderText('Descreva sua experiência...')).toBeTruthy();
    expect(getByText('Enviar Feedback')).toBeTruthy();
  });

  it('should validate required fields', async () => {
    const { getByText, getByPlaceholderText } = render(<AvaliationScreen />);
    const submitButton = getByText('Enviar Feedback');

    await act(async () => fireEvent.press(submitButton));

    expect(getByText('Erro')).toBeTruthy();
  });

  it('should submit the form with valid data', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: true });
    const { getByText, getByPlaceholderText } = render(<AvaliationScreen />);

    fireEvent.changeText(getByPlaceholderText('Seu nome'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Seu e-mail'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Descreva sua experiência...'), 'Foi ótimo!');
    fireEvent.press(getByText('Feliz'));
    fireEvent.press(getByText('Enviar Feedback'));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledWith(
      'http://192.168.3.5:3000/reviews',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: 1,
          name: 'John Doe',
          email: 'john@example.com',
          feedback: 'Foi ótimo!',
          experience: 'Feliz',
          recommend: false,
        }),
      })
    ));
  });

  it('should show error alert on failed submission', async () => {
    global.fetch = jest.fn().mockResolvedValue({ ok: false, json: async () => ({ message: 'Erro ao enviar feedback' }) });
    const { getByText, getByPlaceholderText } = render(<AvaliationScreen />);

    fireEvent.changeText(getByPlaceholderText('Seu nome'), 'John Doe');
    fireEvent.changeText(getByPlaceholderText('Seu e-mail'), 'john@example.com');
    fireEvent.changeText(getByPlaceholderText('Descreva sua experiência...'), 'Foi ótimo!');
    fireEvent.press(getByText('Feliz'));
    fireEvent.press(getByText('Enviar Feedback'));

    await waitFor(() => expect(getByText('Erro ao enviar feedback')).toBeTruthy());
  });
});
