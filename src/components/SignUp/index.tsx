import React, { useState } from 'react';
import InputField from '@/components/Form/Input';
import Header from '@/components/Header';
import AnimationWrapper from '@/components/Animations/FlyInWrapper';
import { useAuth } from '@/Provider/AuthContext';
import { useRouter } from 'next/router';
import { Button } from '../Buttons';

const SignUpForm: React.FC = () => {
  const { signup } = useAuth();
  const router = useRouter();
  
  const [profileName, setProfileName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      await signup(email, password, profileName);
      router.push('/'); // Redirect to home or dashboard after signup
    } catch (err) {
      setError('Failed to create an account. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Component */}
      <Header type="signup" />

      {/* Main Content */}
      <div className="flex justify-center mt-9 flex-grow">
        <div className="max-w-lg w-full space-y-8 bg-white p-8">
            <form onSubmit={handleSubmit}>
          <AnimationWrapper>
              {/* Heading Section */}
              <div className="text-center mb-8">
                <p className="text-gray-500 text-sm">
                  Already have an account?{' '}
                  <a href="/login" className="text-blue-500 font-semibold">
                    Log in
                  </a>
                </p>
                <h1 className="text-3xl font-bold text-gray-900 mt-2">
                  Create an account
                </h1>
              </div>

                {/* Display error message if any */}
                {error && (
                <div className="text-red-500 text-center mb-4">
                  {error}
                </div>
              )}

              {/* Input Fields */}
              <InputField
                label="What should we call you?"
                placeholder="Enter your profile name"
                value={profileName}
                handleChange={(e) => setProfileName(e.target.value)}
                containerClassName="mb-6"
              />
              <InputField
                label="What's your email?"
                placeholder="Enter your email address"
                type="email"
                value={email}
                handleChange={(e) => setEmail(e.target.value)}
                containerClassName="mb-6"
              />
              <InputField
                label="Create a password"
                value={password}
                name="password"
                placeholder="Enter your password"
                type="password"
                handleChange={(e) => setPassword(e.target.value)}
                containerClassName="mb-6"
              />
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                value={confirmPassword}
                placeholder="Re-enter your password"
                type="password"
                handleChange={(e) => setConfirmPassword(e.target.value)}
                containerClassName="mb-6"
              />

            

              {/* Terms and Submit */}
              <div className="mt-6">
                <Button
                size={"fill"}
                  type="submit"
                  className="w-full bg-blue-500 text-white py-3 rounded-full mt-2 hover:bg-blue-600 transition"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating account...' : 'Create an account'}
                </Button>
                <p className="text-sm text-gray-500 mt-2 text-center">
                  By creating an account, you agree to the{' '}
                  <a href="/terms" className="text-blue-500 font-semibold">
                    Terms of use
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" className="text-blue-500 font-semibold">
                    Privacy Policy
                  </a>.
                </p>
              </div>
          </AnimationWrapper>
            </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
