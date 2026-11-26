import { useEffect, useState } from 'react';
import { getMyShelter, ShelterResponse } from '../services/shelter';

type State =
  | { status: 'loading' }
  | { status: 'error' }
  | { status: 'loaded'; shelter: ShelterResponse | null };

const useMyShelter = () => {
  const [state, setState] = useState<State>({ status: 'loading' });

  useEffect(() => {
    let ignore = false;
    getMyShelter()
      .then(shelter => {
        if (!ignore) setState({ status: 'loaded', shelter });
      })
      .catch(() => {
        if (!ignore) setState({ status: 'error' });
      });
    return () => {
      ignore = true;
    };
  }, []);
  return state;
};
export default useMyShelter;
