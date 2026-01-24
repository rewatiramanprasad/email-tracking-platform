type Props = {
  label: string
  name: string
  value: string
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>
}

export function Textarea({ label, ...props }: Props) {
  return (
    <div>
      <label className="block mb-2 text-black text-sm font-medium">{label}</label>
      <textarea
        {...props}
        rows={8}
        className="w-full px-4 py-3 border rounded-lg"
      />
    </div>
  )
}
