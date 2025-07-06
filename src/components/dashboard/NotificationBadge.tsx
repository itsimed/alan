import React from 'react'
const NotificationBadge = ({ count }: { count: number }) => <div className="inline-block bg-red-500 text-white rounded-full px-2 py-1 text-xs">{count}</div>
export default NotificationBadge 