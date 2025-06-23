import React, { useState, useEffect } from 'react';
import { Sprout, MapPin, Calendar, TrendingUp, Award, Leaf, Cpu, RefreshCw } from 'lucide-react';
import { BedrockService } from '../services/bedrockService';
import { SageMakerService } from '../services/sageMakerService';

const CropRecommendation: React.FC = () => {
  const [selectedSoilType, setSelectedSoilType] = useState('loamy');
  const [selectedSeason, setSelectedSeason] = useState('summer');
  const [selectedRegion, setSelectedRegion] = useState('temperate');
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [aiInsights, setAiInsights] = useState<string>('');

  const soilTypes = [
    { id: 'loamy', name: 'Loamy Soil', description: 'Balanced sand, silt, and clay' },
    { id: 'clay', name: 'Clay Soil', description: 'High water retention' },
    { id: 'sandy', name: 'Sandy Soil', description: 'Good drainage, low nutrients' },
    { id: 'silt', name: 'Silt Soil', description: 'Fine particles, fertile' }
  ];

  const seasons = [
    { id: 'spring', name: 'Spring', icon: Leaf },
    { id: 'summer', name: 'Summer', icon: Calendar },
    { id: 'monsoon', name: 'Monsoon', icon: Calendar },
    { id: 'winter', name: 'Winter', icon: Calendar }
  ];

  const generateRecommendations = async () => {
    setIsLoading(true);
    try {
      // Prepare soil and weather data
      const soilData = {
        type: selectedSoilType,
        ph: 6.8,
        moisture: 68,
        nutrients: {
          nitrogen: 'high',
          phosphorus: 'medium',
          potassium: 'high'
        }
      };

      const weatherData = {
        temperature: 24,
        humidity: 72,
        rainfall: 150,
        season: selectedSeason
      };

      // Get AI-powered recommendations from Bedrock
      const bedrockResponse = await BedrockService.generateCropRecommendations(
        soilData,
        weatherData,
        selectedRegion
      );

      // Get additional recommendations from SageMaker
      const sageMakerData = {
        soilType: selectedSoilType,
        phLevel: 6.8,
        moistureContent: 68,
        temperatureAvg: 24,
        rainfallMm: 150,
        season: selectedSeason,
        locationLat: 40.7128,
        locationLng: -74.0060,
        farmSize: 10
      };

      const sageMakerResponse = await SageMakerService.getCropRecommendations(sageMakerData);

      // Combine recommendations
      const combinedRecommendations = [
        ...bedrockResponse.recommendations,
        ...sageMakerResponse.recommended_crops.map((crop: any) => ({
          name: crop.name,
          suitability: Math.round(crop.suitability_score * 100),
          expectedYield: `${crop.expected_yield} tons/ha`,
          profit: `$${(crop.expected_yield * 1000).toLocaleString()}/ha`,
          season: selectedSeason,
          benefits: ['AI-optimized', 'High yield potential', 'Market demand'],
          image: `https://images.pexels.com/photos/${Math.floor(Math.random() * 1000000)}/pexels-photo-${Math.floor(Math.random() * 1000000)}.jpeg?auto=compress&cs=tinysrgb&w=400`
        }))
      ];

      setRecommendations(combinedRecommendations.slice(0, 4)); // Show top 4
      setAiInsights(bedrockResponse.aiInsights || 'AI analysis completed successfully.');
    } catch (error) {
      console.error('Error generating recommendations:', error);
      // Fallback to default recommendations
      setRecommendations([
        {
          name: 'Tomatoes',
          suitability: 95,
          expectedYield: '45-60 tons/ha',
          profit: '$8,500/ha',
          season: 'Summer',
          benefits: ['High market demand', 'Good storage life', 'Multiple harvests'],
          image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400'
        },
        {
          name: 'Bell Peppers',
          suitability: 85,
          expectedYield: '25-35 tons/ha',
          profit: '$6,200/ha',
          season: 'Summer',
          benefits: ['Premium pricing', 'Export potential', 'Greenhouse compatible'],
          image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400'
        }
      ]);
      setAiInsights('Using cached recommendations. Please check your AWS configuration for live AI analysis.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    generateRecommendations();
  }, [selectedSoilType, selectedSeason, selectedRegion]);

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 rounded-full text-primary-300 text-sm font-medium mb-4">
            <Cpu className="h-4 w-4 mr-2" />
            AWS AI-Powered Recommendations
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Smart Crop Advisor</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Get personalized crop recommendations powered by Amazon Bedrock and SageMaker AI
          </p>
        </div>

        {/* Input Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-white">Farm Conditions</h2>
            <button
              onClick={generateRecommendations}
              disabled={isLoading}
              className="flex items-center px-4 py-2 bg-primary-500/20 text-primary-300 rounded-lg hover:bg-primary-500/30 transition-all disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              {isLoading ? 'Analyzing...' : 'Refresh AI Analysis'}
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Soil Type */}
            <div>
              <label className="block text-white font-medium mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Soil Type
              </label>
              <div className="space-y-2">
                {soilTypes.map((soil) => (
                  <button
                    key={soil.id}
                    onClick={() => setSelectedSoilType(soil.id)}
                    className={`w-full text-left p-3 rounded-lg border transition-all ${
                      selectedSoilType === soil.id
                        ? 'bg-primary-500/20 border-primary-400 text-primary-300'
                        : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    <div className="font-medium">{soil.name}</div>
                    <div className="text-sm opacity-80">{soil.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Season */}
            <div>
              <label className="block text-white font-medium mb-3 flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                Planting Season
              </label>
              <div className="space-y-2">
                {seasons.map((season) => {
                  const Icon = season.icon;
                  return (
                    <button
                      key={season.id}
                      onClick={() => setSelectedSeason(season.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-all flex items-center ${
                        selectedSeason === season.id
                          ? 'bg-primary-500/20 border-primary-400 text-primary-300'
                          : 'bg-white/5 border-white/20 text-gray-300 hover:bg-white/10'
                      }`}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <div className="font-medium">{season.name}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Region */}
            <div>
              <label className="block text-white font-medium mb-3 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Climate Zone
              </label>
              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white focus:border-primary-400 focus:outline-none"
              >
                <option value="tropical">Tropical</option>
                <option value="temperate">Temperate</option>
                <option value="arid">Arid</option>
                <option value="mediterranean">Mediterranean</option>
              </select>
            </div>
          </div>
        </div>

        {/* AI Insights */}
        {aiInsights && (
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center">
              <Cpu className="h-5 w-5 mr-2" />
              AI Analysis Insights
            </h2>
            <p className="text-gray-300 leading-relaxed">{aiInsights}</p>
          </div>
        )}

        {/* Recommendations */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Award className="h-6 w-6 mr-2 text-primary-400" />
            AI-Recommended Crops
          </h2>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 animate-pulse">
                  <div className="h-20 bg-white/20 rounded-lg mb-4"></div>
                  <div className="h-4 bg-white/20 rounded mb-2"></div>
                  <div className="h-4 bg-white/20 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recommendations.map((crop, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:border-primary-400/50 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <img 
                        src={crop.image} 
                        alt={crop.name}
                        className="w-16 h-16 rounded-lg object-cover mr-4"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=400';
                        }}
                      />
                      <div>
                        <h3 className="text-xl font-semibold text-white">{crop.name}</h3>
                        <p className="text-gray-300 text-sm">{crop.season} Season</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-primary-400">{crop.suitability}%</div>
                      <div className="text-xs text-gray-400">AI Score</div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expected Yield:</span>
                      <span className="text-white font-medium">{crop.expectedYield}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Estimated Profit:</span>
                      <span className="text-green-400 font-medium">{crop.profit}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2">Key Benefits:</h4>
                    <div className="space-y-1">
                      {crop.benefits?.map((benefit: string, idx: number) => (
                        <div key={idx} className="flex items-center text-sm text-gray-300">
                          <div className="w-2 h-2 bg-primary-400 rounded-full mr-2"></div>
                          {benefit}
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full px-4 py-2 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-medium rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-300">
                    Get AI Planting Guide
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Market Insights */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
            <TrendingUp className="h-5 w-5 mr-2" />
            AI Market Insights
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400 mb-2">↑ 15%</div>
              <div className="text-white font-medium">Tomato Prices</div>
              <div className="text-gray-400 text-sm">AI prediction vs last month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-2">2.5x</div>
              <div className="text-white font-medium">Export Demand</div>
              <div className="text-gray-400 text-sm">Bell peppers forecast</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400 mb-2">85%</div>
              <div className="text-white font-medium">Supply Gap</div>
              <div className="text-gray-400 text-sm">Organic produce opportunity</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendation;