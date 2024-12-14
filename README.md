# Ticketing Web App

Ticketing Web App is a comprehensive solution for managing ticketing systems. This project includes a user-facing web application, a back-end API, and an admin panel for system management. It is built with modern technologies to ensure scalability, maintainability, and a smooth user experience.

## Live Demo

The application is deployed and accessible at: [Ticketing Web App](https://sandbox2.panemu.com/ticketing/)

---

## Features

### User App
- Built with **Vue.js 3** and styled with **Tailwind CSS**.
- Dynamic ticket generation with **JSBarcode**.
- PDF generation for tickets using **html2pdf.js**.
- User authentication with **Google OAuth** via **vue3-google-login**.
- Toast notifications using **Vue Toastification**.
- SEO-friendly routing with **Vite Plugin Sitemap**.

### Admin Panel
- Built with **Angular 18** and styled with **Tailwind CSS**.
- Interactive charts and data visualization with **ng2-charts**.
- Custom table component support via **ngx-panemu-table**.
- Modular and reactive design for enhanced performance.

### Back-End
- Built with **Laravel 11**.
- RESTful API development with **Sanctum** for authentication.
- **MySQL** for database management.
- Image handling using **Intervention Image**.
- Integration with payment gateways via **Xendit PHP**.
- Google API integration for various services.

---

## Tech Stack

### Front-End
- **Vue.js 3**: Core framework for the user-facing application.
- **Tailwind CSS**: For rapid and responsive UI design.
- **Angular 18**: Framework for the admin panel.

### Back-End
- **Laravel 11**: Robust back-end framework.
- **MySQL**: Relational database for managing application data.

---

## Dependencies

### Vue.js Dependencies
- **@fortawesome/fontawesome-svg-core**: FontAwesome icons.
- **axios**: HTTP client.
- **html2pdf.js**: PDF generation.
- **pinia**: State management.
- **vue-router**: Client-side routing.
- **vue-toastification**: Notifications.

### Laravel Dependencies
- **laravel/sanctum**: API authentication.
- **laravel/socialite**: Social authentication.
- **guzzlehttp/guzzle**: HTTP client.
- **xendit/xendit-php**: Payment gateway integration.

### Angular Dependencies
- **ng2-charts**: Charts and data visualization.
- **ngx-panemu-table**: Custom table component.

---

## Installation

### Prerequisites
- **Node.js** (v16+)
- **PHP** (v8.2+)
- **MySQL**
- **Composer**
- **npm** or **yarn**

### Steps

#### Front-End (User App)
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd ticketing-vue
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

#### Admin Panel
1. Navigate to the Angular admin directory:
   ```bash
   cd ticketing-angular-admin
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the Angular development server:
   ```bash
   npm start
   ```

#### Back-End
1. Navigate to the Laravel back-end directory:
   ```bash
   cd ticketing-laravel
   ```
2. Install dependencies:
   ```bash
   composer install
   ```
3. Configure `.env` file for database and other settings.
4. Run migrations:
   ```bash
   php artisan migrate
   ```
5. Start the server:
   ```bash
   php artisan serve
   ```

---

## Contributions

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add feature name"
   ```
4. Push to the branch:
   ```bash
   git push origin feature-name
   ```
5. Create a pull request.

---

## License

This project is licensed under the [MIT License](LICENSE). 
