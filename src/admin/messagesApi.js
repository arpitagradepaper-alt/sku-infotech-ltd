
export const CHANGED = 'sku-messages-changed'
const BASE = '/api/admin/messages'

async function request(url, options) {
  const res = await fetch(url, options)
  if (!res.ok) throw new Error('Request failed')
  return res.json()
}

export const getMessages = () => request(BASE)

export async function setMessageRead(id, isRead) {
  await request(`${BASE}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ read: isRead }),
  })
  window.dispatchEvent(new Event(CHANGED))
}

export async function deleteMessage(id) {
  await request(`${BASE}/${id}`, { method: 'DELETE' })
  window.dispatchEvent(new Event(CHANGED))
}