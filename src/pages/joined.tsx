import React from 'react'
import AuthLayout from '@/components/Layout/AuthLayout'
import JoinedQueue from '@/components/Queue/JoinedQueue'

function Index() {
  return (
    <AuthLayout>
      <JoinedQueue/>
    </AuthLayout>
  )
}

export default Index