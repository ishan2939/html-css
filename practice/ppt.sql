mysql > INSERT INTO
    Products (ProductID, ProductName, Price)
VALUES
    (2, NULL, 19.99);

ERROR 1048 (23000): Column 'ProductName' cannot be null


INSERT INTO Products (ProductID, ProductName, Price)
VALUES (1, 'Widget', 9.99);

INSERT INTO Products (ProductID, ProductName, Price)
VALUES (2, 'Gadget', 19.99);

INSERT INTO Products (ProductID, ProductName, Price)
VALUES (3, 'Widget', 29.99);

ERROR 1062 (23000): Duplicate entry 'Widget' for key 'Products.ProductName'
