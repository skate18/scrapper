# Use the official PHP image as the base
FROM php:8.2-fpm

# Install necessary extensions
RUN docker-php-ext-install mysqli pdo_mysql

# Set the working directory to /var/www/html
WORKDIR /var/www/html

# Copy the application code
COPY . /var/www/html

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN composer install

# Expose port 9000
EXPOSE 9000
