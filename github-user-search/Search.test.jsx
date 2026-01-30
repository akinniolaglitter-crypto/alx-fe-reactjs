import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Search from './Search';
import { fetchUserData } from '../services/githubService';

jest.mock('../services/githubService');

describe('Search Component', () => {
  test('displays error message when user not found', async () => {
    fetchUserData.mockRejectedValue(new Error('Looks like we cant find the user "nonexistentuser"'));

    render(<Search />);
    
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');
    
    fireEvent.change(input, { target: { value: 'nonexistentuser' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(screen.getByTestId('not-found-message')).toHaveTextContent(
        'Looks like we cant find the user "nonexistentuser"'
      );
    });
  });

  test('displays loading state', async () => {
    fetchUserData.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
    
    render(<Search />);
    
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');
    
    fireEvent.change(input, { target: { value: 'octocat' } });
    fireEvent.click(button);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('calls API with correct endpoint', async () => {
    const mockUserData = {
      login: 'octocat',
      name: 'The Octocat',
      avatar_url: 'https://avatar.com/octocat',
      bio: 'A mysterious cat'
    };
    
    fetchUserData.mockResolvedValue(mockUserData);
    
    render(<Search />);
    
    const input = screen.getByTestId('search-input');
    const button = screen.getByTestId('search-button');
    
    fireEvent.change(input, { target: { value: 'octocat' } });
    fireEvent.click(button);
    
    await waitFor(() => {
      expect(fetchUserData).toHaveBeenCalledWith('octocat');
      expect(screen.getByTestId('user-name')).toHaveTextContent('The Octocat');
      expect(screen.getByTestId('user-login')).toHaveTextContent('@octocat');
    });
  });
});