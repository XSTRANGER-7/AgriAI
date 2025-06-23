import { InvokeModelCommand } from '@aws-sdk/client-bedrock-runtime';
import { bedrockClient, BEDROCK_MODELS } from './awsConfig';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export class BedrockService {
  // Chat with Claude for farming advice
  static async chatWithClaude(messages: ChatMessage[], context?: string): Promise<string> {
    try {
      const systemPrompt = `You are AgriAI, an expert agricultural advisor with deep knowledge of farming, crop management, pest control, soil science, and sustainable agriculture practices. 
      
      ${context ? `Current context: ${context}` : ''}
      
      Provide practical, actionable advice based on scientific agricultural principles. Always consider:
      - Sustainable farming practices
      - Local climate and soil conditions
      - Economic viability for farmers
      - Environmental impact
      - Safety considerations
      
      Keep responses concise but comprehensive, and always prioritize farmer safety and crop health.`;

      const prompt = messages.map(msg => `${msg.role === 'user' ? 'Human' : 'Assistant'}: ${msg.content}`).join('\n\n');
      
      const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [
          {
            role: "user",
            content: prompt
          }
        ]
      };

      const command = new InvokeModelCommand({
        modelId: BEDROCK_MODELS.CLAUDE,
        body: JSON.stringify(payload),
        contentType: 'application/json',
        accept: 'application/json',
      });

      const response = await bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      return responseBody.content[0].text;
    } catch (error) {
      console.error('Error calling Bedrock Claude:', error);
      return 'I apologize, but I\'m having trouble connecting to the AI service right now. Please try again later.';
    }
  }

  // Generate crop recommendations using Titan
  static async generateCropRecommendations(soilData: any, weatherData: any, location: string): Promise<any> {
    try {
      const prompt = `Based on the following agricultural data, provide detailed crop recommendations:

Soil Data:
- Type: ${soilData.type}
- pH: ${soilData.ph}
- Moisture: ${soilData.moisture}%
- Nutrients: ${JSON.stringify(soilData.nutrients)}

Weather Data:
- Temperature: ${weatherData.temperature}°C
- Humidity: ${weatherData.humidity}%
- Rainfall: ${weatherData.rainfall}mm
- Season: ${weatherData.season}

Location: ${location}

Please provide:
1. Top 5 recommended crops with suitability scores (0-100)
2. Expected yield estimates
3. Planting timeline
4. Specific care instructions
5. Market potential and pricing

Format the response as a structured JSON object.`;

      const payload = {
        inputText: prompt,
        textGenerationConfig: {
          maxTokenCount: 2000,
          temperature: 0.3,
          topP: 0.9,
        }
      };

      const command = new InvokeModelCommand({
        modelId: BEDROCK_MODELS.TITAN_TEXT,
        body: JSON.stringify(payload),
        contentType: 'application/json',
        accept: 'application/json',
      });

      const response = await bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      // Parse the generated text to extract structured recommendations
      const generatedText = responseBody.results[0].outputText;
      
      // For demo purposes, return structured data
      // In production, you'd parse the AI response more carefully
      return {
        recommendations: [
          {
            crop: 'Tomatoes',
            suitability: 95,
            expectedYield: '45-60 tons/ha',
            plantingTime: 'March-April',
            harvestTime: '90-120 days',
            marketPrice: '$4.50/kg',
            careInstructions: generatedText.substring(0, 200) + '...'
          },
          {
            crop: 'Bell Peppers',
            suitability: 88,
            expectedYield: '25-35 tons/ha',
            plantingTime: 'April-May',
            harvestTime: '80-100 days',
            marketPrice: '$6.20/kg',
            careInstructions: generatedText.substring(200, 400) + '...'
          }
        ],
        aiInsights: generatedText
      };
    } catch (error) {
      console.error('Error generating crop recommendations:', error);
      throw error;
    }
  }

  // Analyze pest images and provide identification
  static async analyzePestImage(imageBase64: string, cropType: string): Promise<any> {
    try {
      const prompt = `Analyze this crop image for pest identification:

Crop Type: ${cropType}
Image: [Base64 image data provided]

Please identify:
1. Any pests or diseases visible
2. Severity level (Low/Medium/High)
3. Confidence score (0-100%)
4. Treatment recommendations
5. Prevention strategies
6. Expected damage if untreated

Provide detailed analysis in JSON format.`;

      const payload = {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1500,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: prompt
              },
              {
                type: "image",
                source: {
                  type: "base64",
                  media_type: "image/jpeg",
                  data: imageBase64
                }
              }
            ]
          }
        ]
      };

      const command = new InvokeModelCommand({
        modelId: BEDROCK_MODELS.CLAUDE,
        body: JSON.stringify(payload),
        contentType: 'application/json',
        accept: 'application/json',
      });

      const response = await bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      // For demo purposes, return structured pest analysis
      return {
        pestIdentified: 'Aphids',
        confidence: 94,
        severity: 'Medium',
        description: 'Green peach aphids detected on leaf surface',
        treatment: [
          'Apply neem oil spray in early morning or evening',
          'Introduce beneficial insects like ladybugs',
          'Monitor plant weekly for re-infestation'
        ],
        prevention: [
          'Maintain proper plant spacing',
          'Regular inspection of plants',
          'Use companion planting strategies'
        ],
        aiAnalysis: responseBody.content[0].text
      };
    } catch (error) {
      console.error('Error analyzing pest image:', error);
      throw error;
    }
  }

  // Generate weekly farm reports
  static async generateWeeklyReport(farmData: any): Promise<string> {
    try {
      const prompt = `Generate a comprehensive weekly farm report based on the following data:

Farm Metrics:
- Total Yield: ${farmData.totalYield}
- Revenue: ${farmData.revenue}
- Expenses: ${farmData.expenses}
- Crop Health Scores: ${JSON.stringify(farmData.cropHealth)}
- Weather Conditions: ${JSON.stringify(farmData.weather)}
- Pest Detections: ${farmData.pestDetections}
- Irrigation Data: ${JSON.stringify(farmData.irrigation)}

Please provide:
1. Executive Summary
2. Key Performance Indicators
3. Crop-specific analysis
4. Environmental impact assessment
5. Recommendations for next week
6. Risk factors and mitigation strategies
7. Market insights and pricing trends

Format as a professional agricultural report.`;

      const payload = {
        inputText: prompt,
        textGenerationConfig: {
          maxTokenCount: 3000,
          temperature: 0.2,
          topP: 0.8,
        }
      };

      const command = new InvokeModelCommand({
        modelId: BEDROCK_MODELS.TITAN_TEXT,
        body: JSON.stringify(payload),
        contentType: 'application/json',
        accept: 'application/json',
      });

      const response = await bedrockClient.send(command);
      const responseBody = JSON.parse(new TextDecoder().decode(response.body));
      
      return responseBody.results[0].outputText;
    } catch (error) {
      console.error('Error generating weekly report:', error);
      throw error;
    }
  }
}