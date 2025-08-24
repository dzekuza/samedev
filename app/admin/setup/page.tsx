'use client'

import { useState } from 'react'
import { AdminHeader } from '@/components/admin/admin-header'
import { AdminLayout } from '@/components/admin/admin-layout'
import { Button } from '@/components/ui/button'
import { Database, Loader2, CheckCircle, X } from 'lucide-react'

export default function AdminSetupPage() {
  const [isSettingUp, setIsSettingUp] = useState(false)
  const [isResetting, setIsResetting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setupDatabase = async () => {
    try {
      setIsSettingUp(true)
      setError(null)

      const response = await fetch('/api/setup-database', {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to setup database')
      }

      setIsComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsSettingUp(false)
    }
  }

  const resetDatabase = async () => {
    try {
      setIsResetting(true)
      setError(null)

      const response = await fetch('/api/reset-database', {
        method: 'POST'
      })

      if (!response.ok) {
        throw new Error('Failed to reset database')
      }

      setIsComplete(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsResetting(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <AdminHeader 
          title="Database Setup"
          description="Initialize your database with sample data"
        />
        
        <div className="bg-white p-8 rounded-lg shadow">
          <div className="text-center">
            <Database className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Database Setup
            </h3>
            <p className="text-gray-600 mb-6">
              This will create the projects table and seed it with sample data.
            </p>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {isComplete && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                  <p className="text-green-800">Database setup completed successfully!</p>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <Button 
                onClick={setupDatabase} 
                disabled={isSettingUp || isResetting || isComplete}
                className="flex items-center gap-2"
              >
                {isSettingUp ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Setting up database...
                  </>
                ) : (
                  <>
                    <Database className="h-4 w-4" />
                    Setup Database
                  </>
                )}
              </Button>

              <Button 
                onClick={resetDatabase} 
                disabled={isSettingUp || isResetting || isComplete}
                variant="outline"
                className="flex items-center gap-2"
              >
                {isResetting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Resetting database...
                  </>
                ) : (
                  <>
                    <X className="h-4 w-4" />
                    Reset Database
                  </>
                )}
              </Button>
            </div>

            {isComplete && (
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-4">
                  Your database is now ready! You can:
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• <a href="/admin" className="text-blue-600 hover:underline">View the admin dashboard</a></p>
                  <p>• <a href="/admin/projects" className="text-blue-600 hover:underline">Manage projects</a></p>
                  <p>• <a href="/admin/analytics" className="text-blue-600 hover:underline">View analytics</a></p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
