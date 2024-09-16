-- Insert mock data into Users Table
INSERT INTO Users (username, email, password, fullName, phoneNumber, isAdmin) VALUES
('john_doe', 'john@example.com', 'hashedpassword1', 'John Doe', '1234567890', FALSE),
('jane_smith', 'jane@example.com', 'hashedpassword2', 'Jane Smith', '0987654321', TRUE);

-- Insert mock data into AnonymousUsers Table
INSERT INTO AnonymousUsers () VALUES
(), ();

-- Insert mock data into Addresses Table
INSERT INTO Addresses (userId, anonymousUsersId, addressLine1, addressLine2, city, state, postalCode, country) VALUES
(1, NULL, '123 Main St', 'Apt 4B', 'New York', 'NY', '10001', 'USA'),
(NULL, 1, '789 Maple St', NULL, 'Los Angeles', 'CA', '90001', 'USA');

-- Insert mock data into Books Table
INSERT INTO Books (title, author, description, price, coverImageUrl) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'A novel set in the Jazz Age', 10.99, 'https://example.com/covers/gatsby.jpg'),
('To Kill a Mockingbird', 'Harper Lee', 'A novel about racism and injustice', 12.99, 'https://example.com/covers/mockingbird.jpg'),
('1984', 'George Orwell', 'A dystopian novel', 8.99, 'https://example.com/covers/1984.jpg');

-- Insert mock data into Categories Table
INSERT INTO Categories (name, description) VALUES
('Classics', 'Classic literature that has stood the test of time'),
('Science Fiction', 'Books set in futuristic or alternate realities'),
('Mystery', 'Novels centered around a crime or puzzle');

-- Insert mock data into BookCategories Table
INSERT INTO BookCategories (bookId, categoryId) VALUES
(1, 1), -- The Great Gatsby is a Classic
(2, 1), -- To Kill a Mockingbird is a Classic
(3, 2); -- 1984 is Science Fiction

-- Insert mock data into Orders Table
INSERT INTO Orders (userId, anonymousUserId, guestEmail, totalAmount, discountAmount, status) VALUES
(1, NULL, NULL, 23.98, 0.00, 'Completed'),
(NULL, 2, 'guest@example.com', 8.99, 1.00, 'Pending');

-- Insert mock data into OrderItems Table
INSERT INTO OrderItems (orderId, bookId) VALUES
(1, 1), -- The Great Gatsby in the first order
(1, 2), -- To Kill a Mockingbird in the first order
(2, 3); -- 1984 in the second order

-- Insert mock data into ShoppingCart Table
INSERT INTO ShoppingCart (anonymousUserId, userId, bookId) VALUES
(NULL, 1, 2), -- John Doe has To Kill a Mockingbird in their cart
(2, NULL, 3); -- Anonymous user has 1984 in their cart

-- Insert mock data into Payments Table
INSERT INTO Payments (orderId, amount, paymentMethod, paymentStatus) VALUES
(1, 23.98, 'Credit Card', 'Paid'),
(2, 7.99, 'PayPal', 'Pending');

-- Insert mock data into PasswordResetTokens Table
INSERT INTO PasswordResetTokens (userId, token, expiresAt) VALUES
(1, 'reset-token-123', '2024-12-31 23:59:59');

-- Insert mock data into BookImages Table
INSERT INTO BookImages (bookId, imageUrl) VALUES
(1, 'https://example.com/images/gatsby1.jpg'),
(1, 'https://example.com/images/gatsby2.jpg'),
(2, 'https://example.com/images/mockingbird1.jpg'),
(3, 'https://example.com/images/1984-1.jpg'),
(3, 'https://example.com/images/1984-2.jpg');
