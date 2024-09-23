import React from 'react'
import AuthLayout from '@/components/Layout/AuthLayout'
import CreateQueue from '@/components/Queue/CreateQueue'

function Index() {
  return (
    <AuthLayout>
      <CreateQueue/>
    </AuthLayout>
  )
}

export default Index