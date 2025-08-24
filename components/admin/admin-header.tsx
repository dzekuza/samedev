interface AdminHeaderProps {
  title: string
  description?: string
  children?: React.ReactNode
}

export function AdminHeader({ title, description, children }: AdminHeaderProps) {
  return (
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        {description && (
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        )}
      </div>
      {children && (
        <div className="flex items-center space-x-3">
          {children}
        </div>
      )}
    </div>
  )
}
