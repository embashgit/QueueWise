import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import CreateQueue from '@/components/Queue/CreateQueue';
import { useAuth } from '@/components/Provider/AuthContext';
import '@testing-library/jest-dom';

// Mock dependencies
jest.mock('src/components/Provider/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('../Modal', () => ({ isOpen, children }: any) => isOpen ? <div data-testid="modal">{children}</div> : null);
jest.mock('src/components/Form/Input', () => ({ label, handleChange, ...props }: any) => (
  <input
    data-testid={label}
    onChange={(e) => handleChange(e)}
    {...props}
  />
));
jest.mock('../Buttons', () => ({
  Button: ({ children, ...props }: any) => <button {...props}>{children}</button>,
}));
jest.mock('src/components/Icon', () => ({ name }: any) => <span>{name}</span>);

describe('CreateQueue Component', () => {
  const mockCreateQueue = jest.fn();
  const setup = (role = 'admin') => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role },
      createQueue: mockCreateQueue,
    });

    render(<CreateQueue />);
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the CreateQueue component and opens modal on button click', () => {
    setup();
    const openModalButton = screen.getByRole('button', { name: /plus/i });
    fireEvent.click(openModalButton);

    expect(screen.getByTestId('modal')).toBeInTheDocument();
    expect(screen.getByText(/Create New Queue/i)).toBeInTheDocument();
  });

  it('submits form data when fields are filled', async () => {
    setup();
    fireEvent.click(screen.getByRole('button', { name: /plus/i }));

    fireEvent.change(screen.getByTestId('Event Type'), { target: { value: 'Event A' } });
    fireEvent.change(screen.getByTestId('Queue Length'), { target: { value: '10' } });
    fireEvent.change(screen.getByTestId('Description'), { target: { value: 'Test Description' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Queue/i }));

    await waitFor(() => {
      expect(mockCreateQueue).toHaveBeenCalledWith({
        eventType: 'Event A',
        description: 'Test Description',
        queueLength: 10,
      });
    });
  });

  it('displays an error message if createQueue fails', async () => {
    mockCreateQueue.mockRejectedValueOnce(new Error('Queue creation failed'));
    setup();
    fireEvent.click(screen.getByRole('button', { name: /plus/i }));

    fireEvent.change(screen.getByTestId('Event Type'), { target: { value: 'Event A' } });
    fireEvent.change(screen.getByTestId('Queue Length'), { target: { value: '10' } });
    fireEvent.change(screen.getByTestId('Description'), { target: { value: 'Test Description' } });

    fireEvent.click(screen.getByRole('button', { name: /Create Queue/i }));

    await waitFor(() => {
      expect(screen.getByText(/Error occur! Queue not created/i)).toBeInTheDocument();
    });
  });

});
