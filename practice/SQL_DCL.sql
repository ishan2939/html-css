CREATE DATABASE blog;

SHOW databases;

CREATE TABLE post(
    title VARCHAR(30) NOT NULL,
    content TEXT DEFAULT null,
    author VARCHAR(20),
    publication_date timestamp DEFAULT NOW()
);

DESC post;

INSERT INTO
    post (title, content, author, publication_date)
VALUES
    (
        'My First Post',
        'This is my first post.',
        'Jane Austen',
        '2023-06-07'
    ),
    (
        'A New Day',
        'It is a beautiful day outside.',
        'William Shakespeare',
        '2023-02-13'
    ),
    (
        'The Future',
        'I am excited for what the future holds.',
        'George Orwell',
        '2021-04-23'
    ),
    (
        'The Past',
        'I am grateful for the past.',
        'Jane Austen',
        '2022-10-10'
    ),
    (
        'The Present',
        'I am living in the present moment.',
        'William Shakespeare',
        '2023-03-18'
    ),
    (
        'Love',
        'Love is the most powerful force in the universe.',
        'George Orwell',
        '2022-12-05'
    ),
    (
        'Peace',
        'Peace is the goal of all beings.',
        'Jane Austen',
        '2022-05-27'
    ),
    (
        'Happiness',
        'Happiness is a state of being.',
        'William Shakespeare',
        '2023-01-01'
    ),
    (
        'Kindness',
        'Kindness is the way of the universe.',
        'George Orwell',
        '2022-05-17'
    ),
    (
        'Gratitude',
        'I am grateful for everything I have.',
        'Leo Tolstoy',
        '2023-06-07'
    ),
    (
        'Hope',
        'I have hope for the future.',
        'William Shakespeare',
        '2022-09-07'
    ),
    (
        'Dreams',
        'I have big dreams.',
        'Jane Austen',
        '2023-02-10'
    ),
    (
        'Achievements',
        'I am proud of my achievements.',
        'Leo Tolstoy',
        '2021-10-04'
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