'use client'
import React, { useState } from 'react'
import { Search, Filter, Download, TrendingUp, Globe } from 'lucide-react'
import { timeAgo } from '@/lib/timeAge'


export interface EmailTracking {
  id: string
  subject: string
  open_count: number
  opened_at: Date | null
  event_types: string
  ip: string
  user_agent: string
  to_email:string
}
export default function Dashboard({
  emails,
  totalEvents,
  clickEvents,
  trackedPixels,
  notTracked,
}: {
  emails: EmailTracking[]
  totalEvents: number
  clickEvents: number
  trackedPixels: number
  notTracked: number
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [eventFilter, setEventFilter] = useState<'all' | 'open' | 'click'>(
    'all',
  )


  const stats = [
    {
      label: 'Total Events Today',
      value: totalEvents,
      change: '+12%',
      comparison: 'vs yesterday',
      trend: 'up',
    },
    {
      label: 'Tracked Pixels',
      value: trackedPixels,
      change: '+5%',
      comparison: 'vs yesterday',
      trend: 'up',
    },
    {
      label: 'Click Rate',
      value: clickEvents,
      change: 'Stable',
      comparison: '',
      trend: 'stable',
    },
    {
      label: 'Not Tracked',
      value: notTracked,
      change: 'Global reach',
      comparison: '',
      trend: 'globe',
    },
  ]
const filteredEmails = emails.filter((email) => {
  const query = searchQuery.toLowerCase()

  const matchesSearch =
    email.subject.toLowerCase().includes(query) ||
    email.to_email.toLowerCase().includes(query) ||
    email.ip.toLowerCase().includes(query) ||
    email.event_types.toLowerCase().includes(query)

  const matchesEvent =
    eventFilter === 'all'
      ? true
      : email.event_types.toLowerCase().includes(eventFilter)

  return matchesSearch && matchesEvent
})


  // const trackingEvents = [
  //   {
  //     subject: 'Welcome to Pro Plan',
  //     eventType: 'Link Clicked',
  //     eventColor: 'text-green-600',
  //     platform: 'Chrome / Windows 10',
  //     location: 'San Francisco, US',
  //     ip: '122.168.43.21',
  //     recipient: 'alex.j@example.com',
  //     avatar: 'AJ',
  //     time: '2 mins ago',
  //   },
  //   {
  //     subject: 'Q3 Report Summary',
  //     eventType: 'Pixel Open',
  //     eventColor: 'text-blue-600',
  //     platform: 'Apple Mail / iOS 18',
  //     location: 'London, UK',
  //     ip: '89.21.111.55',
  //     recipient: 'sarah.lee@design.co',
  //     avatar: 'SL',
  //     time: '14 mins ago',
  //   },
  //   {
  //     subject: 'Your Invoice #2823',
  //     eventType: 'Pixel Open',
  //     eventColor: 'text-blue-600',
  //     platform: 'Outlook / Windows 11',
  //     location: 'Berlin, DE',
  //     ip: '185.22.18.99',
  //     recipient: 'hans.m@tech.de',
  //     avatar: 'HM',
  //     time: '32 mins ago',
  //   },
  //   {
  //     subject: 'Reset Password',
  //     eventType: 'Link Clicked',
  //     eventColor: 'text-green-600',
  //     platform: 'Chrome / Android 13',
  //     location: 'Toronto, CA',
  //     ip: '142.112.90.3',
  //     recipient: 'maria.g@edu.org',
  //     avatar: 'MG',
  //     time: '1 hour ago',
  //   },
  //   {
  //     subject: 'Project Update: Alpha',
  //     eventType: 'Pixel Open',
  //     eventColor: 'text-blue-600',
  //     platform: 'Safari / MacOS',
  //     location: 'Sydney, AU',
  //     ip: '203.48.11.8',
  //     recipient: 'raj.p@global.com',
  //     avatar: 'RP',
  //     time: '2 hours ago',
  //   },
  // ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Stats Cards */}
        <div className="grid grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
            >
              <div className="text-sm text-gray-500 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Tracking Events */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              Recent Tracking Events
            </h2>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search subject or IP..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>
              <select
                value={eventFilter}
                onChange={(e) =>
                  setEventFilter(e.target.value as 'all' | 'open' | 'click')
                }
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Events</option>
                <option value="open">Open</option>
                <option value="click">Click</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Email Subject
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Event Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Platform / Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Open count
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Recipient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredEmails.map((track) => (
                  <tr
                    key={track.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {track.subject}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full${track.event_types === null ? ' bg-red-600' : ' bg-green-600'}`}
                        ></div>
                        <span className={`text-sm font-medium `}>
                          {track.event_types}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {track.user_agent
                          ? `${track.user_agent.slice(0, 20)}...`
                          : '—'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{track.open_count}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        {/* <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-semibold">
                          {event.avatar}
                        </div> */}
                        <span className="text-sm text-gray-900">
                          {track.to_email}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {timeAgo(track.opened_at)}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
