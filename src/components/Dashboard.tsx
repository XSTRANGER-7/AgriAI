import React from 'react';
import { TrendingUp, TrendingDown, Droplets, Thermometer, Wind, Sun, AlertTriangle, CheckCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const metrics = [
    {
      title: 'Soil Moisture',
      value: '68%',
      trend: '+5%',
      trending: 'up',
      icon: Droplets,
      color: 'blue'
    },
    {
      title: 'Temperature',
      value: '24°C',
      trend: '+2°C',
      trending: 'up',
      icon: Thermometer,
      color: 'orange'
    },
    {
      title: 'Humidity',
      value: '72%',
      trend: '-3%',
      trending: 'down',
      icon: Wind,
      color: 'cyan'
    },
    {
      title: 'Light Intensity',
      value: '85%',
      trend: '+10%',
      trending: 'up',
      icon: Sun,
      color: 'yellow'
    }
  ];

  const alerts = [
    {
      type: 'warning',
      message: 'Low soil moisture detected in Field A',
      time: '2 hours ago'
    },
    {
      type: 'success',
      message: 'Optimal growing conditions in Field B',
      time: '4 hours ago'
    },
    {
      type: 'warning',
      message: 'High temperature alert for greenhouse 1',
      time: '6 hours ago'
    }
  ];

  const crops = [
    {
      name: 'Tomatoes',
      area: '2.5 hectares',
      stage: 'Flowering',
      health: 92,
      expectedHarvest: '15 days'
    },
    {
      name: 'Wheat',
      area: '5.0 hectares',
      stage: 'Grain filling',
      health: 88,
      expectedHarvest: '25 days'
    },
    {
      name: 'Corn',
      area: '3.2 hectares',
      stage: 'Vegetative',
      health: 95,
      expectedHarvest: '45 days'
    }
  ];

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Farm Dashboard</h1>
          <p className="text-gray-300">Real-time insights from your IoT sensors and AI analysis</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            const colorClasses = {
              blue: 'from-blue-500 to-blue-600',
              orange: 'from-orange-500 to-orange-600',
              cyan: 'from-cyan-500 to-cyan-600',
              yellow: 'from-yellow-500 to-yellow-600'
            };

            return (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${colorClasses[metric.color as keyof typeof colorClasses]} rounded-lg flex items-center justify-center`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className={`flex items-center text-sm ${
                    metric.trending === 'up' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {metric.trending === 'up' ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                    {metric.trend}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-1">{metric.value}</h3>
                <p className="text-gray-300 text-sm">{metric.title}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Crop Status */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Crop Status</h2>
            <div className="space-y-4">
              {crops.map((crop, index) => (
                <div key={index} className="bg-white/5 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-white font-medium">{crop.name}</h3>
                      <p className="text-gray-400 text-sm">{crop.area}</p>
                    </div>
                    <span className="px-3 py-1 bg-primary-500/20 text-primary-300 rounded-full text-xs">
                      {crop.stage}
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Health Score</span>
                      <span className="text-white font-medium">{crop.health}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-green-400 h-2 rounded-full"
                        style={{ width: `${crop.health}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-300">Expected Harvest</span>
                      <span className="text-white font-medium">{crop.expectedHarvest}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Recent Alerts</h2>
            <div className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start space-x-3">
                  {alert.type === 'warning' ? (
                    <AlertTriangle className="h-5 w-5 text-yellow-400 mt-0.5" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-400 mt-0.5" />
                  )}
                  <div>
                    <p className="text-white text-sm">{alert.message}</p>
                    <p className="text-gray-400 text-xs mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Weather Widget */}
        <div className="mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">Weather Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
            {['Today', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day, index) => (
              <div key={index} className="text-center">
                <p className="text-gray-300 text-sm mb-2">{day}</p>
                <Sun className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-white font-medium">28°</p>
                <p className="text-gray-400 text-sm">18°</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;