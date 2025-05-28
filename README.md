# Laravel Mikrotik ISP Billing System

A web-based application built with Laravel 12, React, and Inertia.js to manage Mikrotik routers and related ISP billing functionalities.

## Features

*   **Mikrotik Router Management:**
    *   CRUD operations for managing router connection details.
    *   Real-time monitoring of router status, system resources, and network interfaces.
    *   Ability to restart routers and create backups via the RouterOS API.
    *   Secure storage of router credentials.
*   **User Management:** Basic structure for managing users, tickets, and leads.
*   **Finance Management:** Basic structure for managing packages, payments, vouchers, and expenses.
*   **Communication:** Basic structure for managing campaigns and SMS messages.
*   **Modern Frontend:** Built with React and Inertia.js for a dynamic user experience.
*   **Styling:** Utilizes Tailwind CSS for a responsive and modern UI.
*   **Authentication:** Includes standard Laravel authentication scaffolding.

## Technologies Used

*   Laravel 12
*   React
*   Inertia.js
*   Tailwind CSS
*   PHP 8.2+
*   Composer
*   npm / Yarn
*   `evilfreelancer/routeros-api-php` library

## Installation and Setup

Follow these steps to set up the project locally:

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd laravel-12-ui-isp-billing-system
    ```

2.  **Install Composer dependencies:**

    ```bash
    composer install
    ```

3.  **Install NPM dependencies and build assets:**

    ```bash
    npm install
    npm run dev
    # or
    # yarn install
    # yarn dev
    ```

4.  **Copy the environment file:**

    ```bash
    cp .env.example .env
    ```

5.  **Generate application key:**

    ```bash
    php artisan key:generate
    ```

6.  **Configure your database in the `.env` file:**

    ```dotenv
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=your_database_name
    DB_USERNAME=your_database_user
    DB_PASSWORD=your_database_password
    ```

7.  **Configure Mikrotik API details in the `.env` file:**

    ```dotenv
    # Example Mikrotik configuration
    MIKROTIK_HOST=your_mikrotik_ip
    MIKROTIK_PORT=8728 # or 8729 for SSL
    MIKROTIK_USERNAME=your_api_username
    MIKROTIK_PASSWORD=your_api_password
    ```

    *Note: Per-router credentials are stored in the database and used by the `MikrotikService`.* However, you might still use these `.env` variables for a default connection or initial setup if needed.* 

8.  **Run database migrations:**

    ```bash
    php artisan migrate
    ```

9. **Run the application:**

    ```bash
    php artisan serve
    ```

10. Access the application at `http://127.0.0.1:8000` (or the address shown in your terminal).

## Project Structure Overview

*   `app/Models/`: Eloquent models (Router, User, Ticket, Lead, Package, Payment, Voucher, Expense, Campaign, Sms).
*   `app/Http/Controllers/`: Laravel controllers handling requests and interacting with services/models.
*   `app/Services/`: `MikrotikService` for RouterOS API interactions.
*   `database/migrations/`: Database schema definitions.
*   `routes/web.php`: Web routes for the application.
*   `resources/js/`: Frontend React components and Inertia pages (`pages/routers`, `pages/Users`, `pages/Finance`, `pages/Communication`).
*   `resources/js/types/`: TypeScript type definitions.
*   `resources/views/`: Blade views (primarily for initial Inertia setup).

## Future Enhancements

*   Implement full CRUD for Users, Tickets, Leads, Packages, Payments, Vouchers, Expenses, Campaigns, and Sms.
*   Add detailed views and functionality for each section.
*   Implement real-time monitoring using WebSockets.
*   Enhance error handling and logging.
*   Add more specific Mikrotik API commands (e.g., Firewall rule management, DHCP server configuration, VPN management, Bandwidth monitoring).
*   Implement user roles and permissions.
*   Add comprehensive testing.
*   Improve UI/UX and add more detailed styling.

## Contributing

Feel free to fork the repository and contribute. Pull requests are welcome.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).