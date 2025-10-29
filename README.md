# E-Commerce Analytics Dashboard

A professional, responsive analytics dashboard for e-commerce platforms with role-based access, data editing capabilities, and comprehensive audit logging.

## 🚀 Features

### Core Functionality
- **Role-Based Access Control**: Admin, Analyst, and Viewer roles
- **KPI Dashboard**: Real-time metrics for Revenue, Average Order Value, and Conversion Rate
- **Interactive Charts**: Revenue trends, category breakdown, and performance analytics
- **Product Management**: Searchable, sortable product table with TanStack Table
- **Audit Logging**: Complete change history with before/after values
- **Data Export**: Mock CSV, PNG, and PDF export functionality

### Special Features
- **Hidden Admin Panel**: Secret access via `Ctrl+Shift+A` keyboard shortcut (Admin role only)
- **Live Data Editing**: Modify product information with preview and confirmation
- **Change Tracking**: All edits require a reason and are logged in the audit trail
- **Visual Indicators**: Clear notifications when unsaved changes exist
- **Theme Support**: Light/dark mode toggle

## 🛠️ Tech Stack

- **React 18** + **TypeScript**
- **Vite** - Build tool
- **TailwindCSS** - Styling
- **shadcn/ui** - UI components
- **Recharts** - Charts and data visualization
- **Zustand** - State management
- **TanStack Table** - Advanced table functionality
- **React Router** - Navigation

## 📦 Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd <project-directory>

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

## 🔐 Accessing the Dashboard

1. **Login Page**: Select your role (Admin, Analyst, or Viewer)
2. **Admin Access**: Choose "Admin" role to enable hidden features
3. **Hidden Admin Panel**: Press `Ctrl+Shift+A` in the dashboard to reveal the admin panel
4. **Navigation**: Use the sidebar to navigate between different sections

### User Roles

- **Admin**: Full access including the hidden admin panel for data editing
- **Analyst**: View analytics and reports (read-only)
- **Viewer**: Basic dashboard access (read-only)

## 🎨 Design System

The dashboard uses a professional color scheme with:
- Primary: Blue (professional analytics feel)
- Secondary: Indigo/purple (modern accents)
- Success: Green
- Warning: Orange
- Semantic HSL color tokens for consistency
- Gradient backgrounds for KPI cards
- Smooth animations and transitions

## 📊 Using the Admin Panel

1. **Access**: Login as Admin and press `Ctrl+Shift+A`
2. **Edit Data**: Modify any product field directly in the table
3. **Preview Changes**: See real-time updates in the dashboard
4. **Save Changes**: Click "Save Changes" and provide a reason
5. **Audit Trail**: All changes are logged in the Audit Log page

### Making Edits

- Edit product names, categories, prices, stock, sales, or conversion rates
- Changes are previewed in real-time
- A "Unsaved Changes" indicator appears in the header
- Confirm changes with a mandatory reason field
- Discard changes to revert to original data

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn UI components
│   ├── DashboardLayout.tsx  # Main layout with sidebar
│   ├── KPICard.tsx      # KPI metric cards
│   └── ExportButtons.tsx    # Export functionality
├── pages/
│   ├── Login.tsx        # Role selection
│   ├── Dashboard.tsx    # Main overview
│   ├── Products.tsx     # Product table
│   ├── Analytics.tsx    # Detailed analytics
│   ├── AuditLog.tsx     # Change history
│   └── AdminPanel.tsx   # Hidden admin panel
├── store/
│   └── dashboardStore.ts    # Zustand state management
├── App.tsx              # Route configuration
└── index.css            # Design system tokens
```

## 🧪 Testing

Run the test suite:

```bash
npm test
```

Key test areas:
- Component rendering
- State management
- Data flow
- User interactions

## 🔧 Configuration

### Environment Variables
No environment variables required - uses mock data

### Theme Customization
Edit `src/index.css` to modify:
- Color palette (HSL values)
- Gradients
- Shadows
- Border radius

## 📈 Mock Data

The dashboard uses generated mock data including:
- 10 sample products
- 30 days of revenue history
- Category breakdowns
- Conversion metrics

Data persists in memory during the session and resets on page reload.

## 🎥 Demo Flow

1. Open application → redirected to login
2. Select "Admin" role
3. Explore dashboard with KPI cards and charts
4. Navigate to Products page
5. View Analytics page for detailed insights
6. Press `Ctrl+Shift+A` to reveal admin panel
7. Make edits to product data
8. Save changes with a reason
9. Check Audit Log to see the change history
10. Export data in various formats

## 🚀 Deployment

Build for production:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

## 📝 License

This project is a demonstration/portfolio piece.

## 🤝 Contributing

This is a review project. Contributions are not expected but feedback is welcome!

---

Built with ❤️ using React, TypeScript, and modern web technologies.
