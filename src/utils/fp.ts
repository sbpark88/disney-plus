type AnyFunction = (value: any) => any;

export const compose =
  (...fns: AnyFunction[]) =>
  <T>(initValue?: T) =>
    fns.reduceRight((acc, fn) => (acc instanceof Promise ? acc.then(fn) : fn(acc)), initValue);

export const pipe =
  (...fns: AnyFunction[]) =>
  <T>(initValue?: T) =>
    fns.reduce((acc, fn) => (acc instanceof Promise ? acc.then(fn) : fn(acc)), initValue);

const curry = (fn: Function) => {
  return function curryFn<T>(...args1: T[]) {
    if (args1.length >= fn.length) {
      return fn(...args1);
    } else {
      return (...args2: T[]) => {
        return curryFn(...args1, ...args2);
      };
    }
  };
};
