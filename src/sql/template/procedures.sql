DROP PROCEDURE IF EXISTS spDelete%MODEL%;
DELIMITER $$
CREATE PROCEDURE spDelete%MODEL%(
    IN p_id INT
)
BEGIN
    DELETE
    FROM
        %MODELS%
    WHERE
        id = p_id;

END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS spGet%MODEL%;
DELIMITER $$
CREATE PROCEDURE spGet%MODEL%(
    IN p_id INT
)
BEGIN

    SELECT
        *
    FROM
        %MODELS%
    WHERE
        id = p_id
    LIMIT
        1;

END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS spGet%MODELS%;
DELIMITER $$
CREATE PROCEDURE spGet%MODELS%(
    IN p_rowcount INT,
    IN p_startingrow INT
)
BEGIN

    SELECT
        fnGetStartingRow(p_startingrow)
    INTO
        p_startingrow;

    SELECT
        fnGetRowCount(p_rowcount)
    INTO
        p_rowcount;

    SELECT SQL_CALC_FOUND_ROWS
        *
    FROM
        %MODELS%
    WHERE

    ORDER BY
        id
    LIMIT p_rowcount
    OFFSET p_startingrow;

    SELECT
        FOUND_ROWS() AS `count`,
        p_startingrow AS `startingrow`,
        p_rowcount AS `rowcount`;

END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS spInsert%MODEL%;
DELIMITER $$
CREATE PROCEDURE spInsert%MODEL%(

)
BEGIN

    INSERT INTO %MODELS% (

    )
    VALUES (

    );

    SELECT
        LAST_INSERT_ID() AS id;

END$$
DELIMITER ;

DROP PROCEDURE IF EXISTS spUpdate%MODEL%;
DELIMITER $$
CREATE PROCEDURE spUpdate%MODEL%(
    IN p_id INT,
)
BEGIN

    UPDATE
        %MODELS%
    SET

    WHERE
        id = p_id
    LIMIT
        1;

END$$
DELIMITER ;