
CREATE LOGIN [Gonzalito] WITH PASSWORD=N'plager', DEFAULT_DATABASE=[Tp-Pia], CHECK_EXPIRATION=OFF, CHECK_POLICY=OFF
GO

USE [Tp-Pia]
GO
CREATE USER [Gonzalito] FOR LOGIN [Gonzalito]
GO
USE [Tp-Pia]
GO
ALTER ROLE [db_owner] ADD MEMBER [Gonzalito]
GO