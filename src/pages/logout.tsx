import React, { useEffect } from 'react'
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

 const Logout=()=> {
    const route = useRouter()
    useEffect(() => {
        Cookies.remove('token');
         route.push('/login')
    },[])

  return (
   <div className='flex justify-center '>
    Loading...
   </div>
  )
}

export default Logout;