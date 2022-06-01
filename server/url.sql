-- phpMyAdmin SQL Dump
-- version 5.1.3
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Jun 02, 2022 at 12:50 AM
-- Server version: 10.3.34-MariaDB-log
-- PHP Version: 7.4.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `url`
--

-- --------------------------------------------------------

--
-- Table structure for table `t_history`
--

CREATE TABLE `t_history` (
  `id` int(11) NOT NULL,
  `user` varchar(50) DEFAULT NULL,
  `action` varchar(1000) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `t_url_shorte`
--

CREATE TABLE `t_url_shorte` (
  `id` int(11) NOT NULL,
  `user` varchar(50) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `urlLong` varchar(50) DEFAULT NULL,
  `urlShorte` varchar(50) DEFAULT NULL,
  `urlParams` varchar(50) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_url_shorte`
--

INSERT INTO `t_url_shorte` (`id`, `user`, `title`, `urlLong`, `urlShorte`, `urlParams`, `datetime`) VALUES
(1, 'admin', 'test', 'https://google.com', 'http://127.0.0.1:3000/GaRbtaY', 'GaRbtaY', '2022-04-04 00:59:46'),
(2, 'admin', 'facebook', 'https://youtube.com', 'http://127.0.0.1:3000/ZFv7F3Q', 'ZFv7F3Q', '2022-04-04 01:00:31'),
(3, 'test1', 'test1', 'https://stackoverflow.com/questions/10730362/get-c', 'https://url.rct-dev.com/RAyys0V', 'RAyys0V', '2022-05-25 17:01:52'),
(4, 'test1', 'test', 'https://youtube.com', 'https://url.rct-dev.com/luXcOIX', 'luXcOIX', '2022-06-01 19:58:52');

-- --------------------------------------------------------

--
-- Table structure for table `t_users`
--

CREATE TABLE `t_users` (
  `id` int(11) NOT NULL,
  `user` varchar(50) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `level` varchar(50) DEFAULT NULL,
  `datetime` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `t_users`
--

INSERT INTO `t_users` (`id`, `user`, `password`, `email`, `level`, `datetime`) VALUES
(1, 'admin', '$2b$10$.lNCX5pHmNIY6RciMVDM9ex7b2ntCXMjlb.Jc46EoBU.x3mBDP5gS', 'admin@gmail.com', 'admin', '2022-04-02 00:33:57'),
(4, 'test1', '$2b$10$FLPftNJi5h/Sumgi.PV2F.NSyPWYRb0UG7s7WZbmwhvhixVRqjkKy', 'test1@1234.com', 'user', '2022-05-25 16:59:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `t_history`
--
ALTER TABLE `t_history`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_url_shorte`
--
ALTER TABLE `t_url_shorte`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `t_users`
--
ALTER TABLE `t_users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `t_history`
--
ALTER TABLE `t_history`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `t_url_shorte`
--
ALTER TABLE `t_url_shorte`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `t_users`
--
ALTER TABLE `t_users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
