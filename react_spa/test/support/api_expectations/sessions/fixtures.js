export function session() {
  return {
    expires_at: new Date(2040, 20).toISOString(),
    user: { id: 1 }
  };
}
