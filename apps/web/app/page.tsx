'use client'

import { useState, useTransition } from 'react'
import { Send, RotateCcw } from 'lucide-react'
import { sendEmail } from './sendEmail'
import { Input } from '../components/Input'
import { Textarea } from '../components/Textarea'

type FormData = {
  to: string
  from: string
  subject: string
  body: string
}

export default function EmailForm() {
  const [formData, setFormData] = useState<FormData>({
    to: '',
    from: '',
    subject: '',
    body: '',
  })

  const [isPending, startTransition] = useTransition()

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleReset = () => {
    setFormData({
      to: '',
      from: '',
      subject: '',
      body: '',
    })
  }

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault()

    startTransition(async () => {
      try {
        await sendEmail(formData)
        alert('Email sent successfully')
        handleReset()
      } catch (err) {
        console.error(err)
        alert('Failed to send email')
      }
    })
  }

  return (
    <form
      onSubmit={handleSend}
      className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center p-6"
    >
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl p-8">
        <h2 className="text-3xl  text-black font-bold mb-6">Compose Email</h2>

        <div className="space-y-6">
          <Input
            label="To"
            name="to"
            value={formData.to}
            onChange={handleChange}
          />
          <Input
            label="From"
            name="from"
            value={formData.from}
            onChange={handleChange}
          />
          <Input
            label="Subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
          />
          <Textarea
            label="Message"
            name="body"
            value={formData.body}
            onChange={handleChange}
          />

          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-black bg-gray-100 rounded-lg"
            >
              <RotateCcw className="w-5 h-5" />
              Reset
            </button>

            <button
              type="submit"
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 text-white bg-blue-600 rounded-lg"
            >
              <Send className="w-5 h-5" />
              {isPending ? 'Sending...' : 'Send Email'}
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}
