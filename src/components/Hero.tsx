import React from 'react';
import { ArrowRight, Leaf, TrendingUp, Shield, Users, Zap, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const features = [
    {
      icon: Leaf,
      title: 'Smart Crop Recommendation',
      description: 'AI-powered crop selection based on soil, weather, and market conditions'
    },
    {
      icon: TrendingUp,
      title: 'Real-time Monitoring',
      description: 'IoT sensors track soil moisture, pH, temperature, and weather patterns'
    },
    {
      icon: Shield,
      title: 'Pest Identification',
      description: 'Advanced image recognition to identify and treat crop diseases'
    },
    {
      icon: Users,
      title: 'Farmer Marketplace',
      description: 'Direct sales platform connecting farmers with buyers'
    },
    {
      icon: Zap,
      title: 'AI Farm Assistant',
      description: '24/7 AI chatbot for farming guidance and expert advice'
    },
    {
      icon: Globe,
      title: 'Weekly Reports',
      description: 'Comprehensive analytics and insights for better decision making'
    }
  ];

  const stats = [
    { value: '50K+', label: 'Farmers Helped' },
    { value: '95%', label: 'Crop Success Rate' },
    { value: '2.5x', label: 'Yield Increase' },
    { value: '30%', label: 'Cost Reduction' }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 rounded-full text-primary-300 text-sm font-medium mb-6">
              <Leaf className="h-4 w-4 mr-2" />
              Smart Farming Revolution
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              AgriAI: From
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-secondary-400"> Soil to Sale</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Revolutionary AI-powered farming platform that guides you through every step of agriculture - 
              from crop selection to market sales with IoT monitoring and expert guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="px-8 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center group">
                Get Started Free
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-400 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Complete Farming Solutions
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Everything you need to maximize your farming potential in one intelligent platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="group p-8 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:border-primary-400/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="w-12 h-12 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center mb-6 group-hover:animate-glow">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-primary-500/20 to-secondary-500/20 backdrop-blur-sm rounded-3xl p-12 border border-white/20">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Farm?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of farmers who've increased their yields by 2.5x with AgriAI
            </p>
            <button className="px-10 py-4 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-semibold rounded-xl hover:from-primary-600 hover:to-primary-700 transition-all duration-300 shadow-lg hover:shadow-xl">
              Start Your Free Trial
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;