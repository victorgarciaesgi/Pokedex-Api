
const tokenID = "access_token"

export function fetch() {
  return localStorage.getItem(tokenID);
}

export function set(token) {
  localStorage.setItem(tokenID, token);
}

export function clear() {
  localStorage.removeItem(tokenID);
}