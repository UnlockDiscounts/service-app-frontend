# Mendora - Frontend  

A responsive React application for booking local services and connecting customers with service providers.

## Features

### For Customers
- **Service Discovery**: Browse a wide range of services with detailed listings.
- **Filtered Search**: Filter services by category and location.
- **Booking System**: Appointment scheduling with `Book Now` functionality.
- **Dashboard**: Manage bookings and view history.
- **Payments**: Payment verification via receipt upload.

### For Service Providers
- **Provider Dashboard**: Manage service listings and incoming bookings.
- **Service Management**: Create and update service offerings (`ServiceForm`).
- **Profile**: Customize provider profiles.

### Core Functionality
- **Role-Based Access**: Separate dashboards for Customers and Service Providers.
- **Authentication**: Secure Sign-up with OTP verification.
- **Maps Integration**: Location-based services using Leaflet and OpenStreetMap.
- **Responsive Design**: Optimized for all devices using Tailwind CSS.

## Tech Stack

- **Framework**: [React](https://react.dev/) (v19)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router](https://reactrouter.com/)
- **Maps**: [React Leaflet](https://react-leaflet.js.org/)
- **Icons**: [Lucide React](https://lucide.dev/) & [React Icons](https://react-icons.github.io/react-icons/)
- **HTTP Client**: [Axios](https://axios-http.com/)

## Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/UnlockDiscounts/service-app-frontend.git   
    cd service-app-frontend
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Run the application**
    ```bash
    npm start
    ```
    The app will open in your browser at `http://localhost:3000`.

> **Note:** This frontend is currently configured to connect to a live backend.

## Scripts

- `npm start`: Runs the app in development mode.
- `npm test`: Launches the test runner.
- `npm run build`: Builds the app for production.

## Project Structure

- `src/components`: Reusable UI components and page views.
- `src/assets`: Static assets like images and icons.
- `src/App.js`: Main application component and routing setup.
