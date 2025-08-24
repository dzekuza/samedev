'use client'

import { AdminHeader } from '@/components/admin/admin-header'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Settings, Cog } from 'lucide-react'

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader 
          title="Settings"
          description="Configure your portfolio and admin preferences"
        />
        
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <Settings className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">Site Settings</h3>
          <p className="text-gray-600 mb-6">
            This feature is coming soon. You'll be able to configure site settings, themes, and preferences.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Cog className="h-4 w-4 mr-2" />
            Settings configuration will be implemented here
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
