# CRM Platform

A comprehensive CRM platform built featuring customer segmentation, campaign delivery, and AI-powered insights.


![image](https://github.com/user-attachments/assets/ef066d80-4648-40a8-8e13-70e211e04363)


## 🚀 Features

### 1. Data Ingestion APIs
- Secure REST APIs for customer and order data
- Comprehensive validation middleware
- Documentation with Swagger UI
- **Pub-sub architecture** using MongoDB for data persistence

### 2. Campaign Creation UI
- Interactive segment builder with flexible rule logic (AND/OR conditions)
- **Natural language to query conversion** using AI
- Dynamic audience preview before campaign creation
- Comprehensive campaign history tracking

### 3. Campaign Delivery & Logging
- Automated campaign delivery to segmented audiences
- Message personalization with customer data
- Vendor API integration with delivery simulation (90% success, 10% failure)
- Real-time delivery receipt processing
- Detailed communication logs

### 4. Authentication
- Google OAuth 2.0 integration
- Secure JWT token management
- Protected routes for authenticated users only

### 5. AI Integration
- Natural language to segment rules conversion
- AI-driven message suggestions based on campaign objectives
- Campaign performance summarization
- Smart rule generation with multimodel fallback strategy

## 🛠️ Tech Stack

### Frontend
- React.js with TypeScript
- Chakra UI for responsive design
- React Query Builder for segment creation
- Chart.js for data visualization
- Axios for API communication

### Backend
- Node.js with Express
- MongoDB for data storage
- JWT authentication + Google OAuth
- Express validator for input validation
- Google's Generative AI for AI features

### Development
- ESLint and Prettier for code quality
- Nodemon for development server
- Git for version control

## 📋 Architecture

The application follows a modular architecture with clean separation of concerns:

```
┌─────────────┐      ┌─────────────┐      ┌─────────────┐
│   Frontend  │◄────►│   Backend   │◄────►│  Database   │
│  React.js   │      │  Node.js    │      │  MongoDB    │
└─────────────┘      └─────────────┘      └─────────────┘
                           ▲
                           │
                     ┌─────┴─────┐
                     │    AI     │
                     │ Services  │
                     └───────────┘
```

### Key Design Patterns
- **MVC Pattern** for backend structure
- **Context API** for state management
- **Repository Pattern** for data access
- **Service Layer** for business logic

## 🌟 AI Features in Depth

The application integrates Google's Generative AI (Gemini API) to provide intelligent features that enhance the CRM experience:

### 1. Natural Language to Rules Conversion
Users can describe their target audience in plain English, such as:
- "Customers who spent more than $1000 and visited less than 3 times"
- "Inactive users who haven't made a purchase in 90 days"
- "High-value customers with more than 5 visits"

The AI converts these descriptions into precise segmentation rules with appropriate fields, operators, and values, making segment creation more intuitive.

### 2. Smart Message Generation
The platform generates personalized marketing messages based on:
- Campaign objectives and descriptions
- Target audience characteristics
- Best practices for engagement

Messages are tailored with personalization tokens (e.g., {{name}}) and appropriate calls to action.

### 3. Multi-model Fallback Strategy
To ensure reliability, the AI service attempts to use different models in order of preference:
1. `gemini-2.0-flash-lite` (fastest, most efficient)
2. `gemini-1.5-flash` (good balance of speed and quality)
3. `gemini-1.5-pro` (highest quality for complex prompts)

This ensures consistent service even if certain models have availability issues.

### 4. Error Handling & Fallbacks
The system gracefully handles AI service failures with:
- Appropriate error messages to users
- Fallback template responses for critical features
- Backend retry logic with exponential backoff

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or Atlas)
- Google Developer account for OAuth and Gemini API

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/xeno-crm.git
cd xeno-crm
```

2. Install backend dependencies
```bash
cd backend
npm install
```

3. Install frontend dependencies
```bash
cd ../frontend
npm install
```

4. Create a .env file in the backend directory with:
```
MONGODB_URI=mongodb://localhost:27017/xeno-crm
JWT_SECRET=your-jwt-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
CLIENT_URL=http://localhost:3000
GEMINI_API_KEY=your-gemini-api-key
```

5. Create a .env file in the frontend directory with:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
```

### Running the application

1. Start the backend server
```bash
cd backend
npm run dev
```

2. In a new terminal, start the frontend application
```bash
cd frontend
npm start
```

3. Visit http://localhost:3000 in your browser

## 📝 API Documentation

The API documentation is available at `http://localhost:5000/api-docs` when running the server locally.

### Key Endpoints:

- `POST /api/customers` - Create a new customer
- `POST /api/orders` - Create a new order
- `GET /api/campaigns` - List all campaigns
- `POST /api/campaigns` - Create a new campaign
- `POST /api/campaigns/:id/activate` - Activate a campaign
- `POST /api/ai/convert-rules` - Convert natural language to rules
- `POST /api/ai/generate-message` - Generate promotional message

## 🔒 Security

- Google OAuth for secure authentication
- JWT tokens with expiration
- Input validation on all endpoints
- Protected routes for authenticated users

## 🧪 Known Limitations

- The vendor API is simulated with a 90% success rate
- For demonstration purposes, campaign delivery is synchronous
- Limited to text-based messaging (no image attachments)

## 📱 Future Enhancements

- Mobile application
- Advanced analytics dashboard
- A/B testing for campaigns
- Multi-language support
- Email template designer

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- React Query Builder for the segment builder UI
- Chakra UI for the component library
- Google Generative AI for AI capabilities
