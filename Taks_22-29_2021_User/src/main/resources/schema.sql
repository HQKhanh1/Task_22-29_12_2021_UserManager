-- noinspection SqlDialectInspectionForFile

-- noinspection SqlNoDataSourceInspectionForFile

DROP TABLE IF EXISTS demouser;
CREATE TABLE demouser
(
    username  CHAR(20) PRIMARY KEY,
    pw  VARCHAR(255) NOT NULL,
    fsname NVARCHAR(255) NOT NULL,
    lsname  NVARCHAR(255) NOT NULL,
    email     VARCHAR(255) NOT NULL
);
