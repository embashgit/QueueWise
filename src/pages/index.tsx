import React from 'react'
import Dashboard from '@/components/Dashboard'
import AuthLayout from '@/components/Layout/AuthLayout'

function Index() {
  return (
    <AuthLayout>
      <Dashboard/>
    </AuthLayout>
  )
}

export default Index