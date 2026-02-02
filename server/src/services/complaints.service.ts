export async function updateStatus(
  id: number,
  status: string
) {
  // aquí va ORM / SQL
  return {
    id,
    status,
  };
}
