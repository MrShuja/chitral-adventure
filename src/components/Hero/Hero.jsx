import React, { useState, useEffect } from 'react';
import { heroContent } from '../../data/content';
import { addSubscriber, getSubscribers } from '../../data/subscriber';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [subscriberCount, setSubscriberCount] = useState(0);
  const [subscribeStatus, setSubscribeStatus] = useState({
    message: '',
    type: '' // 'success' or 'error'
  });

  useEffect(() => {
    // Update subscriber count on mount
    setSubscriberCount(getSubscribers());
  }, []);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newCount = await addSubscriber(email);
      setSubscriberCount(newCount);
      setSubscribeStatus({
        message: `Thank you for subscribing! You are subscriber #${newCount}. Your email has been saved.`,
        type: 'success'
      });
      setEmail('');
      
      // Hide the success message after 5 seconds
      setTimeout(() => {
        setSubscribeStatus({ message: '', type: '' });
      }, 5000);
    } catch (error) {
      setSubscribeStatus({
        message: error.message,
        type: 'error'
      });
      
      // Hide the error message after 4 seconds
      setTimeout(() => {
        setSubscribeStatus({ message: '', type: '' });
      }, 4000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center mt-16">
      {/* Background Image with Parallax Effect */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ 
          backgroundImage: 'url(/images/chitral-landscape.jpg)',
          backgroundPosition: '50% 30%',
          filter: 'brightness(0.8)'
        }}
      />

      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to right bottom, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.2) 100%)'
        }}
      />

      {/* Content */}
      <div className="relative container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight drop-shadow-lg">
            {heroContent.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-100 mb-12 leading-relaxed max-w-3xl mx-auto drop-shadow">
            {heroContent.description}
          </p>

          {/* Features List */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12 max-w-3xl mx-auto">
            {heroContent.features.map((feature, index) => (
              <div 
                key={index} 
                className="text-white/90 text-sm md:text-base bg-black/30 backdrop-blur-sm rounded-lg p-3 border border-white/10 hover:bg-black/40 transition-colors duration-300"
              >
                {feature}
              </div>
            ))}
          </div>

          {/* Subscribe Form */}
          <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 max-w-2xl mx-auto border border-white/10">
            <div className="mb-4">
              <span className="text-white/80 text-sm">
                Join our {subscriberCount > 0 ? subscriberCount : 'growing'} community of Chitral enthusiasts
              </span>
            </div>
            <form onSubmit={handleSubscribe} className="flex flex-col gap-4">
              {/* Subscription Status Message */}
              {subscribeStatus.message && (
                <div 
                  className={`rounded-lg p-3 text-sm ${
                    subscribeStatus.type === 'success' 
                      ? 'bg-green-600/20 text-green-100 border border-green-500/30' 
                      : 'bg-red-600/20 text-red-100 border border-red-500/30'
                  }`}
                >
                  {subscribeStatus.message}
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email for travel updates"
                  className="px-6 py-4 rounded-lg text-gray-800 w-full focus:outline-none focus:ring-2 focus:ring-green-500 bg-white/95"
                  required
                  disabled={isSubmitting}
                />
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg font-semibold transition duration-300 whitespace-nowrap shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={!email || isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="inline-block w-5 h-5 border-2 border-white/80 border-t-transparent rounded-full animate-spin mr-2" />
                  ) : null}
                  {isSubmitting ? 'Subscribing...' : 'Subscribe Now'}
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-2 space-y-1">
                <p>* Your email is stored securely in your browser</p>
              </div>
            </form>
          </div>

          {/* Call to Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-6 justify-center">
            <button className="bg-white/95 text-gray-900 hover:bg-white px-10 py-4 rounded-lg font-semibold transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Explore Places
            </button>
            <button className="bg-transparent border-2 border-white/80 text-white hover:bg-white/10 px-10 py-4 rounded-lg font-semibold transition duration-300 backdrop-blur-sm transform hover:-translate-y-1">
              Plan Your Trip
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
