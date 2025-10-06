export function Debounce(fn: (...args: any) => void, wait = 600) {
  let timer: any;

  return function (this: any, ...args: any) {
    if (timer) {
      clearTimeout(timer); // clear any pre-existing timer
    }
    const context = this; // get the current context
    timer = setTimeout(() => {
      fn.apply(context, args); // call the function if time expires
    }, wait);
  };
}
