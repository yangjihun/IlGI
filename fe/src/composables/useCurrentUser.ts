const STORAGE_KEY = 'ilgi-user'

export type CurrentUser = {
  id: string
  name: string
  roomId: string
}

export function getCurrentUser(): CurrentUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw) as Partial<CurrentUser>
    if (!parsed.id || !parsed.name || !parsed.roomId) return null
    return parsed as CurrentUser
  } catch {
    return null
  }
}

export function setCurrentUser(user: CurrentUser): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

export function clearCurrentUser(): void {
  localStorage.removeItem(STORAGE_KEY)
}
