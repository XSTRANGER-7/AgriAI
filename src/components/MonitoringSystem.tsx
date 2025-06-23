import React, { useState } from 'react';
import { Monitor, Wifi, Battery, AlertCircle, CheckCircle, Thermometer, Droplets, Wind, Sun } from 'lucide-react';

const MonitoringSystem: React.FC = () => {
  const [selectedField, setSelectedField] = useState('field-a');

  const sensors = [
    {
      id: 'soil-1',
      name: 'Soil Sensor #1',
      field: 'Field A - North',
      status: 'active',
      battery: 85,
      lastUpdate: '2 min ago',
      metrics: {
        moisture: 68,
        ph: 6.8,
        temperature: 24,
        nutrients: 'High'
      }
    },
    {
      id: 'weather-1',
      name: 'Weather Station #1',
      field: 'Field A - Center',
      status: 'active',
      battery: 92,
      lastUpdate: '1 min ago',
      metrics: {
        temperature: 28,
        humidity: 72,
        windSpeed: 12,
        rainfall: 0
      }
    },
    {
      id: 'soil-2',
      name: 'Soil Sensor #2',
      field: 'Field B - South',
      status: 'warning',
      battery: 45,
      lastUpdate: '15 min ago',
      metrics: {
        moisture: 35,
        ph: 7.2,
        temperature: 26,
        nutrients: 'Medium'
      }
    },
    {
      id: 'irrigation-1',
      name: 'Irrigation Monitor #1',
      field: 'Field A - West',
      status: 'active',
      battery: 78,
      lastUpdate: '3 min ago',
      metrics: {
        flowRate: 150,
        pressure: 2.5,
        waterLevel: 85,
        valveStatus: 'Open'
      }
    }
  ];

  const fields = [
    { id: 'field-a', name: 'Field A - Tomatoes', area: '2.5 ha', sensors: 5 },
    { id: 'field-b', name: 'Field B - Wheat', area: '5.0 ha', sensors: 3 },
    { id: 'field-c', name: 'Field C - Corn', area: '3.2 ha', sensors: 4 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'warning': return 'text-yellow-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'warning': return AlertCircle;
      case 'error': return AlertCircle;
      default: return Monitor;
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-secondary-500/20 rounded-full text-secondary-300 text-sm font-medium mb-4">
            <Monitor className="h-4 w-4 mr-2" />
            Real-time IoT Monitoring
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Field Monitoring System</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Monitor your crops and environmental conditions in real-time with our IoT sensor network
          </p>
        </div>

        {/* Field Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-4">
            {fields.map((field) => (
              <button
                key={field.id}
                onClick={() => setSelectedField(field.id)}
                className={`px-6 py-3 rounded-xl border transition-all ${
                  selectedField === field.id
                    ? 'bg-secondary-500/20 border-secondary-400 text-secondary-300'
                    : 'bg-white/10 border-white/20 text-gray-300 hover:bg-white/20'
                }`}
              >
                <div className="font-medium">{field.name}</div>
                <div className="text-sm opacity-80">{field.area} • {field.sensors} sensors</div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Metrics Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Thermometer className="h-8 w-8 text-orange-400" />
              <span className="text-2xl font-bold text-white">24°C</span>
            </div>
            <div className="text-gray-300">Avg Temperature</div>
            <div className="text-green-400 text-sm mt-1">↑ 2°C from yesterday</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Droplets className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">68%</span>
            </div>
            <div className="text-gray-300">Soil Moisture</div>
            <div className="text-green-400 text-sm mt-1">Optimal range</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Wind className="h-8 w-8 text-cyan-400" />
              <span className="text-2xl font-bold text-white">72%</span>
            </div>
            <div className="text-gray-300">Humidity</div>
            <div className="text-yellow-400 text-sm mt-1">↓ 5% from morning</div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-4">
              <Sun className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">850</span>
            </div>
            <div className="text-gray-300">Light (Lux)</div>
            <div className="text-green-400 text-sm mt-1">Perfect for growth</div>
          </div>
        </div>

        {/* Sensor Status Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
              <Monitor className="h-5 w-5 mr-2" />
              Active Sensors
            </h2>
            <div className="space-y-4">
              {sensors.map((sensor) => {
                const StatusIcon = getStatusIcon(sensor.status);
                return (
                  <div key={sensor.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <StatusIcon className={`h-5 w-5 mr-3 ${getStatusColor(sensor.status)}`} />
                        <div>
                          <h3 className="text-white font-medium">{sensor.name}</h3>
                          <p className="text-gray-400 text-sm">{sensor.field}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center">
                          <Battery className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-white text-sm">{sensor.battery}%</span>
                        </div>
                        <Wifi className="h-4 w-4 text-green-400" />
                      </div>
                    </div>
                    <div className="text-gray-400 text-sm mb-3">
                      Last update: {sensor.lastUpdate}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      {Object.entries(sensor.metrics).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1')}:</span>
                          <span className="text-white font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Irrigation Control */}
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
            <h2 className="text-xl font-semibold text-white mb-6">Irrigation Control</h2>
            
            <div className="space-y-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Zone A - North Field</h3>
                  <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    Active
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Duration:</span>
                    <span className="text-white">15 min remaining</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                  </div>
                  <button className="w-full py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition-all">
                    Stop Irrigation
                  </button>
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-white font-medium">Zone B - South Field</h3>
                  <button className="px-3 py-1 bg-gray-500/20 text-gray-400 rounded-full text-sm">
                    Scheduled
                  </button>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-300">Next Schedule:</span>
                    <span className="text-white">Tomorrow 6:00 AM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-300">Duration:</span>
                    <span className="text-white">30 minutes</span>
                  </div>
                  <button className="w-full py-2 bg-primary-500/20 text-primary-400 rounded-lg hover:bg-primary-500/30 transition-all">
                    Start Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* System Health */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">System Health</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="h-8 w-8 text-green-400" />
              </div>
              <div className="text-white font-medium">12/12 Sensors Online</div>
              <div className="text-gray-400 text-sm">All systems operational</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Wifi className="h-8 w-8 text-blue-400" />
              </div>
              <div className="text-white font-medium">Excellent Connectivity</div>
              <div className="text-gray-400 text-sm">98% uptime this month</div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                <Battery className="h-8 w-8 text-yellow-400" />
              </div>
              <div className="text-white font-medium">Battery Average: 78%</div>
              <div className="text-gray-400 text-sm">2 sensors need replacement</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonitoringSystem;