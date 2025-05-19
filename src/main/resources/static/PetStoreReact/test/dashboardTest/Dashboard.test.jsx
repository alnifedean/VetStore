import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import Dashboard from '../../src/dashboard/Dashboard';
import { BrowserRouter } from 'react-router-dom';
import { act } from "@testing-library/react";

beforeEach(() => {
  localStorage.setItem('user', JSON.stringify({ id: 1 }));
  localStorage.setItem('token', 'fake-token');
  global.fetch = jest.fn();
});

afterEach(() => {
  jest.resetAllMocks();
  localStorage.clear();
});

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

test('show "Loading..." at the begining', async () => {
  await act(async () => {
    renderWithRouter(<Dashboard />);
  });

  expect(screen.getByText(/loading/i)).toBeInTheDocument();
});

test('redirect to login if no token or userId', async () => {
  localStorage.removeItem('token');
  const mockNavigate = jest.fn();
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
  }));

  await act(async () => {
    renderWithRouter(<Dashboard />);
  });

  expect(mockNavigate).toHaveBeenCalledWith('/login');
});

test("show 'NO PETS' if backend responded 204", async () => {
  fetch.mockResolvedValueOnce({
    status: 204,
    ok: true,
    json: async () => ({ pets: [] })
  });


  await act(async () => {
    renderWithRouter(<Dashboard />);
  });

  await waitFor(() => {
    expect(screen.getByText(/no pets/i)).toBeInTheDocument();
  });
});

test("show pet list if date available", async () => {
  fetch.mockResolvedValueOnce({
    status: 200,
    ok: true,
    json: async () => ({ pets: [{ id: 1, name: "Firulais", breed: "Labrador", ageYears: 3 }] })
  });


  await act(async () => {
    renderWithRouter(<Dashboard />);
  });

  expect(await screen.findByText(/Firulais/i)).toBeInTheDocument();
});

test('open the modal on click to "+"', async () => {
  fetch.mockResolvedValueOnce({
    status: 200,
    ok: true,
    json: async () => ({ pets: [] }),
  });

  await act(async () => {
    renderWithRouter(<Dashboard />);
  });

  const addButton = await screen.findByText('+');
  fireEvent.click(addButton);

  expect(screen.getByText(/modal/i)).toBeInTheDocument();
});

test('on click to the edit icon to open the modal to edit', async () => {
  fetch.mockResolvedValueOnce({
    status: 200,
    ok: true,
    json: async () => ({ pets: [{ id: 1, name: 'Bobby', breed: 'Pug', ageYears: 2 }] }),
  });

  await act(async () => {
    renderWithRouter(<Dashboard />);
  });

  const editButton = await screen.findByAltText('Delete');
  fireEvent.click(editButton);

  expect(screen.getByText(/modal/i)).toBeInTheDocument();
});