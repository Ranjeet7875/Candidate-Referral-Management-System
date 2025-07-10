# Candidate Referral Management System

A comprehensive full-stack web application for managing candidate referrals with user authentication, candidate tracking, and status management capabilities.

## 🚀 Features

### Authentication
- User registration and login system
- JWT token-based authentication
- Protected routes and session management

### Candidate Management
- **Add New Referrals**: Submit candidate information with resume upload
- **Dashboard Overview**: View all candidates with quick statistics
- **Status Tracking**: Track candidates through different stages (Pending, Reviewed, Hired)
- **Search & Filter**: Find candidates by name, job title, or status
- **Real-time Updates**: Update candidate status and delete records

### User Interface
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Clean, professional interface with gradient backgrounds
- **Interactive Elements**: Hover effects, focus states, and smooth transitions
- **Real-time Notifications**: Success and error messages for user actions

## 🛠️ Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **React Router** - Client-side routing
- **CSS3** - Modern styling with gradients and animations
- **Fetch API** - HTTP requests to backend

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **JWT** - JSON Web Tokens for authentication
- **Multer** - File upload handling (for resumes)

## 📁 Project Structure

```
candidate-referral-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── CandidateCard.js
│   │   │   ├── ReferralDashboard.js
│   │   │   └── ReferralForm.js
│   │   ├── pages/
│   │   │   ├── Dashboard.js
│   │   │   ├── Login.js
│   │   │   └── Signup.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── public/
├── backend/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   └── server.js
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/candidate-referral-system.git
cd candidate-referral-system
```

2. **Install Frontend Dependencies**
```bash
cd frontend
npm install
```

3. **Install Backend Dependencies**
```bash
cd ../backend
npm install
```

4. **Environment Variables**
Create a `.env` file in the backend directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/candidate-referral-db
JWT_SECRET=your-secret-key-here
```

5. **Start the Application**

Backend (Terminal 1):
```bash
cd backend
npm start
```

Frontend (Terminal 2):
```bash
cd frontend
npm start
```

The application will be available at `http://localhost:3000`

## 📊 API Endpoints

### Authentication
- `POST /user/signup` - User registration
- `POST /user/login` - User login

### Candidates
- `GET /referral/candidates` - Get all candidates
- `POST /referral/candidates` - Add new candidate
- `PUT /referral/candidates/:id/status` - Update candidate status
- `DELETE /referral/candidates/:id` - Delete candidate

## 🎯 Usage

### For Recruiters/HR Personnel

1. **Sign Up**: Create a new account with your email and password
2. **Login**: Access your personalized dashboard
3. **Add Referrals**: Submit candidate information including:
   - Full name and contact details
   - Job title they're applying for
   - Resume upload (PDF format)
   - Initial status
4. **Track Progress**: Monitor candidates through different stages
5. **Manage Candidates**: Update status, search, filter, and delete as needed

### Dashboard Features

- **Quick Stats**: Overview of total candidates, hired, reviewed, and pending
- **Search Bar**: Find candidates by name
- **Filters**: Filter by job title and status
- **Candidate Cards**: Individual cards showing candidate details with action buttons

## 🔧 Configuration

### Database Schema

**User Collection:**
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

**Candidate Collection:**
```javascript
{
  CandidateName: String,
  Email: String,
  PhoneNumber: String,
  JobTitle: String,
  Status: String (pending/reviewed/hired),
  ResumeURL: String,
  createdAt: Date,
  updatedAt: Date
}
```

## 🎨 Styling

The application uses a modern design approach with:
- Gradient backgrounds
- Card-based layouts
- Responsive design patterns
- Hover and focus effects
- Status-based color coding

## 🔐 Security Features

- Password hashing using bcrypt
- JWT token authentication
- Protected API routes
- Input validation and sanitization
- File upload restrictions (PDF only)

## 📱 Mobile Responsiveness

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones

## 🚀 Deployment

### Frontend (Netlify/Vercel)
```bash
cd frontend
npm run build
# Deploy the build folder
```

### Backend (Heroku/Railway)
```bash
cd backend
# Add your deployment configuration
git push heroku main
```

### Current Deployment
- Backend: `https://candidate-referral-management-system-m5yq.onrender.com`
- Frontend: Deploy to your preferred platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Known Issues

- File upload currently stores path reference only (implement cloud storage for production)
- No email notifications for status changes
- Limited to PDF resume uploads

## 🔮 Future Enhancements

- [ ] Email notifications for status changes
- [ ] Advanced search with multiple criteria
- [ ] Candidate profile pages with detailed information
- [ ] Interview scheduling integration
- [ ] Analytics dashboard with charts
- [ ] Export functionality (CSV/Excel)
- [ ] Role-based access control
- [ ] Cloud storage integration for resumes
- [ ] Real-time updates using WebSockets

## 💬 Support

For support, email your-email@example.com or create an issue in the GitHub repository.

## 🙏 Acknowledgments

- React.js community for excellent documentation
- MongoDB for flexible database solutions
- All contributors and testers

---

**Built with ❤️ for efficient candidate referral management**
