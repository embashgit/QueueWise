import React, { useState } from 'react';
import InputField from '@/components/Form/Input';
import Header from '@/components/Header';
import { motion } from 'framer-motion';
import { useAuth } from '@/Provider/AuthContext';
import { Button } from '../Buttons';

const Form: React.FC = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Animation variants for staggering children elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      await login(email, password);
      // After successful login, the user is redirected by the AuthContext's login method.
    } catch (err) {
      setError(`${err?.toString().split(':')[1] || 'Failed to login. Please check your email and password.'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Component */}
      <Header type="login" />

      {/* Main Content */}
      
      <div className="flex justify-center flex-grow">

        <motion.div
          className="max-w-lg w-full space-y-8 mt-9 bg-white p-8"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <form onSubmit={handleSubmit}>
            {/* Heading Section */}
            <motion.div className="text-center mb-8" variants={itemVariants}>
              <p className="text-gray-500 text-sm">
                Don't have an account?{' '}
                <a href="/signup" className="text-blue-500 font-semibold">
                  Sign Up
                </a>
              </p>
              <h1 className="text-3xl font-bold text-gray-900 mt-2">
                Welcome Back
              </h1>
            </motion.div>

               {/* Display error message if login fails */}
               {error && (
              <motion.div
                className="text-red-500 text-center mb-4"
                variants={itemVariants}
              >
                {error}
              </motion.div>
            )}

            {/* Input Fields */}
            <motion.div variants={itemVariants}>
              <InputField
                label="Email"
                placeholder="Enter your email address"
                type="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                containerClassName="mb-6"
              />
            </motion.div>
            <motion.div variants={itemVariants}>
              <InputField
                label="Password"
                value={password}
                name="password"
                placeholder="Enter your password"
                type="password"
                handleChange={(e) => setPassword(e.target.value)}
                containerClassName="mb-6"
              />
            </motion.div>

            {/* Terms and Submit */}
            <motion.div className="mt-6" variants={itemVariants}>
              <Button
                size="fill"
                type="submit"
                
                loading={isLoading}
                className="bg-blue-500 text-white py-3 rounded-full mt-2 hover:bg-blue-600 transition"
                disabled={isLoading || !password || !email}
              >
                Log In
              </Button>
            </motion.div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Form;
