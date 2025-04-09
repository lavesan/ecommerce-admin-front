# E-commerce Admin Front

This is the administrative panel of an e-commerce system, developed with React, TypeScript, and Chakra UI.

## 🚀 Technologies Used

- React 18
- TypeScript
- Vite
- Chakra UI
- React Query
- React Hook Form
- React Router DOM
- Axios
- Yup (validation)
- Brazilian Utils (Brazilian utilities)
- Dinero.js (monetary value handling)
- Date-fns (date manipulation)

## 📋 Features

### Authentication

- User login
- Token management
- Route protection

### Enterprise Management

- Enterprise listing
- Enterprise creation and editing
- Detailed view

### Category Management

- Category listing by enterprise
- Category creation and editing
- Hierarchical organization

### Product Management

- Product listing by category
- Product creation and editing
- Image upload
- Stock management

### Order Management

- Order listing
- Detailed order view
- Status tracking

### Promotion Management

- Promotion listing
- Promotion creation and editing
- Discount application

### Customer Management

- Customer listing
- Customer creation and editing
- Order history by customer

### User Management

- User listing
- User creation and editing
- Permission control

### Additional Features

- Pagination
- Filters and search
- Form validation
- Input masks
- Monetary value handling
- Date formatting
- Image upload
- Freight calculation

## 🛠️ Installation and Execution

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
yarn install
```

3. Run the project in development mode

```bash
yarn dev
```

4. For production build

```bash
yarn build
```

## 📁 Project Structure

```
src/
├── assets/         # Static resources
├── components/     # Reusable components
├── config/         # Project configurations
├── constants/      # Constants and enums
├── containers/     # Pages and containers
├── context/        # React contexts
├── enums/          # System enums
├── helpers/        # Helper functions
├── hooks/          # Custom hooks
├── models/         # Types and interfaces
├── services/       # API services
└── theme/          # Theme configurations
```

## 🔒 Security

- JWT-based authentication
- Route protection
- Form validation
- Input sanitization

## 📱 Responsiveness

- Responsive design with Chakra UI
- Adaptation for different screen sizes

## 🔄 Integration

- RESTful API
- Error handling
- Automatic request retry
- Data caching with React Query

## 📈 Next Steps

- Test implementation
- Performance improvements
- New features as needed
