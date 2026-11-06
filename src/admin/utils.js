export const fmt = (iso) =>
  new Date(iso).toLocaleString('en-GB', {
    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
  })

export const isToday = (iso) => new Date(iso).toDateString() === new Date().toDateString()

export const isThisWeek = (iso) => Date.now() - new Date(iso).getTime() < 7 * 24 * 60 * 60 * 1000
