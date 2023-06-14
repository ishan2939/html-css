CREATE DATABASE blog;
SHOW databases;

CREATE TABLE post(
    title VARCHAR(30) NOT NULL,
    content TEXT DEFAULT null,
    author VARCHAR(20) DEFAULT '',
    publication_date timestamp DEFAULT NOW(),
    price FLOAT DEFAULT 0
);

DESC post;
DROP table post;

INSERT INTO
    post
VALUES
    (
        'My First Post',
        'This is my first post.',
        'Jane Austen',
        '2023-06-07',
        200
    ),
    (
        'A New Day',
        'It is a beautiful day outside.',
        'William Shakespeare',
        '2023-02-13',
        350.25
    ),
    (
        'The Future',
        'I am excited for what the future holds.',
        'George Orwell',
        '2021-04-23',
        800
    ),
    (
        'The Past',
        'I am grateful for the past.',
        'Jane Austen',
        '2022-10-10',
        290.50
    ),
    (
        'The Present',
        'I am living in the present moment.',
        'William Shakespeare',
        '2023-03-18',
        560
    ),
    (
        'Love',
        'Love is the most powerful force in the universe.',
        'George Orwell',
        '2022-12-05',
        100
    ),
    (
        'Peace',
        'Peace is the goal of all beings.',
        'Jane Austen',
        '2022-05-27',
        60
    ),
    (
        'Happiness',
        'Happiness is a state of being.',
        'William Shakespeare',
        '2023-01-01',
        0
    ),
    (
        'Kindness',
        'Kindness is the way of the universe.',
        'George Orwell',
        '2022-05-17',
        560
    ),
    (
        'Gratitude',
        'I am grateful for everything I have.',
        'Leo Tolstoy',
        '2023-06-07',
        700
    ),
    (
        'Hope',
        'I have hope for the future.',
        'William Shakespeare',
        '2022-09-07',
        1300
    ),
    (
        'Dreams',
        'I have big dreams.',
        'Jane Austen',
        '2023-02-10',
        620
    ),
    (
        'Achievements',
        'I am proud of my achievements.',
        'Leo Tolstoy',
        '2021-10-04',
        130
    );

SELECT
    *
FROM
    post;

SELECT
    title as post_title,
    author
FROM
    post;

SELECT
    1 + 1;

SELECT
    NOW();

SELECT
    CONCAT("Ishan", "Harkhani");

USE blog;

SELECT
    name
FROM
    dummy;

SELECT
    title,
    publication_date
FROM
    post
ORDER BY
    publication_date ASC,
    title ASC;

/*Suppose that you want to sort the sales orders based on their statuses in the following order:

In Process
On Hold
Canceled
Resolved
Disputed
Shipped
*/

SELECT 
    orderNumber, status
FROM
    orders
ORDER BY FIELD(status,
        'In Process',
        'On Hold',
        'Cancelled',
        'Resolved',
        'Disputed',
        'Shipped');

/*In MySQL, NULL comes before non-NULL values. Therefore, when you the ORDER BY clause with the ASC option, NULLs appear first in the result set.*/

SELECT title, publication_date
FROM post
WHERE publication_date LIKE '2023-%'
ORDER BY publication_date;

SELECT title, publication_date
FROM post
WHERE publication_date BETWEEN '2023-01-01' AND '2023-02-13';

SELECT title, publication_date
FROM post
WHERE publication_date IN ('2023-01-01', '2023-06-07');

SELECT * FROM post LIMIT 4;

/*find the author with oldest book published in database*/
SELECT title, author FROM post WHERE publication_date = (SELECT MIN(publication_date) AS oldest_book FROM post);

/*find the author with newest book published in database*/
SELECT title, author FROM post WHERE publication_date = (SELECT MAX(publication_date) AS newest_book FROM post);

/*count free books*/
SELECT count(title) AS TOTAL_NUMBER_OF_FREE_BOOKS FROM post WHERE price=0;

/*Sum of prices of all books*/
SELECT SUM(price) AS TOTAL_PRICE FROM post;

/*Average price of all books*/
SELECT AVG(price) AS AVERAGE_PRICE FROM post;

/*like operations*/
SELECT title, author FROM post WHERE title LIKE "a%";
SELECT title, author FROM post WHERE title LIKE "%a";
SELECT title, author FROM post WHERE title LIKE "%a%";
SELECT title, author FROM post WHERE title LIKE "_a%";
SELECT title, author FROM post WHERE title LIKE "%a_";
SELECT title, author FROM post WHERE title LIKE "_a_";
SELECT title, author FROM post WHERE title LIKE "a_%";
SELECT title, author FROM post WHERE title LIKE "%a__";
/*etc...*/


/*Will give records between my first post and the past*/
SELECT title FROM post WHERE title BETWEEN "My First Post" AND "The Past";
/*Will give records not between my first post and the past*/
SELECT title FROM post WHERE title NOT BETWEEN "My First Post" AND "The Past";

SELECT author FROM post GROUP BY author;

/*get total number of books each author has written*/
SELECT author, COUNT(*) AS Total_books FROM post GROUP BY(author);

/* get total price for each author books */
SELECT author, SUM(price) AS TOTAL_BOOK_PRICE FROM post GROUP BY author ORDER BY TOTAL_BOOK_PRICE DESC;

/* get author name with books written more than 3 */
SELECT author, COUNT(*) AS TOTAL_BOOKS FROM post GROUP BY author HAVING TOTAL_BOOKS>3;

DESC post;
USE blog;
ALTER TABLE post ADD jeel VARCHAR(22) not null;

ALTER TABLE post CHANGE ishan ISHAN VARCHAR(30);

ALTER TABLE post DROP jeel;

ALTER TABLE post
CHANGE JEEL jeel varchar(30);

DROP DATABASE ecommerce;
CREATE DATABASE ecommerce;