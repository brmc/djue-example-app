export function areEqual (local, master, fields) {
  fields = fields || Object.getOwnPropertyNames(local)
  for (const field of fields) {
    if (local[field].value !== master[field].value) {
      return false
    }
  }

  return true
}