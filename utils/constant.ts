export const navItems= [
    {
        name: 'Home',
        url: '/',
        icon: 'dashboard'
    },
    {
        name: 'Queues',
        url: '/queues',
        icon: 'payment'
    },
    {
        name: 'Leave Queue',
        url: '/leave',
        icon: 'plus'
    },
    {
        name: 'Settings',
        url: '/settings',
        icon: 'settings'
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
{
    name: 'Add Queue',
    url: '/add',
    icon: 'plus',
}
]

// src/data/sampleQueues.ts
export const sampleQueues = [
    {
      id: '1',
      name: 'Bank Queue',
      totalPeople: 50,
      waitingPeople: 10,
      waitingTime: '30 mins',
      tintColor: 'blue',
    },
    {
      id: '2',
      name: 'Doctor Appointment',
      totalPeople: 30,
      waitingPeople: 5,
      waitingTime: '15 mins',
      tintColor: '#463E3F',
    },
    {
      id: '3',
      name: 'Restaurant Queue',
      totalPeople: 20,
      waitingPeople: 3,
      waitingTime: '10 mins',
      tintColor: '#02333D',
    },
  ];
  