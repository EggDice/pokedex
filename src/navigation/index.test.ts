import { createNavigation } from './';

test('get default navigation', () => {
  const navigation = createNavigation();
  expect(navigation.getRoute()).toEqual({ name: 'listing' });
});

