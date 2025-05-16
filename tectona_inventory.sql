-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 12, 2025 at 06:05 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tectona_inventory`
--

-- --------------------------------------------------------

--
-- Table structure for table `categories`
--

CREATE TABLE `categories` (
  `categoryid` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `categories`
--

INSERT INTO `categories` (`categoryid`, `name`, `description`, `createdat`, `updatedat`) VALUES
(8, 'Growingstest', 'im going to add a category to help farmers\n', '2025-05-09 18:31:53', '2025-05-09 18:39:27'),
(9, 'Cellphones', 'about phones\n', '2025-05-09 18:35:13', '2025-05-09 18:35:13');

-- --------------------------------------------------------

--
-- Table structure for table `inventory`
--

CREATE TABLE `inventory` (
  `inventoryid` int(11) NOT NULL,
  `productid` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `inventory`
--

INSERT INTO `inventory` (`inventoryid`, `productid`, `quantity`, `createdat`, `updatedat`) VALUES
(8, 5, 2, '2025-05-09 18:34:21', '2025-05-09 18:37:21');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `productid` int(11) NOT NULL,
  `sku` varchar(50) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text DEFAULT NULL,
  `categoryid` int(11) DEFAULT NULL,
  `price` decimal(10,2) NOT NULL,
  `minimumStock` int(11) NOT NULL,
  `imageurl` varchar(255) DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `maximumStock` int(11) DEFAULT 1000
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`productid`, `sku`, `name`, `description`, `categoryid`, `price`, `minimumStock`, `imageurl`, `createdat`, `updatedat`, `maximumStock`) VALUES
(5, '?', 'Ricetest', NULL, 8, 100.00, 1, NULL, '2025-05-09 18:34:02', '2025-05-09 18:40:16', 100);

-- --------------------------------------------------------

--
-- Table structure for table `stockmovements`
--

CREATE TABLE `stockmovements` (
  `movementid` int(11) NOT NULL,
  `productid` int(11) DEFAULT NULL,
  `quantity` int(11) NOT NULL,
  `type` enum('IN','OUT') NOT NULL,
  `notes` text DEFAULT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `userid` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `stockmovements`
--

INSERT INTO `stockmovements` (`movementid`, `productid`, `quantity`, `type`, `notes`, `createdat`, `userid`) VALUES
(7, 5, 3, 'OUT', 'outing rice', '2025-05-09 18:37:21', 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userid` int(11) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(255) NOT NULL,
  `email` varchar(100) NOT NULL,
  `createdat` timestamp NOT NULL DEFAULT current_timestamp(),
  `updatedat` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userid`, `username`, `password`, `email`, `createdat`, `updatedat`) VALUES
(1, 'ghislain', '$2b$10$wCP3YVa2zINqefrpPzaRCefOvwqHlS2Vf4gdFljFz62ndcCKvQvoq', 'ishimweghislain82@gmail.com', '2025-05-09 03:56:29', '2025-05-09 03:56:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`categoryid`);

--
-- Indexes for table `inventory`
--
ALTER TABLE `inventory`
  ADD PRIMARY KEY (`inventoryid`),
  ADD KEY `productid` (`productid`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`productid`),
  ADD UNIQUE KEY `sku` (`sku`),
  ADD KEY `categoryid` (`categoryid`);

--
-- Indexes for table `stockmovements`
--
ALTER TABLE `stockmovements`
  ADD PRIMARY KEY (`movementid`),
  ADD KEY `productid` (`productid`),
  ADD KEY `userid` (`userid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userid`),
  ADD UNIQUE KEY `username` (`username`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `categories`
--
ALTER TABLE `categories`
  MODIFY `categoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `inventory`
--
ALTER TABLE `inventory`
  MODIFY `inventoryid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `productid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `stockmovements`
--
ALTER TABLE `stockmovements`
  MODIFY `movementid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `inventory`
--
ALTER TABLE `inventory`
  ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`categoryid`) REFERENCES `categories` (`categoryid`) ON DELETE SET NULL;

--
-- Constraints for table `stockmovements`
--
ALTER TABLE `stockmovements`
  ADD CONSTRAINT `stockmovements_ibfk_1` FOREIGN KEY (`productid`) REFERENCES `products` (`productid`) ON DELETE CASCADE,
  ADD CONSTRAINT `stockmovements_ibfk_2` FOREIGN KEY (`userid`) REFERENCES `users` (`userid`) ON DELETE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
