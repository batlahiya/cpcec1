export interface ConversationStep {
  id: string;
  message: string;
  suggestions?: string[];
  nextSteps?: { [key: string]: string };
  action?: () => void;
  isEnd?: boolean;
}

export interface ConversationFlow {
  id: string;
  name: string;
  description: string;
  steps: ConversationStep[];
}

export const conversationFlows: ConversationFlow[] = [
  // Parking Flow
  {
    id: 'parking',
    name: 'Find Parking',
    description: 'Complete parking assistance flow',
    steps: [
      {
        id: 'parking_1',
        message: "I'd be happy to help you find parking! 🚗 Are you looking for parking near a specific location, or would you like me to show you all available spots?",
        suggestions: ['Near a specific location', 'Show all available spots', 'I need handicap accessible', 'Looking for EV charging']
      },
      {
        id: 'parking_2',
        message: "Great choice! Let me show you the available parking options. I can see we have several locations with different amenities. What's most important to you - price, location, or specific features?",
        suggestions: ['Price is most important', 'Location convenience', 'Need specific features', 'Show me everything']
      },
      {
        id: 'parking_3',
        message: "Perfect! I've found some excellent options for you. Here's what I can see: we have covered parking, open-air spots, and premium locations. Would you like me to show you the live map with real-time availability?",
        suggestions: ['Yes, show the map', 'Tell me about pricing', 'What about security?', 'Any special offers?']
      },
      {
        id: 'parking_4',
        message: "Excellent! I'm pulling up the interactive map now. You can see all available spots in real-time, and I'll highlight the ones that match your preferences. Would you like me to reserve a spot for you?",
        suggestions: ['Yes, reserve a spot', 'Let me browse first', 'What about payment?', 'How long can I park?']
      },
      {
        id: 'parking_5',
        message: "I can help you with that! Our smart parking system offers flexible options - hourly, daily, or even monthly passes. What duration works best for your visit?",
        suggestions: ['Just a few hours', 'Full day parking', 'Multiple days', 'Tell me about monthly passes']
      },
      {
        id: 'parking_6',
        message: "Perfect! I can see you're interested in [duration]. The system shows great availability right now. Would you like me to set up automatic payment, or would you prefer to pay when you arrive?",
        suggestions: ['Set up automatic payment', 'Pay when I arrive', 'What payment methods?', 'Any discounts available?']
      },
      {
        id: 'parking_7',
        message: "Great! I can process payments through our secure quantum payment system. We accept all major cards, digital wallets, and even cryptocurrency. Any specific payment method you prefer?",
        suggestions: ['Credit card', 'Digital wallet', 'Cryptocurrency', 'Corporate account']
      },
      {
        id: 'parking_8',
        message: "Excellent choice! Your payment method is set up. Now, would you like me to send you directions to your reserved spot, or would you prefer to receive a QR code for easy access?",
        suggestions: ['Send directions', 'QR code please', 'Both would be great', 'What about navigation?']
      },
      {
        id: 'parking_9',
        message: "Perfect! I'm sending you everything you need. You'll receive directions, a QR code, and even real-time updates if there are any changes. Is there anything else I can help you with for your visit?",
        suggestions: ['Help with other services', 'Restaurant recommendations', 'Event information', "That's all, thank you!"]
      },
      {
        id: 'parking_10',
        message: "Wonderful! Your parking is all set up. You're all set for a great visit to Port City! 🎉 Feel free to ask me anything else - I'm here to help make your experience amazing!",
        isEnd: true
      }
    ]
  },

  // Reservation Flow
  {
    id: 'reservation',
    name: 'Book a Reservation',
    description: 'Complete reservation booking flow',
    steps: [
      {
        id: 'reservation_1',
        message: "I'd love to help you make a reservation! 🍽️ What type of experience are you looking for today? We have amazing restaurants, luxury hotels, relaxing spas, exciting events, and entertainment venues.",
        suggestions: ['Restaurant', 'Hotel', 'Spa & Wellness', 'Event', 'Entertainment']
      },
      {
        id: 'reservation_2',
        message: "Excellent choice! I can see you're interested in [type]. We have some fantastic options available. What kind of atmosphere or experience are you hoping for?",
        suggestions: ['Romantic dinner', 'Business meeting', 'Family gathering', 'Special celebration', 'Casual dining']
      },
      {
        id: 'reservation_3',
        message: "Perfect! I have some wonderful venues that would be ideal for [occasion]. Are you looking for something with a particular view, cuisine type, or special features?",
        suggestions: ['Harbor view', 'Specific cuisine', 'Private dining', 'Live music', 'Outdoor seating']
      },
      {
        id: 'reservation_4',
        message: "Great! I've found some amazing options that match your preferences. Let me show you our top recommendations with their unique features and availability. Which one catches your eye?",
        suggestions: ['Show me the options', 'Tell me about pricing', 'What about reviews?', 'Any special packages?']
      },
      {
        id: 'reservation_5',
        message: "I'm excited to show you these venues! Each one has something special - from molecular gastronomy to AI-powered service. What date are you thinking for your reservation?",
        suggestions: ['Today', 'This weekend', 'Next week', 'Specific date', 'Flexible timing']
      },
      {
        id: 'reservation_6',
        message: "Perfect timing! I can see great availability for [date]. What time would work best for you? I can show you the available time slots and any special events happening.",
        suggestions: ['Early evening', 'Late dinner', 'Lunch time', 'Show me all times', 'What about brunch?']
      },
      {
        id: 'reservation_7',
        message: "Excellent! [Time] is a wonderful choice. How many people will be joining you? I want to make sure I find the perfect table or space for your group.",
        suggestions: ['Just me', 'Two people', 'Small group (3-4)', 'Large group (5+)', 'Corporate event']
      },
      {
        id: 'reservation_8',
        message: "Perfect! I have the ideal setup for [number] people. Do you have any special dietary requirements, accessibility needs, or special requests I should know about?",
        suggestions: ['Dietary restrictions', 'Accessibility needs', 'Special occasion', 'No special needs', 'Tell me about options']
      },
      {
        id: 'reservation_9',
        message: "Wonderful! I've noted all your preferences. Your reservation is almost ready! Would you like me to send you a confirmation with all the details, or would you like to add anything else?",
        suggestions: ['Send confirmation', 'Add more details', 'What about cancellation?', 'Any special instructions?']
      },
      {
        id: 'reservation_10',
        message: "Fantastic! Your reservation is confirmed! 🎉 You'll receive all the details via our quantum communication system. I'm so excited for you to experience this amazing venue!",
        isEnd: true
      }
    ]
  },

  // Shopping Flow
  {
    id: 'shopping',
    name: 'Shop & Order',
    description: 'Complete shopping and ordering flow',
    steps: [
      {
        id: 'shopping_1',
        message: "Welcome to our quantum shopping experience! 🛍️ I'm here to help you find exactly what you need. What type of products are you looking for today?",
        suggestions: ['Electronics', 'Fashion', 'Home & Living', 'Browse everything', 'Looking for something specific']
      },
      {
        id: 'shopping_2',
        message: "Great choice! I can see you're interested in [category]. We have some amazing futuristic products in that category. Are you looking for something for yourself or as a gift?",
        suggestions: ['For myself', 'Gift for someone', 'Business purchase', 'Just browsing', 'Need recommendations']
      },
      {
        id: 'shopping_3',
        message: "Perfect! I love helping with [purpose]! What's your budget range? I want to make sure I show you the best options that fit your needs perfectly.",
        suggestions: ['Under $100', '$100-500', '$500-1000', 'Premium range', 'Flexible budget']
      },
      {
        id: 'shopping_4',
        message: "Excellent! I have some fantastic options in that range. Are there any specific features or brands you're particularly interested in? I can also show you our most popular items.",
        suggestions: ['Show popular items', 'Specific features', 'Brand preferences', 'Latest technology', 'Best value options']
      },
      {
        id: 'shopping_5',
        message: "Wonderful! I've curated some amazing products just for you. Each one has unique features and great reviews. Would you like me to show you detailed information about any of these?",
        suggestions: ['Show me details', 'Compare products', 'Read reviews', 'Check availability', 'See similar items']
      },
      {
        id: 'shopping_6',
        message: "I'm excited to show you these products! They're all in stock and ready to ship. Would you like to add any of these to your quantum shopping cart?",
        suggestions: ['Add to cart', 'Save for later', 'Share with someone', 'Need more info', 'Check other options']
      },
      {
        id: 'shopping_7',
        message: "Perfect! I've added that to your cart. The quantum shopping cart is amazing - it can hold items from different stores and even suggest complementary products. Would you like to see what else might interest you?",
        suggestions: ['Show suggestions', 'View my cart', 'Continue shopping', 'Ready to checkout', 'Remove items']
      },
      {
        id: 'shopping_8',
        message: "Great! Your cart is looking fantastic! We have some amazing shipping options - same-day delivery, quantum express, or standard shipping. What works best for you?",
        suggestions: ['Same-day delivery', 'Quantum express', 'Standard shipping', 'Pick up in store', 'Tell me about options']
      },
      {
        id: 'shopping_9',
        message: "Excellent choice! Your order is almost ready. Would you like to set up payment now, or would you prefer to review everything first? I can also apply any available discounts.",
        suggestions: ['Set up payment', 'Review order', 'Apply discounts', 'Check promotions', 'Ready to pay']
      },
      {
        id: 'shopping_10',
        message: "Fantastic! Your quantum order is complete! 🎉 You'll receive real-time updates and everything will be delivered with our signature quantum precision. Thank you for choosing Port City!",
        isEnd: true
      }
    ]
  },

  // Investor Services Flow
  {
    id: 'investor',
    name: 'Investor Services',
    description: 'Complete investor services flow',
    steps: [
      {
        id: 'investor_1',
        message: "Welcome to our comprehensive investor services hub! 💼 I'm here to help you with all your business and investment needs. What type of service are you looking for today?",
        suggestions: ['Banking services', 'Investment advice', 'Legal services', 'Tax consultation', 'Real estate', 'Insurance']
      },
      {
        id: 'investor_2',
        message: "Excellent choice! [Service] is one of our specialties. Are you looking to start something new, or do you need assistance with an existing business or investment?",
        suggestions: ['Starting new business', 'Existing business', 'Personal investment', 'Corporate needs', 'Not sure yet']
      },
      {
        id: 'investor_3',
        message: "Perfect! I can definitely help with [situation]. What's your current situation - are you just exploring options, or do you have specific goals and timelines in mind?",
        suggestions: ['Just exploring', 'Have specific goals', 'Need urgent help', 'Planning for future', 'Want to learn more']
      },
      {
        id: 'investor_4',
        message: "Great! I have some excellent options for [situation]. Our quantum-powered system can match you with the perfect service providers. What's your preferred timeline for getting started?",
        suggestions: ['As soon as possible', 'Within a month', 'Next few months', 'Flexible timing', 'Need to plan first']
      },
      {
        id: 'investor_5',
        message: "Perfect timing! I can see some great opportunities for [timeline]. Do you have any specific requirements or preferences for the service provider? I can match you with the best options.",
        suggestions: ['Local providers', 'Online services', 'Premium providers', 'Budget-friendly', 'Show me all options']
      },
      {
        id: 'investor_6',
        message: "Excellent! I've found some fantastic matches for your needs. Each provider has different specialties and approaches. Would you like me to show you detailed information about each option?",
        suggestions: ['Show me details', 'Compare providers', 'Read reviews', 'Check credentials', 'Schedule consultation']
      },
      {
        id: 'investor_7',
        message: "Wonderful! I'm excited to show you these options. Each one has unique strengths and can provide exactly what you need. Would you like to start the application process for any of these services?",
        suggestions: ['Start application', 'Need more info', 'Compare costs', 'Check requirements', 'Schedule meeting']
      },
      {
        id: 'investor_8',
        message: "Perfect! I can help you with the application process. Our quantum system makes it super easy - I can guide you through document submission, requirements, and even help with paperwork. Ready to get started?",
        suggestions: ['Yes, let\'s start', 'What documents needed?', 'How long does it take?', 'What are the costs?', 'Need to prepare first']
      },
      {
        id: 'investor_9',
        message: "Fantastic! I'm setting up your application now. You'll be able to upload documents, track progress, and get real-time updates. Is there anything specific you'd like me to explain about the process?",
        suggestions: ['Explain the process', 'Show me the portal', 'What happens next?', 'How to track progress?', 'Ready to proceed']
      },
      {
        id: 'investor_10',
        message: "Excellent! Your application is set up and ready to go! 🎉 You'll receive all the details and can start uploading documents immediately. I'm here to help every step of the way!",
        isEnd: true
      }
    ]
  },

  // Weather Flow
  {
    id: 'weather',
    name: 'Weather Info',
    description: 'Complete weather information flow',
    steps: [
      {
        id: 'weather_1',
        message: "I'd be happy to help you with weather information! 🌤️ Are you looking for current conditions, a forecast, or something specific about the weather in Port City?",
        suggestions: ['Current weather', 'Today\'s forecast', 'Week forecast', 'Weather alerts', 'Best time to visit']
      },
      {
        id: 'weather_2',
        message: "Perfect! I can see you're interested in [weather_type]. The weather in Port City is quite pleasant today! Are you planning any outdoor activities or just checking general conditions?",
        suggestions: ['Outdoor activities', 'Just checking', 'Planning a trip', 'Concerned about weather', 'Need detailed info']
      },
      {
        id: 'weather_3',
        message: "Great! For [activity], the current conditions are ideal! The temperature is perfect and there's a gentle breeze. Would you like me to give you a detailed breakdown of the conditions?",
        suggestions: ['Yes, detailed breakdown', 'What about wind?', 'UV index?', 'Precipitation chance?', 'Hourly forecast?']
      },
      {
        id: 'weather_4',
        message: "Excellent! Here's what I can tell you: Temperature is perfect, humidity is comfortable, and visibility is excellent. Are you interested in how the weather might change throughout the day?",
        suggestions: ['Hourly changes', 'Afternoon forecast', 'Evening conditions', 'Tomorrow\'s outlook', 'Weekly trends']
      },
      {
        id: 'weather_5',
        message: "Perfect! I can see the weather will remain great for [timeframe]. Are there any specific weather factors that are important for your plans? I can give you detailed information about any aspect.",
        suggestions: ['Temperature details', 'Wind conditions', 'Precipitation info', 'Sunshine hours', 'All weather factors']
      },
      {
        id: 'weather_6',
        message: "Wonderful! I have all the details you need. The weather looks fantastic for your plans! Would you like me to set up weather alerts or reminders for any changes?",
        suggestions: ['Set up alerts', 'Weather reminders', 'Daily updates', 'No alerts needed', 'What about other locations?']
      },
      {
        id: 'weather_7',
        message: "Great! I can set up personalized weather alerts for you. You'll get notified about any significant changes. Is there anything else about the weather or your plans that I can help with?",
        suggestions: ['Help with plans', 'Other locations', 'Weather history', 'Seasonal info', 'That\'s all I need']
      },
      {
        id: 'weather_8',
        message: "Perfect! I'm here to help with all your weather needs. The conditions look great for whatever you have planned! Is there anything else I can assist you with today?",
        suggestions: ['Other services', 'More weather info', 'City information', 'That\'s everything', 'Thank you!']
      },
      {
        id: 'weather_9',
        message: "Excellent! I'm so glad I could help with the weather information. Port City has wonderful weather, and I hope you have a fantastic time! Feel free to ask me anything else!",
        suggestions: ['Ask about other things', 'City recommendations', 'Service information', 'That\'s all', 'You\'re amazing!']
      },
      {
        id: 'weather_10',
        message: "Thank you so much! 🌟 I'm thrilled to help make your Port City experience perfect! The weather looks great, and I'm here whenever you need assistance with anything else!",
        isEnd: true
      }
    ]
  }
];

export const getConversationFlow = (flowId: string): ConversationFlow | undefined => {
  return conversationFlows.find(flow => flow.id === flowId);
};

export const getNextStep = (flowId: string, currentStepId: string, response?: string): ConversationStep | undefined => {
  const flow = getConversationFlow(flowId);
  if (!flow) return undefined;

  const currentStep = flow.steps.find(step => step.id === currentStepId);
  if (!currentStep) return undefined;

  if (currentStep.isEnd) return undefined;

  // If there's a specific response mapping, use it
  if (currentStep.nextSteps && response) {
    const nextStepId = currentStep.nextSteps[response];
    if (nextStepId) {
      return flow.steps.find(step => step.id === nextStepId);
    }
  }

  // Otherwise, find the next step in sequence
  const currentIndex = flow.steps.findIndex(step => step.id === currentStepId);
  if (currentIndex < flow.steps.length - 1) {
    return flow.steps[currentIndex + 1];
  }

  return undefined;
};

