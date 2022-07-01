import { appStore } from './app-store';
import { coreMarbles } from '../core/marbles';
import { map } from 'rxjs/operators';

test('Should have listing', coreMarbles((m) => {
  const store = appStore();
  const keys$ = store.state$.pipe(map((state) =>
    Object.keys(state).filter((key) => key === 'listing')))
  m.expect(keys$).toBeObservable('s', { s: ['listing'] })
}));

