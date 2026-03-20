const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export class ApiError extends Error {
  status: number
  details?: any
  constructor(message: string, status: number, details?: any) {
    super(message)
    this.status = status
    this.details = details
  }
}

export async function apiFetch<T = any>(path: string, init?: RequestInit): Promise<T> {
  const url = path.startsWith('http') ? path : `${API_BASE}${path.startsWith('/') ? path : `/${path}`}`
  const isForm = init && init.body instanceof FormData
  const headers: Record<string, string> = init && (init.headers as Record<string, string>) ? { ...(init!.headers as Record<string, string>) } : {}
  if (!isForm && !headers['Content-Type']) {
    headers['Content-Type'] = 'application/json'
  }

  const res = await fetch(url, { ...init, headers })

  // No content / Not modified — treat as successful empty response
  if (res.status === 204 || res.status === 304) {
    return null as any
  }

  const text = await res.text()
  let data: any = null
  try {
    data = text ? JSON.parse(text) : null
  } catch {
    data = text
  }

  if (!res.ok) {
    throw new ApiError(data?.message || res.statusText, res.status, data)
  }

  return data
}

export const apiGet = <T = any>(path: string) => apiFetch<T>(path, { method: 'GET' })
export const apiPost = <T = any>(path: string, body?: any) =>
  apiFetch<T>(path, { method: 'POST', body: body !== undefined ? JSON.stringify(body) : undefined })
export const apiDelete = <T = any>(path: string) => apiFetch<T>(path, { method: 'DELETE' })

export default apiFetch
