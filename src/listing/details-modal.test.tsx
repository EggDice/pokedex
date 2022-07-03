import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { DetailsDialog } from './details-modal';

test('opens on isModalOpen', () => {
  render(
    <DetailsDialog
      isModalOpen={true}
      isDetailsLoaded={true}
      details={undefined}
      onClose={() => {}}
    />
  );
  const dialog = screen.getByRole('dialog');
  expect(dialog).toBeVisible();
});

test('closes on isModalOpen', () => {
  render(
    <DetailsDialog
      isModalOpen={false}
      isDetailsLoaded={true}
      details={undefined}
      onClose={() => {}}
    />
  );
  const dialog = screen.getByRole('dialog', { hidden: true });
  expect(dialog).not.toBeVisible();
});

test('show loader till the details are not loaded', () => {
  render(
    <DetailsDialog
      isModalOpen={true}
      isDetailsLoaded={false}
      details={undefined}
      onClose={() => {}}
    />
  );
  const loader = screen.getByText('Loading');
  expect(loader).toBeVisible();
});

test('don\'t show loader if the details are loaded', () => {
  render(
    <DetailsDialog
      isModalOpen={true}
      isDetailsLoaded={true}
      details={undefined}
      onClose={() => {}}
    />
  );
  const loader = screen.queryByText('Loading');
  expect(loader).not.toBeInTheDocument();
});

test('show details', () => {
  const pokemon = {
    name: 'bulbasaur',
    types: ['grass', 'water'],
    stats: [{
      name: 'attack',
      value: 65,
    }],
  }
  render(
    <DetailsDialog
      isModalOpen={true}
      isDetailsLoaded={true}
      details={pokemon}
      onClose={() => {}}
    />
  )
  const name = screen.getByText('bulbasaur');
  expect(name).toBeInTheDocument();
  const type1 = screen.getByText(/grass/);
  expect(type1).toBeInTheDocument();
  const type2 = screen.getByText(/water/);
  expect(type2).toBeInTheDocument();
  const stat = screen.getByText('attack');
  expect(stat).toBeInTheDocument();
  const statValue = screen.getByText('65');
  expect(statValue).toBeInTheDocument();
});

test('calls close callback on close clicked', () => {
  let called;
  render(
    <DetailsDialog
      isModalOpen={true}
      isDetailsLoaded={true}
      details={undefined}
      onClose={() => { called = true }}
    />
  );
  const close = screen.getByText('close');
  fireEvent.click(close);
  expect(called).toBe(true);
});

