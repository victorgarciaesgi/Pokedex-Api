export function timeout(duration) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {resolve()}, duration);
  })
};