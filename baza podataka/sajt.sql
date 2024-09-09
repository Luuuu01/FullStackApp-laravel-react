-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 09, 2024 at 06:48 PM
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
-- Database: `sajt`
--

-- --------------------------------------------------------

--
-- Table structure for table `cart_items`
--

CREATE TABLE `cart_items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `recipe_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `cart_items`
--

INSERT INTO `cart_items` (`id`, `user_id`, `recipe_id`, `created_at`, `updated_at`) VALUES
(15, 2, 7, '2024-09-09 14:38:18', '2024-09-09 14:38:18'),
(16, 2, 9, '2024-09-09 14:38:19', '2024-09-09 14:38:19');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favorites`
--

CREATE TABLE `favorites` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `recipe_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `ingredients`
--

CREATE TABLE `ingredients` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `unit` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ingredients`
--

INSERT INTO `ingredients` (`id`, `name`, `unit`, `created_at`, `updated_at`) VALUES
(1, 'Brašno', 'g', '2024-09-09 13:23:11', '2024-09-09 13:23:11'),
(2, 'Šećer', 'g', '2024-09-09 13:23:11', '2024-09-09 13:23:11'),
(3, 'Jaja', 'kom', '2024-09-09 13:23:11', '2024-09-09 13:23:11'),
(4, 'Mleko', 'ml', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(5, 'Paradajz', 'kom', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(6, 'Mocarela sir', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(7, 'Piletina', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(8, 'Mrkva', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(9, 'Krompir', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(10, 'Testenina', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(11, 'Kakao prah', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(12, 'Zelena salata', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(13, 'Parmezan sir', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(14, 'Krutoni', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(15, 'Jagoda', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(16, 'Banana', 'kom', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(17, 'Jogurt', 'ml', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(18, 'Mleveno meso', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(19, 'Crni luk', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(20, 'Paradajz sos', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(21, 'Pirinac', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(22, 'Kukuruzno brašno', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(23, 'Voda', 'ml', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(24, 'So', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(25, 'Paprika', 'g', '2024-09-09 13:23:12', '2024-09-09 13:23:12'),
(26, 'Tikvice', 'kom', '2024-09-09 13:23:13', '2024-09-09 13:23:13');

-- --------------------------------------------------------

--
-- Table structure for table `ingredient_recipe`
--

CREATE TABLE `ingredient_recipe` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `ingredient_id` bigint(20) UNSIGNED NOT NULL,
  `recipe_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` decimal(8,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ingredient_recipe`
--

INSERT INTO `ingredient_recipe` (`id`, `ingredient_id`, `recipe_id`, `quantity`) VALUES
(1, 1, 1, 300.00),
(2, 5, 1, 2.00),
(3, 6, 1, 200.00),
(4, 7, 2, 200.00),
(5, 5, 2, 2.00),
(6, 25, 2, 200.00),
(7, 9, 2, 100.00),
(8, 7, 3, 500.00),
(9, 8, 3, 2.00),
(10, 9, 3, 3.00),
(11, 10, 3, 100.00),
(12, 1, 4, 200.00),
(13, 11, 4, 50.00),
(14, 3, 4, 3.00),
(15, 2, 4, 150.00),
(16, 12, 5, 200.00),
(17, 13, 5, 50.00),
(18, 14, 5, 100.00),
(19, 7, 5, 200.00),
(20, 1, 6, 200.00),
(21, 3, 6, 2.00),
(22, 4, 6, 300.00),
(23, 2, 6, 50.00),
(24, 15, 7, 150.00),
(25, 16, 7, 2.00),
(26, 17, 7, 200.00),
(27, 10, 8, 500.00),
(28, 18, 8, 500.00),
(29, 19, 8, 2.00),
(30, 20, 8, 400.00),
(31, 1, 8, 50.00),
(32, 4, 8, 500.00),
(33, 13, 8, 100.00),
(34, 6, 8, 200.00),
(35, 9, 9, 1000.00),
(36, 18, 9, 500.00),
(37, 19, 9, 2.00),
(38, 20, 9, 300.00),
(39, 3, 9, 4.00),
(40, 1, 9, 50.00),
(41, 4, 9, 500.00),
(42, 21, 10, 200.00),
(43, 19, 10, 2.00),
(44, 25, 10, 2.00),
(45, 5, 10, 3.00),
(46, 26, 10, 2.00),
(47, 25, 11, 6.00),
(48, 18, 11, 400.00),
(49, 21, 11, 100.00),
(50, 19, 11, 1.00),
(51, 20, 11, 500.00),
(52, 3, 11, 1.00),
(53, 10, 12, 500.00),
(54, 18, 12, 500.00),
(55, 19, 12, 2.00),
(56, 20, 12, 400.00),
(57, 1, 12, 50.00),
(58, 4, 12, 500.00),
(59, 13, 12, 100.00),
(60, 22, 13, 300.00),
(61, 23, 13, 600.00),
(62, 24, 13, 10.00);

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_07_20_121914_create_recipes_table', 1),
(6, '2024_07_20_121923_create_ingredients_table', 1),
(7, '2024_07_20_121940_create_cart_items_table', 1),
(8, '2024_07_20_122003_create_ingredient_recipe_table', 1),
(9, '2024_07_20_122830_create_favorites_table', 1),
(10, '2024_07_20_122925_add_prep_time_to_recipes_table', 1),
(11, '2024_07_20_123024_add_unique_constraint_to_ingredients_table', 1),
(12, '2024_09_08_132951_add_opis_to_recipes_table', 1),
(13, '2024_09_08_133755_modify_opis_column_in_recipes_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(1, 'App\\Models\\User', 2, 'auth_token', 'f6bae3ce626b9a69677ed8dbcae577113a2236f19333c02bfec092b41c6449b6', '[\"*\"]', '2024-09-09 14:40:43', NULL, '2024-09-09 13:29:57', '2024-09-09 14:40:43');

-- --------------------------------------------------------

--
-- Table structure for table `recipes`
--

CREATE TABLE `recipes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slika` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `prep_time` int(11) DEFAULT NULL,
  `opis` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `recipes`
--

INSERT INTO `recipes` (`id`, `name`, `slika`, `description`, `created_at`, `updated_at`, `prep_time`, `opis`) VALUES
(1, 'Pizza', 'https://padariabandeirantes4.com.br/yl/wp-content/uploads/2015/09/pizza1-300x250.jpg', 'Ukusna pizza', '2024-09-09 13:23:13', '2024-09-09 13:23:13', 30, 'Pripremite testo mešanjem brašna, vode, soli i malo ulja, pa ostavite da odstoji. Nakon što se testo podigne, razvucite ga i stavite na pleh. Preko testa rasporedite paradajz sos, pospite rendanom mocarelom i dodajte ostale sastojke. Pecite u prethodno zagrejanoj pećnici dok kora ne postane zlatno smeđa.'),
(2, 'Piletina sa povrćem', 'https://healthyfitnessmeals.com/wp-content/uploads/2022/02/Sheet-pan-Chicken-and-Veggies-7-500x500.jpg', 'Zdravo i ukusno jelo sa piletinom i sezonskim povrćem.', '2024-09-09 13:23:13', '2024-09-09 13:23:13', 45, 'Na zagrejanom ulju propržite piletinu dok ne porumeni, a zatim dodajte seckano povrće (paradajz, paprika, krompir). Posolite, pobiberite i dodajte malo vode, pa poklopite. Kuvajte na laganoj vatri dok piletina ne omekša, a povrće ne bude skuvano.'),
(3, 'Pileća supa', 'https://recipes.net/wp-content/uploads/2023/07/spring-vegetable-broth-with-shredded-chicken_819094540604d3ee87b03361352d221b-300x250.jpeg', 'Domaća pileća supa za okrepljenje', '2024-09-09 13:23:13', '2024-09-09 13:23:13', 60, 'U vodu stavite piletinu, krompir i mrkvu, a zatim dodajte testeninu. Kuvajte dok se meso ne skuva, a povrće ne omekša. Po želji, začinite solju i biberom.'),
(4, 'Čokoladni kolač', 'https://www.bakingclassinchennai.com/blog/wp-content/uploads/2017/12/Chocolate-cake-slice-in-dish-delicious-wallpapers-300x250.jpg', 'Sočan i ukusan čokoladni kolač', '2024-09-09 13:23:13', '2024-09-09 13:23:13', 45, 'Pomešajte suve sastojke (brašno, kakao, šećer) sa umućenim jajima, mlekom i rastopljenim puterom. Sipajte smesu u pleh i pecite dok kolač ne postane čvrst. Ohladite i pospite šećerom u prahu pre serviranja.'),
(5, 'Cezar salata', 'https://www.foodsala.com/wp-content/uploads/2024/01/0328-ceasar-salad-lede-scaled.webp', 'Klasična Cezar salata sa hrskavim krutonima', '2024-09-09 13:23:14', '2024-09-09 13:23:14', 20, 'U posudi pomešajte zelenu salatu, seckane krutone i rendani parmezan. Prelijte sa Cezar prelivom (možete napraviti od majoneza, limunovog soka i začina) i dobro promešajte.'),
(6, 'Palacinke', 'https://bigoven-res.cloudinary.com/image/upload/w_300,c_fill,h_250/fluffy-pancakes-52.jpg', 'Tanke i mekane palačinke za slatki doručak', '2024-09-09 13:23:14', '2024-09-09 13:23:14', 30, 'Pomešajte brašno, jaja, mleko i malo šećera kako biste dobili glatko testo. Na vrućem tiganju pecite tanke palačinke sa obe strane. Poslužite sa omiljenim prelivima, poput džema ili meda.'),
(7, 'Smoothie od jagode i banane', 'https://nourishplate.com/wp-content/uploads/2021/06/Apple-Banana-Smoothie-Recipe-7.jpg', 'Osvežavajući smoothie za zdrav početak dana', '2024-09-09 13:23:14', '2024-09-09 13:23:14', 10, 'Sve sastojke (jagode, banane, jogurt) stavite u blender i blendajte dok ne dobijete glatku smesu. Sipajte u čaše i uživajte u osvežavajućem napitku.'),
(8, 'Lazanje', 'https://d17zv3ray5yxvp.cloudfront.net/variants/Wk4Me1PDhq75KXYfwFvNkqm6/d643816d5f22835bda887419d1c7851c5db89be85ac093be6baace40ae811261', 'Slojevito jelo sa mlevenim mesom, bešamel sosom i sirom', '2024-09-09 13:23:14', '2024-09-09 13:23:14', 90, 'Na dno vatrostalnog jela stavite sloj testenine, zatim sloj mlevenog mesa sa paradajz sosom, pa ponovite dok ne potrošite sastojke. Prelijte bešamel sosom, pospite sirom i pecite u pećnici dok ne dobije zlatnu boju.'),
(9, 'Musaka', 'https://www.cooliranje.com/images/tt/2013/10/t_2898025_musaka_sa_krompirom_i_mlevenim_mesom_admin_cool_v.jpg', 'Tradicionalna musaka sa krompirom, mlevenim mesom i bešamelom', '2024-09-09 13:23:14', '2024-09-09 13:23:14', 75, 'Na dnu posude poređajte slojeve krompira, pa mlevenog mesa i paradajz sosa. Prelijte mešavinom jaja i mleka. Kuvajte u rerni dok se ne zapeče i dobije zlatnu boju.'),
(10, 'Đuveč', 'https://www.recepti.com/img/recipe/32419-djuvec-na-moj-nacin_zoom.jpg', 'Jelo od povrća sa pirinčem, pečeno u rerni', '2024-09-09 13:23:15', '2024-09-09 13:23:15', 60, 'U vatrostalnoj posudi pomešajte pirinač, seckano povrće (papriku, paradajz, tikvice) i crni luk. Prelijte vodom i začinite po ukusu. Pokrijte i kuvajte u rerni dok pirinač ne omekša.'),
(11, 'Punjene paprike', 'https://glaszabjela.me/wp-content/uploads/2018/11/naslovna.jpg', 'Paprike punjene mlevenim mesom i pirinčem, kuvane u paradajz sosu', '2024-09-09 13:23:15', '2024-09-09 13:23:15', 75, 'Paprike napunite smesom od mlevenog mesa, pirinča i začina. Stavite ih u lonac, prelijte paradajz sosom i kuvajte na laganoj vatri dok paprika ne omekša.'),
(12, 'Pasta', 'https://saratogaoliveoil.com/cdn/shop/articles/puttanesca-2.jpg?v=1681323391', 'Slojevito jelo sa makaranama, mlevenim mesom i bešamel sosom', '2024-09-09 13:23:15', '2024-09-09 13:23:15', 90, 'Povrće i meso propržite na ulju, a zatim dodajte paradajz sos. Kada se sos zagreje, dodajte kuvanu testeninu i dobro promešajte. Poslužite toplo sa parmezanom.'),
(13, 'Kačamak', 'https://media.ilovezrenjanin.com/2021/02/hajducki-kacamak1.jpg', 'Gusto jelo od kukuruznog brašna, idealno za hladnije dane', '2024-09-09 13:23:15', '2024-09-09 13:23:15', 30, 'Prokuvajte vodu, a zatim dodajte kukuruzno brašno postepeno mešajući. Kuvajte dok se ne zgusne, a zatim posolite i dodajte puter po želji.');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Test User', 'test@example.com', NULL, '$2y$10$O/iYHXk.3A3.C721OC0d8uDYGqUi7sosrbn0.ikPPAKi8OqHtFQRy', NULL, '2024-09-09 13:23:16', '2024-09-09 13:23:16'),
(2, 'marko', 'marko@gmail.com', NULL, '$2y$10$FY7d3gZoyh1g4IGA5P0jG.HtVoAgaf4OcLfhFRmGln53FJ.2tLkmW', NULL, '2024-09-09 13:29:43', '2024-09-09 13:29:43');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cart_items_user_id_foreign` (`user_id`),
  ADD KEY `cart_items_recipe_id_foreign` (`recipe_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `favorites`
--
ALTER TABLE `favorites`
  ADD PRIMARY KEY (`id`),
  ADD KEY `favorites_user_id_foreign` (`user_id`),
  ADD KEY `favorites_recipe_id_foreign` (`recipe_id`);

--
-- Indexes for table `ingredients`
--
ALTER TABLE `ingredients`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `ingredients_name_unique` (`name`);

--
-- Indexes for table `ingredient_recipe`
--
ALTER TABLE `ingredient_recipe`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ingredient_recipe_ingredient_id_foreign` (`ingredient_id`),
  ADD KEY `ingredient_recipe_recipe_id_foreign` (`recipe_id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `recipes`
--
ALTER TABLE `recipes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `cart_items`
--
ALTER TABLE `cart_items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `favorites`
--
ALTER TABLE `favorites`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ingredients`
--
ALTER TABLE `ingredients`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `ingredient_recipe`
--
ALTER TABLE `ingredient_recipe`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `recipes`
--
ALTER TABLE `recipes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cart_items`
--
ALTER TABLE `cart_items`
  ADD CONSTRAINT `cart_items_recipe_id_foreign` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cart_items_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `favorites`
--
ALTER TABLE `favorites`
  ADD CONSTRAINT `favorites_recipe_id_foreign` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `favorites_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `ingredient_recipe`
--
ALTER TABLE `ingredient_recipe`
  ADD CONSTRAINT `ingredient_recipe_ingredient_id_foreign` FOREIGN KEY (`ingredient_id`) REFERENCES `ingredients` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `ingredient_recipe_recipe_id_foreign` FOREIGN KEY (`recipe_id`) REFERENCES `recipes` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
