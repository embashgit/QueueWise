import React, { useState } from 'react';
import Modal from '../Modal'; // Ensure this path is correct based on your project structure
import InputField from '@/components/Form/Input'; // Importing InputField component
import { Button } from '../Buttons';
import Icon from '@/components/Icon'; // Import the Icon component
import { useAuth } from '@/Provider/AuthContext';

const CreateQueue: React.FC = () => {
    const {user,createQueue } = useAuth()
  const [eventType, setEventType] = useState('');
  const [description, setDescription] = useState('');
  const [errmorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [queueLength, setQueueLength] = useState<number | ''>('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!eventType || !description || queueLength === '') {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    if(user?.role != 'admin')  setIsModalOpen(false);

try {
    const formData = {
        eventType,
        description,
        queueLength: Number(queueLength),
      };
      await createQueue(formData);
  
  
      setEventType('');
      setDescription('');
      setQueueLength('');
} catch (error) {
    setErrorMessage('Error occur! Queue not created')
    console.log(error)
}finally{
    setIsLoading(false)
}
  
  };

  return (
    <>
     <button
      onClick={() => setIsModalOpen(true)}
        className="flex items-center justify-center rounded-xl h-10 bg-[#e7eef4] text-[#0d151c] gap-2 text-sm font-bold leading-normal px-4"
    >
      <Icon
        name="plus"
        alt="plus"
        className="cursor-pointer"
      />
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-2xl font-semibold mb-4">Create New Queue</h2>
       {errmorMessage && <div   className="text-red-500 text-center mb-4">{errmorMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <InputField
              label="Event Type"
              placeholder="Enter event type"
              type="text"
              value={eventType}
              handleChange={(e) => setEventType(e.target.value)}
              containerClassName="mb-6"
            />
          </div>

          <div className="mb-4">
            <InputField
              label="Queue Length"
              placeholder="Enter queue length"
              type="number"
              value={queueLength}
              handleChange={(e) => setQueueLength(e.target.value || '')}
              containerClassName="mb-6"
              min={1}
            />
          </div>

          <div className="mb-4">
            <InputField
              label="Description"
              placeholder="Enter description"
              type="textarea"
              value={description}
              handleChange={(e) => setDescription(e.target.value)}
              containerClassName="mb-6"
              rows={4} // Added for textarea
            />
          </div>

        

          <div>
            <Button
            loading={isLoading}
              size="fill"
              type="submit"
              disabled={isLoading || !eventType || !description || queueLength === ''}
              className="bg-blue-500 text-white py-3 rounded-full mt-2 hover:bg-blue-700 transition"
            >
              Create Queue
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default CreateQueue;
