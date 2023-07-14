CREATE DATABASE [Tp-Pia];
GO

USE [Tp-Pia];
GO

-- Creación de la tabla "Preguntas"
CREATE TABLE Preguntas (
    PreguntaId INT IDENTITY(1,1) PRIMARY KEY,
    Pregunta VARCHAR(MAX),
    Opcion1 VARCHAR(MAX),
    Opcion2 VARCHAR(MAX),
    Opcion3 VARCHAR(MAX),
    Opcion4 VARCHAR(MAX),
    RespuestaCorrecta INT,
    FechaCreacion DATETIME
);
GO

-- Creación de la tabla "Respuestas"
CREATE TABLE Respuestas (
    UserId INT,
    PreguntaId INT,
    RespuestaSeleccionada INT,
    EsRespuestaCorrecta BIT,
    FechaCreacion DATETIME,
    FOREIGN KEY (PreguntaId) REFERENCES Preguntas(PreguntaId)
);
GO

-- Datos de prueba para la tabla "Preguntas"
INSERT INTO Preguntas (Pregunta, Opcion1, Opcion2, Opcion3, Opcion4, RespuestaCorrecta, FechaCreacion)
VALUES
    ('¿Cuál es la capital de Francia?', 'Roma', 'París', 'Berlín', 'Londres', 2, '2022-09-20'),
    ('¿En qué año se fundó Microsoft?', '1975', '1985', '1995', '2005', 1, '2022-10-20'),
    ('¿Cuál es el océano más grande?', 'Océano Pacífico', 'Océano Atlántico', 'Océano Índico', 'Océano Ártico', 1, '2022-09-20'),
    ('¿Cuál es el río más largo del mundo?', 'Amazonas', 'Nilo', 'Yangtsé', 'Mississippi', 3, '2023-09-27'),
    ('¿Quién pintó La Mona Lisa?', 'Leonardo da Vinci', 'Pablo Picasso', 'Vincent van Gogh', 'Salvador Dalí', 4, '2022-09-20'),
    ('¿Cuál es el planeta más grande del sistema solar?', 'Júpiter', 'Marte', 'Saturno', 'Neptuno', 1, '2022-09-20'),
    ('¿Cuál es la montaña más alta del mundo?', 'Monte Everest', 'Monte Kilimanjaro', 'Monte Aconcagua', 'Monte McKinley', 1, '2022-09-20'),
    ('¿En qué país se encuentra la Torre Eiffel?', 'Francia', 'Italia', 'Alemania', 'Reino Unido', 3, '2022-09-20'),
    ('¿Cuál es el elemento químico más abundante en la Tierra?', 'Oxígeno', 'Hidrógeno', 'Carbono', 'Nitrógeno', 4, '2022-09-20'),
    ('¿Cuál es el animal más rápido del mundo?', 'Guepardo', 'Leopardo', 'León', 'Tigre', 4, '2022-09-20');