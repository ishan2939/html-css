/*MYSQL queries of practical*/

USE ecommerce;

/*
 Fetch all the User order list and include atleast following details in that.
 - Customer name
 - Product names
 - Order Date
 - Expected delivery date (in days, i.e. within X days)
 */
SELECT
    orders.`orderId`,
    CONCAT(users.fname, " ", users.lname) as customerName,
    DATE(orders.`createdAt`) as orderDate,
    GREATEST(
        DATEDIFF(orders.`expectedDeliveryDate`, CURRENT_DATE),
        0
    ) AS expectedDeliveryDays,
    products.`productName`
FROM
    orders
    INNER JOIN users ON orders.`userId` = users.`userId`
    INNER JOIN `orderItems` ON orders.`orderId` = orderItems.`orderId`
    INNER JOIN products ON orderItems.`productId` = products.`productId`;



/*All undelivered Orders*/
SELECT
    orderId,
    orderStatus
FROM
    orders
WHERE
    `orderStatus` <> "delivered";



/*5 Most recent orders*/
SELECT
    orderId,
    DATE(createdAt) as orderDate
FROM
    orders
ORDER BY
    `createdAt` DESC
LIMIT
    5;



/*Top 5 active users (Users having most number of orders)*/
SELECT
    orders.userId,
    CONCAT(users.fname, " ", users.lname) as userName,
    COUNT(*) as numberOfOrders
FROM
    orders
    INNER JOIN users ON orders.userId = users.`userId`
GROUP BY
    `userId`
ORDER BY
    numberOfOrders DESC
LIMIT
    5;



/*Inactive users (Users who hasn’t done any order)*/
SELECT
    `userId`,
    CONCAT_WS(" ", fname, lname) as inactiveUsers
FROM
    users
WHERE
    userId NOT IN(
        SELECT
            userId
        FROM
            orders
    );



/*Top 5 Most purchased products*/
SELECT
    productId,
    SUM(`productQuantity`) as totalQuantityOrdered
FROM
    `orderItems`
GROUP BY
    `productId`
ORDER BY
    totalQuantityOrdered DESC
LIMIT
    5;



/*Most expensive and most chepest orders.*/
(SELECT
    orderItems.`orderId`,
    SUM(
        orderItems.`productQuantity` * products.`productPrice`
    ) as total
FROM
    orderItems
    INNER JOIN products ON orderItems.`productId` = products.`productId`
GROUP BY
    `orderId`
ORDER BY
    total DESC
LIMIT
    1)
UNION
(SELECT
    orderItems.`orderId`,
    SUM(
        orderItems.`productQuantity` * products.`productPrice`
    ) as total
FROM
    orderItems
    INNER JOIN products ON orderItems.`productId` = products.`productId`
GROUP BY
    `orderId`
ORDER BY
    total ASC
LIMIT
    1);
