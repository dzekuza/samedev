'use client'

import { AdminHeader } from '@/components/admin/admin-header'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Users, UserPlus } from 'lucide-react'

export default function AdminUsersPage() {
  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader 
          title="User Management"
          description="Manage user accounts and permissions"
        />
        
        <div className="bg-white p-8 rounded-lg shadow text-center">
          <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
          <p className="text-gray-600 mb-6">
            This feature is coming soon. You'll be able to manage user accounts, roles, and permissions.
          </p>
          <div className="flex items-center justify-center text-sm text-gray-500">
            <UserPlus className="h-4 w-4 mr-2" />
            User management functionality will be implemented here
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
