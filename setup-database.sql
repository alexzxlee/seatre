-- Create new database for Seatre project
CREATE DATABASE IF NOT EXISTS seatre 
CHARACTER SET utf8mb4 
COLLATE utf8mb4_unicode_ci;

-- Grant permissions (adjust username as needed)
GRANT ALL PRIVILEGES ON seatre.* TO 'root'@'localhost';
FLUSH PRIVILEGES;

-- Use the new database
USE seatre;

-- The tables will be created automatically by Sequelize when you start the server
-- No need to manually create tables - Sequelize will handle this with the sync() call