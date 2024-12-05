# **QueueWise**

QueueWise is a modern queue management application designed to simplify and optimize queue management processes. It empowers businesses to deliver better customer experiences by streamlining queue operations, providing real-time updates, and enabling virtual queue capabilities.

## **Features**
- **Real-time Updates**: Keep users informed about their queue status instantly using WebSockets, reducing wait anxiety.  
- **Customizable Queues**: Configure queues with specific parameters like duration, capacity, and priority levels to suit your needs.  
- **Queue Activities**: Gain insights with activity feeds that track attendee status (waiting, attended, or left) and highlight peak hours.  
- **Virtual Queue**: Allow users to join queues remotely, minimizing physical wait times.  
- **Mobile Check-in**: Enable mobile browser check-ins for a more flexible, user-friendly experience.  
- **Multi-platform Support**: Use QueueWise on desktops, tablets, or mobile devices seamlessly.  
- **Queue Segmentation**: Efficiently manage queues by segmenting based on service type, customer category, or urgency level.  

## **Technologies Used**
QueueWise leverages the following technologies to deliver a robust and scalable solution:  
- **Next.js**: For server-side rendering and optimized web performance.  
- **TypeScript**: Ensuring type safety and maintainability of the codebase.  
- **WebSockets**: For real-time updates to queue statuses.  
- **PostgreSQL**: A reliable and scalable relational database for storing queue data.  
- **Responsive Design**: Ensures the application works seamlessly across devices.  

---

## **Installation**

Follow these steps to set up the repository locally:

1. **Clone the Repository**  
   ```
   git clone https://github.com/embashgit/QueueWise.git
   cd QueueWise
   ```
2. **Install Dependencies**
Make sure you have Node.js and npm/yarn installed. Run:
  ```
  npm install
  # or
  yarn install
  ```
3. **Setup environment**
Create a .env file in the root directory and provide the following variables:
  ```
  NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api/v1
  ```
4. **Start the Development Server**
```
npm run dev
# or
yarn dev
```
### Acknowledgments

 **Special thanks to:**
- [Myself](https://github.com/embashgit): Primary contributor and developer of QueueWise.
- [Holger Klus]: For invaluable guidance, mentorship, and constructive feedback during the development process and Software engineering course in general.