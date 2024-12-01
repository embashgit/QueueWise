import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useAuth } from '@/components/Provider/AuthContext';
import '@testing-library/jest-dom';
import QueueCard from './QueueCard';

// Mock dependencies
jest.mock('src/components/Provider/AuthContext', () => ({
  useAuth: jest.fn(),
}));
jest.mock('next/router', () => ({
  useRouter: jest.fn(() => ({ push: jest.fn() })),
}));

describe('QueueCard Component', () => {
  const mockOnJoin = jest.fn();
  const mockOnLeave = jest.fn();
  const mockOnDeleteQueue = jest.fn();

  const defaultQueue = {
    id: '1',
    eventType: 'Test Event',
    queueLength: 20,
    userCount: 10,
    estimatedWaitTime: 5,
    description: 'This is a test queue',
    createdAt:'10.10.2014',
    updatedAt:'10.10.2014'
  };

  const setup = (role = 'user', isJoined = false) => {
    (useAuth as jest.Mock).mockReturnValue({
      user: { role },
    });

    render(
      <QueueCard
        queue={defaultQueue}
        isJoined={isJoined}
        onJoin={mockOnJoin}
        onLeave={mockOnLeave}
        onDeleteQueue={mockOnDeleteQueue}
        tintColor="#4CAF50"
      />
    );
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders queue details correctly', () => {
    setup();

    expect(screen.getByText(/Test Event/i)).toBeInTheDocument();
    expect(screen.getByText(/Total people allowed: 20/i)).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText(/Estimated wait time: 50 min/i)).toBeInTheDocument();
    expect(screen.getByText(/This is a test queue/i)).toBeInTheDocument();
  });

  it('renders "Join Queue" button for non-admin users who are not joined', () => {
    setup('user', false);

    const joinButton = screen.getByRole('button', { name: /Join Queue/i });
    expect(joinButton).toBeInTheDocument();

    fireEvent.click(joinButton);
    expect(mockOnJoin).toHaveBeenCalledWith('1');
  });

  it('renders "Leave Queue" button for non-admin users who are joined', () => {
    setup('user', true);

    const leaveButton = screen.getByRole('button', { name: /Leave Queue/i });
    expect(leaveButton).toBeInTheDocument();

    fireEvent.click(leaveButton);
    expect(mockOnLeave).toHaveBeenCalledWith('1');
  });

  it('renders "Delete" icon for admin users and triggers onDeleteQueue when clicked', () => {
    setup('admin');

    const deleteIcon = screen.getByLabelText('Delete');
    expect(deleteIcon).toBeInTheDocument();

    fireEvent.click(deleteIcon);
    expect(mockOnDeleteQueue).toHaveBeenCalledWith('1');
  });



  it('does not render join/leave buttons or delete icon for non-admin users who are not joined', () => {
    setup('user', false);

    expect(screen.queryByRole('button', { name: /Leave Queue/i })).not.toBeInTheDocument();
    expect(screen.queryByLabelText('Delete')).not.toBeInTheDocument();
  });
});
