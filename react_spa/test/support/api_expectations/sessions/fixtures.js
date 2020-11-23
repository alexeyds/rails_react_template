export function sessionCreated() {
  return { current_session: session(...arguments) };
}

export function sessionDestroyed() {
  return { current_session: null };
}

export function session() {
  return {
    expires_at: new Date(2040, 20).toISOString(),
    user: { id: 1 }
  };
}
