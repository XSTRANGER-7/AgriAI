import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Leaf, AlertCircle, CheckCircle, Lightbulb, Cpu } from 'lucide-react';
import { BedrockService, ChatMessage } from '../services/bedrockService';

interface Message extends ChatMessage {
  id: string;
  timestamp: Date;
  type?: 'info' | 'warning' | 'success' | 'tip';
  isLoading?: boolean;
}

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hello! I'm AgriAI, powered by Amazon Bedrock's Claude AI. I can help you with crop recommendations, pest identification, weather insights, and farming best practices. What would you like to know?",
      timestamp: new Date(),
      type: 'info'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickQuestions = [
    "What crops should I plant this season?",
    "How to identify pest problems?",
    "Best irrigation schedule for tomatoes?",
    "Soil pH management tips",
    "Weather impact on crops",
    "Organic farming techniques"
  ];

  const handleSendMessage = async () => {
    if (!inputText.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Add loading message
    const loadingMessage: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'Thinking...',
      timestamp: new Date(),
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);

    try {
      // Get conversation context
      const conversationHistory = messages
        .filter(msg => msg.role !== 'assistant' || !msg.isLoading)
        .slice(-5) // Last 5 messages for context
        .map(msg => ({ role: msg.role, content: msg.content }));

      // Add current user message
      conversationHistory.push({ role: 'user', content: inputText });

      // Get farm context (you can expand this with real farm data)
      const farmContext = `
        Current farm status:
        - Location: Temperate climate zone
        - Soil type: Loamy soil, pH 6.8
        - Current crops: Tomatoes (2.5ha), Wheat (5.0ha), Corn (3.2ha)
        - Season: Summer growing season
        - Recent weather: 24°C average, 68% soil moisture
        - IoT sensors: 12 active sensors monitoring soil and weather
      `;

      const response = await BedrockService.chatWithClaude(conversationHistory, farmContext);

      // Remove loading message and add AI response
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: response,
          timestamp: new Date(),
          type: 'info'
        }];
      });
    } catch (error) {
      console.error('Error getting AI response:', error);
      setMessages(prev => {
        const filtered = prev.filter(msg => !msg.isLoading);
        return [...filtered, {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: 'I apologize, but I\'m having trouble connecting to the AI service right now. Please check your AWS configuration and try again.',
          timestamp: new Date(),
          type: 'warning'
        }];
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (question: string) => {
    setInputText(question);
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-400" />;
      case 'success': return <CheckCircle className="h-4 w-4 text-green-400" />;
      case 'tip': return <Lightbulb className="h-4 w-4 text-blue-400" />;
      default: return <Cpu className="h-4 w-4 text-primary-400" />;
    }
  };

  return (
    <div className="min-h-screen pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center px-4 py-2 bg-primary-500/20 rounded-full text-primary-300 text-sm font-medium mb-4">
            <Cpu className="h-4 w-4 mr-2" />
            Powered by Amazon Bedrock Claude AI
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">AgriAI Chat Assistant</h1>
          <p className="text-xl text-gray-300">
            Get instant expert advice powered by AWS generative AI services
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-xl border border-white/20 overflow-hidden">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-transparent to-black/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex max-w-xs lg:max-w-md ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className={`flex-shrink-0 ${message.role === 'user' ? 'ml-3' : 'mr-3'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' 
                        ? 'bg-secondary-500/20' 
                        : 'bg-primary-500/20'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-secondary-400" />
                      ) : (
                        getMessageIcon(message.type)
                      )}
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-secondary-500/20 text-secondary-100'
                      : 'bg-white/10 text-white'
                  }`}>
                    <div className="text-sm">
                      {message.isLoading ? (
                        <div className="flex items-center">
                          <div className="animate-spin h-4 w-4 border-2 border-primary-400 border-t-transparent rounded-full mr-2"></div>
                          {message.content}
                        </div>
                      ) : (
                        message.content
                      )}
                    </div>
                    <div className="text-xs opacity-60 mt-1">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Questions */}
          <div className="px-6 py-4 border-t border-white/20">
            <h3 className="text-white font-medium mb-3">Quick Questions:</h3>
            <div className="flex flex-wrap gap-2">
              {quickQuestions.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleQuickQuestion(question)}
                  disabled={isTyping}
                  className="px-3 py-1 bg-white/10 text-gray-300 rounded-full text-sm hover:bg-white/20 transition-all duration-200 disabled:opacity-50"
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-6 border-t border-white/20">
            <div className="flex space-x-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask me anything about farming..."
                disabled={isTyping}
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-primary-400 focus:outline-none disabled:opacity-50"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="px-6 py-3 bg-gradient-to-r from-primary-500 to-primary-600 text-white rounded-lg hover:from-primary-600 hover:to-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* AI Capabilities */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <Cpu className="h-8 w-8 text-primary-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Amazon Bedrock</h3>
            <p className="text-gray-300 text-sm">Claude AI for intelligent farming conversations</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <AlertCircle className="h-8 w-8 text-yellow-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Real-time Analysis</h3>
            <p className="text-gray-300 text-sm">Instant solutions powered by AWS AI</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
            <Lightbulb className="h-8 w-8 text-blue-400 mx-auto mb-3" />
            <h3 className="text-white font-semibold mb-2">Smart Insights</h3>
            <p className="text-gray-300 text-sm">Data-driven recommendations from cloud AI</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;