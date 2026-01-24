
import { getEmails } from './emails'
import { getTotalEvents } from './totalEvents'
import { getClickEvents } from './clickEvent'
import { getTrackedPixels } from './trackPixel'
import { getNotTracked } from './notTracked'
import Dashboard from '@/components/Dashboard'

export const dynamic = 'force-dynamic'

export default async function EmailsPage() {
  const emails = (await getEmails()) || []
  const totalEvents = (await getTotalEvents()) || 0
  const clickEvents = (await getClickEvents()) || 0
    const trackedPixels = (await getTrackedPixels()) || 0
    const notTracked = (await getNotTracked()) || 0
    console.log('emails',emails)
    console.log('totalEvents', totalEvents)
    console.log('trackedPixels', trackedPixels)
    console.log('clickEvents', clickEvents)
    console.log('notTracked', notTracked)
  return (
    <div>
      <Dashboard emails={emails} totalEvents={totalEvents} clickEvents={clickEvents} trackedPixels={trackedPixels} notTracked={notTracked} />
    
    </div>
  )
}
