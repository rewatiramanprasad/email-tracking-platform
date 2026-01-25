'use client'

import { LoaderCircle, ReplaceIcon, Send } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'

import { sendEmail } from '../app/sendEmail'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export const emailFormSchema = z.object({
  to: z.email('Invalid recipient email'),
  subject: z.string().min(1, 'Subject is required'),
  body: z.string().min(1, 'Message is required'),
})

export type EmailFormValues = z.infer<typeof emailFormSchema>

export default function EmailForm() {
  const router=useRouter()
  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      to: '',
      subject: '',
      body: '',
    },
  })

  const onSubmit = async (values: EmailFormValues) => {
    try {
      await sendEmail(values)
      toast.success('Email sent', {
        description: 'Your email was delivered successfully.',
      })
      form.reset()
      router.push('/dashboard')
    } catch (error) {
      toast.error('Failed to send email', {
        description: 'Please check your email settings and try again.',
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onReset={() => form.reset()}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-6"
      >
        <Card className="w-full max-w-3xl">
          <CardHeader>
            <CardTitle className="text-3xl">Compose Email</CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Subject</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="body"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message</FormLabel>
                  <FormControl>
                    <Textarea className="h-50" rows={10} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className=" flex flex-row gap-5">
              <Button type="submit" className="w-1/2">
                <Send className="mr-2 h-4 w-4" />
                Send Email
              </Button>
              <Button type="reset" className="w-1/2">
                <LoaderCircle className="mr-2 h-4 w-4" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
