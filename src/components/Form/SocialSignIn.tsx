import React from 'react';

const SocialSignIn: React.FC = () => {
  return (
    <div className="mt-6">
      <div className="text-center mb-4">OR Continue with</div>
      <div className="flex justify-center gap-4">
        <button className="flex items-center px-4 py-2 border rounded-md">
          <img src="/facebook-icon.svg" alt="Facebook" className="mr-2 w-5" />
          Facebook
        </button>
        <button className="flex items-center px-4 py-2 border rounded-md">
          <img src="/google-icon.svg" alt="Google" className="mr-2 w-5" />
          Google
        </button>
        <button className="flex items-center px-4 py-2 border rounded-md">
          <img src="/apple-icon.svg" alt="Apple" className="mr-2 w-5" />
          Apple
        </button>
      </div>
    </div>
  );
};

export default SocialSignIn;
