DROP DATABASE IF EXISTS homeswap;
CREATE DATABASE homeswap;
USE homeswap;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(100),
  userphoto VARCHAR(100),
  firstname VARCHAR(100),
  lastname VARCHAR(100),
  password VARCHAR(100),
  salt VARCHAR(100)
);

CREATE TABLE profiles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userid INT,
  address VARCHAR(100),
  city VARCHAR(50),
  state VARCHAR(20),
  zipcode INT,
  title VARCHAR(250),
  description VARCHAR(1000),
  photopath VARCHAR(200),
  FOREIGN KEY (userid) REFERENCES users(id)
);

-- INSERT INTO users (email, userphoto, firstname, lastname) VALUES ('cammehrabian@gmail.com', '1.jpg', 'Cameron', 'Mehrabian');
-- INSERT INTO users (email, userphoto, firstname, lastname) VALUES ('dcervoni@gmail.com', '2.jpg', 'Daniel', 'Cervoni');
-- INSERT INTO users (email, userphoto, firstname, lastname) VALUES ('kiyeonpark@gmail.com', '3.jpg', 'Kiyeon', 'Park');
-- INSERT INTO users (email, userphoto, firstname, lastname) VALUES ('abreuter@gmail.com', '4.jpg', 'Austin', 'Reuter');

-- INSERT INTO profiles (userid, address, city, state, zipcode, title, description, photopath) VALUES (1, '1 Street', 'San Francisco', 'CA', 94110, 'Simple, new, clean accommodation', 'I signed a new lease and moving out of my place in SF month sooner than my current lease ends so I am subletting my place. You get a private BR&BA with a garage parking in a new apartment complex.  I will leave you a twin matters with clean linen This is clean, simple, affordable accommodation with all necessary amenities (wifi, private bedroom, private bathroom, dedicated free garage parking) in the heart of San Francisco. Only 10mins walk to BART (San Francisco subway) You get 24/7 access to your bedroom,bathroom and parking spot. No Access to kitchen/washer/dryer I wont be there, but two my roommates live in the apartment. Two other roommates are mid-20s females, one works for finance startup (BlueVine) in Palo Alto, other is a wine columnist for SF Chronicle. Roommates are super clean (and so is our place), dont smoke, dont have parties except for occasional dinners and treat our home as a super clean and neat retreat/sanctuary. Place is very conveniently located in the Mission',
--   'https://a0.muscache.com/im/pictures/2c6eb3ad-a639-4be1-a592-149af50d67fc.jpg?aki_policy=large');

-- INSERT INTO profiles (userid, address, city, state, zipcode, title, description, photopath) VALUES (
--   2,
--   '2 Street',
--   'San Francisco',
--   'CA',
--   94110,
--   'Spacious 2BR/2BATH w/Shared Kitchen',
--   'We love our big, bright home and we know you will, too! Although this is not strictly an\"entire home\" listing, we are offering exclusive use of the main floor of our apartment, except for sharing use of the kitchen with our adult son, Jamie. You will have exclusive use of two bedrooms, our large living room with comfy seating and warm textile decorations, and our dining room that seats 8 to 10. The master bedroom has a queen bed and ensuite bath. The second bedroom has two single beds and its own private bathroom in the hall. Our kitchen has a dishwasher and is fully equipped.',
--   'https://a0.muscache.com/im/pictures/102820109/c9b44e0c_original.jpg?aki_policy=large');

-- INSERT INTO profiles (userid, address, city, state, zipcode, title, description, photopath) VALUES (
--   3,
--   '3 Street',
--   'San Francisco',
--   'CA',
--   94110,
--   'Private room - Victorian House in the Mission',
--   "Awesome location in the Mission District of SF, next to Potrero Hill. The house is very well located in the sunny Mission. The BART station, Whole Foods, Safeway, Starbucks and Dolores Park are all within walking distance. It's really a beautiful Victorian house, where you'll find an easy going & friendly vibe. You'll get to live with 3 international guys (Belgium, Spain & Singapore) who take pride in being clean, are good friends and work in established Tech companies in the Bay Area.",
--   'https://a0.muscache.com/im/pictures/bdb8981f-80b3-4b46-a83d-643cb4e753c1.jpg?aki_policy=large');

-- INSERT INTO profiles (userid, address, city, state, zipcode, title, description, photopath) VALUES (
--   4,
--   '4 Street',
--   'San Francisco',
--   'CA',
--   94110,
--   'Spacious 1BR in the Mission District',
--   "Quiet 1 bedroom apartment, with a spacious, well lit living room located in the Mission District area. Many bars, restaurants, and stores are down the street on Valencia. Walk to Dolores Park in just a few blocks. Hop on BART or Muni after a 7 min walk. Perfect for singles, couples, or families with 1 kid. Sofa in the living room opens to a bed.",
--   'https://a0.muscache.com/im/pictures/ef31cf3f-5cb8-4392-8e8d-9e7635154e89.jpg?aki_policy=large');
