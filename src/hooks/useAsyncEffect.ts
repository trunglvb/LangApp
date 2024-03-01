import {DependencyList, useEffect} from 'react';

declare const UNDEFINED_VOID_ONLY: unique symbol;
type Destructor = () => void | {[UNDEFINED_VOID_ONLY]: never};

export default function useAsyncEffect(
  effect: () => Promise<void | Destructor>,
  deps?: DependencyList,
) {
  useEffect(() => {
    let destructor: void | Destructor;
    effect()
      .then(res => {
        destructor = res;
      })
      .catch(e => {
        console.error(e);
      });

    return () => {
      if (destructor) {
        destructor();
      }
    };
  }, [deps]);
}
