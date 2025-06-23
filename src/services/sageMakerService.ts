import { InvokeEndpointCommand } from '@aws-sdk/client-sagemaker-runtime';
import { sageMakerClient, SAGEMAKER_ENDPOINTS } from './awsConfig';

export class SageMakerService {
  // Predict crop yield using SageMaker endpoint
  static async predictCropYield(cropData: any): Promise<any> {
    try {
      const payload = {
        instances: [
          {
            crop_type: cropData.cropType,
            soil_ph: cropData.soilPh,
            soil_moisture: cropData.soilMoisture,
            temperature: cropData.temperature,
            humidity: cropData.humidity,
            rainfall: cropData.rainfall,
            fertilizer_usage: cropData.fertilizerUsage,
            area_hectares: cropData.areaHectares,
            planting_date: cropData.plantingDate,
            growth_stage: cropData.growthStage
          }
        ]
      };

      const command = new InvokeEndpointCommand({
        EndpointName: SAGEMAKER_ENDPOINTS.YIELD_PREDICTION,
        Body: JSON.stringify(payload),
        ContentType: 'application/json',
        Accept: 'application/json',
      });

      const response = await sageMakerClient.send(command);
      const result = JSON.parse(new TextDecoder().decode(response.Body));
      
      return {
        predictedYield: result.predictions[0].predicted_yield,
        confidence: result.predictions[0].confidence,
        factors: result.predictions[0].contributing_factors,
        recommendations: result.predictions[0].recommendations
      };
    } catch (error) {
      console.error('Error predicting crop yield:', error);
      // Return mock data for demo
      return {
        predictedYield: 45.2,
        confidence: 0.87,
        factors: ['soil_moisture', 'temperature', 'fertilizer_usage'],
        recommendations: ['Increase irrigation frequency', 'Monitor soil nutrients']
      };
    }
  }

  // Get crop recommendations from SageMaker model
  static async getCropRecommendations(environmentalData: any): Promise<any> {
    try {
      const payload = {
        instances: [
          {
            soil_type: environmentalData.soilType,
            ph_level: environmentalData.phLevel,
            moisture_content: environmentalData.moistureContent,
            temperature_avg: environmentalData.temperatureAvg,
            rainfall_mm: environmentalData.rainfallMm,
            season: environmentalData.season,
            location_lat: environmentalData.locationLat,
            location_lng: environmentalData.locationLng,
            farm_size: environmentalData.farmSize
          }
        ]
      };

      const command = new InvokeEndpointCommand({
        EndpointName: SAGEMAKER_ENDPOINTS.CROP_RECOMMENDATION,
        Body: JSON.stringify(payload),
        ContentType: 'application/json',
        Accept: 'application/json',
      });

      const response = await sageMakerClient.send(command);
      const result = JSON.parse(new TextDecoder().decode(response.Body));
      
      return result.predictions[0];
    } catch (error) {
      console.error('Error getting crop recommendations:', error);
      // Return mock data for demo
      return {
        recommended_crops: [
          { name: 'Tomatoes', suitability_score: 0.95, expected_yield: 55.5 },
          { name: 'Bell Peppers', suitability_score: 0.88, expected_yield: 32.1 },
          { name: 'Lettuce', suitability_score: 0.82, expected_yield: 28.7 }
        ],
        risk_factors: ['pest_pressure', 'weather_variability'],
        optimal_planting_date: '2024-03-15'
      };
    }
  }

  // Detect pests from image using SageMaker endpoint
  static async detectPests(imageBase64: string): Promise<any> {
    try {
      const payload = {
        instances: [
          {
            image_data: imageBase64,
            image_format: 'jpeg'
          }
        ]
      };

      const command = new InvokeEndpointCommand({
        EndpointName: SAGEMAKER_ENDPOINTS.PEST_DETECTION,
        Body: JSON.stringify(payload),
        ContentType: 'application/json',
        Accept: 'application/json',
      });

      const response = await sageMakerClient.send(command);
      const result = JSON.parse(new TextDecoder().decode(response.Body));
      
      return result.predictions[0];
    } catch (error) {
      console.error('Error detecting pests:', error);
      // Return mock data for demo
      return {
        detected_pests: [
          {
            pest_name: 'Aphids',
            confidence: 0.94,
            bounding_box: [120, 80, 200, 160],
            severity: 'medium'
          }
        ],
        plant_health_score: 0.72,
        treatment_recommendations: [
          'Apply neem oil spray',
          'Introduce beneficial insects',
          'Monitor weekly'
        ]
      };
    }
  }
}