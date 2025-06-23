import { BedrockRuntimeClient } from '@aws-sdk/client-bedrock-runtime';
import { SageMakerRuntimeClient } from '@aws-sdk/client-sagemaker-runtime';
import { fromCognitoIdentityPool } from '@aws-sdk/credential-providers';

// AWS Configuration
const AWS_REGION = 'us-east-1';
const IDENTITY_POOL_ID = 'us-east-1:your-identity-pool-id'; // Replace with your Cognito Identity Pool ID

// Create credentials provider for unauthenticated access
const credentials = fromCognitoIdentityPool({
  region: AWS_REGION,
  identityPoolId: IDENTITY_POOL_ID,
});

// Initialize Bedrock Runtime Client
export const bedrockClient = new BedrockRuntimeClient({
  region: AWS_REGION,
  credentials,
});

// Initialize SageMaker Runtime Client
export const sageMakerClient = new SageMakerRuntimeClient({
  region: AWS_REGION,
  credentials,
});

// Model configurations
export const BEDROCK_MODELS = {
  CLAUDE: 'anthropic.claude-3-sonnet-20240229-v1:0',
  TITAN_TEXT: 'amazon.titan-text-express-v1',
  LLAMA: 'meta.llama2-70b-chat-v1',
};

export const SAGEMAKER_ENDPOINTS = {
  CROP_RECOMMENDATION: 'crop-recommendation-endpoint',
  PEST_DETECTION: 'pest-detection-endpoint',
  YIELD_PREDICTION: 'yield-prediction-endpoint',
};