import React, { useState } from 'react';
import { Camera, Upload, Search, AlertTriangle, CheckCircle, Bug, Leaf, Shield, Cpu } from 'lucide-react';
import { BedrockService } from '../services/bedrockService';
import { SageMakerService } from '../services/sageMakerService';

const PestIdentification: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [cropType, setCropType] = useState('tomato');

  const commonPests = [
    {
      id: 'aphids',
      name: 'Aphids',
      severity: 'Medium',
      confidence: 94,
      description: 'Small, soft-bodied insects that feed on plant sap',
      symptoms: ['Yellowing leaves', 'Sticky honeydew', 'Curled leaves'],
      treatment: ['Neem oil spray', 'Ladybug release', 'Insecticidal soap'],
      prevention: ['Regular inspection', 'Companion planting', 'Proper spacing'],
      image: 'https://images.pexels.com/photos/6799095/pexels-photo-6799095.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'spider-mites',
      name: 'Spider Mites',
      severity: 'High',
      confidence: 87,
      description: 'Tiny pests that create webbing and cause stippling damage',
      symptoms: ['Fine webbing', 'Yellow stippling', 'Dry leaves'],
      treatment: ['Miticide application', 'Increase humidity', 'Predatory mites'],
      prevention: ['Adequate watering', 'Avoid over-fertilizing', 'Air circulation'],
      image: 'https://images.pexels.com/photos/6799128/pexels-photo-6799128.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'whiteflies',
      name: 'Whiteflies',
      severity: 'Medium',
      confidence: 91,
      description: 'Small white flying insects that damage plants and spread viruses',
      symptoms: ['White flying insects', 'Yellowing leaves', 'Sooty mold'],
      treatment: ['Yellow sticky traps', 'Insecticidal soap', 'Reflective mulch'],
      prevention: ['Remove infected plants', 'Clean greenhouse', 'Quarantine new plants'],
      image: 'https://images.pexels.com/photos/6799134/pexels-photo-6799134.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  const recentDetections = [
    {
      date: '2024-01-15',
      crop: 'Tomatoes',
      pest: 'Early Blight',
      confidence: 96,
      action: 'Fungicide applied',
      aiService: 'Bedrock'
    },
    {
      date: '2024-01-14',
      crop: 'Bell Peppers',
      pest: 'Aphids',
      confidence: 89,
      action: 'Neem oil treatment',
      aiService: 'SageMaker'
    },
    {
      date: '2024-01-13',
      crop: 'Lettuce',
      pest: 'Slugs',
      confidence: 92,
      action: 'Slug bait applied',
      aiService: 'Bedrock'
    }
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target?.result as string);
        analyzeImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (imageDataUrl: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);

    try {
      // Extract base64 data from data URL
      const base64Data = imageDataUrl.split(',')[1];

      // Use both Bedrock and SageMaker for comprehensive analysis
      const [bedrockResult, sageMakerResult] = await Promise.allSettled([
        BedrockService.analyzePestImage(base64Data, cropType),
        SageMakerService.detectPests(base64Data)
      ]);

      let finalResult = null;

      if (bedrockResult.status === 'fulfilled') {
        finalResult = bedrockResult.value;
        finalResult.aiService = 'Amazon Bedrock';
      } else if (sageMakerResult.status === 'fulfilled') {
        // Convert SageMaker result to our format
        const smResult = sageMakerResult.value;
        finalResult = {
          pestIdentified: smResult.detected_pests[0]?.pest_name || 'Unknown',
          confidence: Math.round((smResult.detected_pests[0]?.confidence || 0) * 100),
          severity: smResult.detected_pests[0]?.severity || 'Medium',
          description: `Detected with ${Math.round((smResult.plant_health_score || 0) * 100)}% plant health score`,
          treatment: smResult.treatment_recommendations || ['Monitor closely', 'Apply appropriate treatment'],
          prevention: ['Regular monitoring', 'Maintain plant health', 'Proper sanitation'],
          aiService: 'Amazon SageMaker'
        };
      } else {
        // Fallback to demo data
        finalResult = {
          pestIdentified: 'Aphids',
          confidence: 94,
          severity: 'Medium',
          description: 'Green peach aphids detected on leaf surface',
          treatment: [
            'Apply neem oil spray in early morning or evening',
            'Introduce beneficial insects like ladybugs',
            'Monitor plant weekly for re-infestation',
            'Ensure proper plant spacing for air circulation'
          ],
          prevention: [
            'Maintain proper plant spacing',
            'Regular inspection of plants',
            'Use companion planting strategies'
          ],
          aiService: 'Demo Mode (Configure AWS credentials)'
        };
      }

      setAnalysisResult(finalResult);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setAnalysisResult({
        pestIdentified: 'Analysis Error',
        confidence: 0,
        severity: 'Unknown',
        description: 'Unable to analyze image. Please check your AWS configuration.',
        treatment: ['Consult local agricultural expert'],
        prevention: ['Regular crop monitoring'],
        aiService: 'Error'
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'high': return 'text-red-400 bg-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/20';
      default: return 'text-gray-400 bg-gray-500/20';
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 bg-accent-500/20 rounded-full text-accent-300 text-sm font-medium mb-4">
            <Cpu className="h-4 w-4 mr-2" />
            AWS AI-Powered Pest Detection
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Pest & Disease Identification</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Upload crop images for instant AI-powered pest identification using Amazon Bedrock and SageMaker
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 mb-8">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                AI Image Analysis
              </h2>

              {/* Crop Type Selector */}
              <div className="mb-6">
                <label className="block text-white font-medium mb-2">Crop Type</label>
                <select
                  value={cropType}
                  onChange={(e) => setCropType(e.target.value)}
                  className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:border-accent-400 focus:outline-none"
                >
                  <option value="tomato">Tomato</option>
                  <option value="pepper">Bell Pepper</option>
                  <option value="lettuce">Lettuce</option>
                  <option value="corn">Corn</option>
                  <option value="wheat">Wheat</option>
                </select>
              </div>

              {!selectedImage ? (
                <div className="border-2 border-dashed border-white/30 rounded-xl p-12 text-center">
                  <div className="flex flex-col items-center">
                    <Upload className="h-16 w-16 text-gray-400 mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">Upload Crop Image</h3>
                    <p className="text-gray-300 mb-6">AI will analyze for pests and diseases</p>
                    <label className="px-6 py-3 bg-gradient-to-r from-accent-500 to-accent-600 text-white font-medium rounded-lg cursor-pointer hover:from-accent-600 hover:to-accent-700 transition-all duration-300">
                      Choose Image
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="relative">
                    <img
                      src={selectedImage}
                      alt="Uploaded crop"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setAnalysisResult(null);
                      }}
                      className="absolute top-2 right-2 p-2 bg-black/50 text-white rounded-lg hover:bg-black/70"
                    >
                      ×
                    </button>
                  </div>

                  {isAnalyzing && (
                    <div className="text-center py-8">
                      <div className="inline-flex items-center px-4 py-2 bg-accent-500/20 rounded-full text-accent-300 mb-4">
                        <div className="animate-spin h-4 w-4 border-2 border-accent-400 border-t-transparent rounded-full mr-2"></div>
                        AI analyzing image...
                      </div>
                      <p className="text-gray-300">Using Amazon Bedrock and SageMaker for comprehensive analysis</p>
                    </div>
                  )}

                  {analysisResult && (
                    <div className="bg-white/5 rounded-lg p-6">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white flex items-center">
                          <Bug className="h-5 w-5 mr-2 text-red-400" />
                          AI Detection Results
                        </h3>
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs">
                          {analysisResult.aiService}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="text-white font-medium">{analysisResult.pestIdentified}</h4>
                            <p className="text-gray-300 text-sm">{analysisResult.description}</p>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white">{analysisResult.confidence}%</div>
                            <div className="text-xs text-gray-400">Confidence</div>
                          </div>
                        </div>

                        <div className="flex items-center">
                          <span className="text-gray-300 mr-2">Severity:</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(analysisResult.severity)}`}>
                            {analysisResult.severity}
                          </span>
                        </div>

                        <div>
                          <h5 className="text-white font-medium mb-2">AI Recommended Actions:</h5>
                          <ul className="space-y-1">
                            {analysisResult.treatment?.map((rec: string, index: number) => (
                              <li key={index} className="flex items-start text-gray-300 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                                {rec}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h5 className="text-white font-medium mb-2">Prevention Strategies:</h5>
                          <ul className="space-y-1">
                            {analysisResult.prevention?.map((prev: string, index: number) => (
                              <li key={index} className="flex items-start text-gray-300 text-sm">
                                <Shield className="h-4 w-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                                {prev}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Recent Detections */}
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6">Recent AI Detections</h2>
              <div className="space-y-4">
                {recentDetections.map((detection, index) => (
                  <div key={index} className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-white font-medium">{detection.pest}</h3>
                        <p className="text-gray-400 text-sm">{detection.crop} • {detection.date}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-accent-400 font-medium">{detection.confidence}%</span>
                        <div className="text-xs text-gray-400">{detection.aiService}</div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <span className="text-gray-300">Action taken:</span>
                      <span className="text-green-400 ml-2">{detection.action}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Common Pests Reference */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Search className="h-5 w-5 mr-2" />
                Common Pests Database
              </h2>
              <div className="space-y-4">
                {commonPests.map((pest) => (
                  <div key={pest.id} className="bg-white/5 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-white font-medium">{pest.name}</h3>
                        <p className="text-gray-400 text-sm">{pest.description}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(pest.severity)}`}>
                        {pest.severity}
                      </span>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-300 font-medium">Symptoms:</span>
                        <div className="text-gray-400 ml-2">
                          {pest.symptoms.slice(0, 2).join(', ')}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-300 font-medium">Treatment:</span>
                        <div className="text-gray-400 ml-2">
                          {pest.treatment[0]}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AWS AI Services Info */}
            <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-6 flex items-center">
                <Cpu className="h-5 w-5 mr-2" />
                AI Services Used
              </h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-orange-500/20 rounded-lg flex items-center justify-center mr-3">
                    <Cpu className="h-4 w-4 text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Amazon Bedrock</h3>
                    <p className="text-gray-300 text-sm">Claude AI for detailed pest analysis and treatment recommendations</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center mr-3">
                    <Cpu className="h-4 w-4 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">Amazon SageMaker</h3>
                    <p className="text-gray-300 text-sm">Custom ML models for precise pest detection and classification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestIdentification;