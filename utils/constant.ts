export const navItems= [
    {
        name: 'Queues',
        url: '/',
        icon: 'dashboard'
    },
    {
        name: 'Logout',
        url: '/signup',
        icon: 'logout'
    },
]

export const HeaderActions = [
{
    name: 'Notification',
    url: '/notifications',
    icon: 'bell',
},
]
  

import { format } from 'date-fns';


// Sample Queue History Data
const queueHistory = [
    {
      name: 'Chris Cooper',
      email: 'chriscooper@gmail.com',
      joinTime: format(new Date('2024-09-24T09:00:00Z'), 'dd MMM yyyy, h:mm a'),
      leaveTime: format(new Date('2024-09-24T09:30:00Z'), 'dd MMM yyyy, h:mm a'),
    },
    {
      name: 'Ramat Sa’ad',
      email: 'ramatsaad@gmail.com',
      joinTime: format(new Date('2024-09-24T09:45:00Z'), 'dd MMM yyyy, h:mm a'),
      leaveTime: format(new Date('2024-09-24T10:15:00Z'), 'dd MMM yyyy, h:mm a'),
    },
    {
      name: 'Afolabi Micheal',
      email: 'afolabimicheal@gmail.com',
      joinTime: format(new Date('2024-09-24T10:20:00Z'), 'dd MMM yyyy, h:mm a'),
      leaveTime: format(new Date('2024-09-24T10:50:00Z'), 'dd MMM yyyy, h:mm a'),
    },
    {
      name: 'Anthony Rita',
      email: 'anthonyrita@gmail.com',
      joinTime: format(new Date('2024-09-24T11:00:00Z'), 'dd MMM yyyy, h:mm a'),
      leaveTime: format(new Date('2024-09-24T11:30:00Z'), 'dd MMM yyyy, h:mm a'),
    },
    {
      name: 'Makinde Opeyemi',
      email: 'makindeopeyemi@gmail.com',
      joinTime: format(new Date('2024-09-24T11:45:00Z'), 'dd MMM yyyy, h:mm a'),
      leaveTime: format(new Date('2024-09-24T12:15:00Z'), 'dd MMM yyyy, h:mm a'),
    },
    {
      name: 'Mia Cooper',
      email: 'miacooper@gmail.com',
      joinTime: format(new Date('2024-09-24T12:30:00Z'), 'dd MMM yyyy, h:mm a'),
      leaveTime: format(new Date('2024-09-24T13:00:00Z'), 'dd MMM yyyy, h:mm a'),
    },
  ];

export default queueHistory;
