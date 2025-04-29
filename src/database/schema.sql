CREATE DATABASE produtos;

\c produtos;

CREATE TABLE cosmeticos (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    categoria VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE marcas (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    fundador VARCHAR(100) NOT NULL 
);

INSERT INTO cosmeticos (name, categoria) VALUES 
    ('Óleo Finalizador', 'cabelo'),
    ('Libre Yves Saint Laurent Perfume Feminino', 'perfumes'),
    ('Perfume Dior Sauvage Masculino', 'perfumes'),
    ('Máscara de Cílios Maybelline', 'maquiagem'),
    ('Gel de Sobrancelha Essence ', 'maquiagem');

INSERT INTO marcas (name, fundador) VALUES 
    ('Christian Dior', 'Christian Dior'),
    ('Maybelline', 'Tom Lyle Williams'),
    ('Yves Saint Laurent', 'Yves Saint Laurent'),
    ('Essence', 'Cosnova GmbH'),
    ('LOréal', 'Eugène Schueller');

SELECT * FROM marcas;
SELECT * FROM cosmeticos;