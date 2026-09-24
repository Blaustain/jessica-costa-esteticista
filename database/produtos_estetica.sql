-- BANCO DE DADOS: Jéssica Costa - Estética e Bem-Estar
-- PostgreSQL 14+
-- Tabela exclusiva para produtos utilizados no consultório.

CREATE SCHEMA IF NOT EXISTS estetica;

CREATE TABLE IF NOT EXISTS estetica.produtos (
    id_produto BIGSERIAL PRIMARY KEY,
    nome VARCHAR(150) NOT NULL,
    categoria VARCHAR(80) NOT NULL,
    marca VARCHAR(100),
    unidade_medida VARCHAR(40) NOT NULL,
    estoque_atual NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (estoque_atual >= 0),
    estoque_minimo NUMERIC(12,2) NOT NULL DEFAULT 0 CHECK (estoque_minimo >= 0),
    custo_unitario NUMERIC(12,2) CHECK (custo_unitario >= 0),
    fornecedor VARCHAR(120),
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    criado_em TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    atualizado_em TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_produtos_categoria ON estetica.produtos(categoria);
CREATE INDEX IF NOT EXISTS idx_produtos_ativo ON estetica.produtos(ativo);

INSERT INTO estetica.produtos
(nome, categoria, marca, unidade_medida, estoque_atual, estoque_minimo, custo_unitario, fornecedor)
VALUES
('Gel de limpeza facial','Higiene facial','Dermocosmético A','500 ml',8,2,38.90,'Fornecedor Dermocosméticos'),
('Água micelar','Higiene facial','Dermocosmético A','500 ml',7,2,29.90,'Fornecedor Dermocosméticos'),
('Esfoliante facial','Esfoliação','Cosmética B','300 g',5,2,34.50,'Fornecedor Cosmética'),
('Máscara facial calmante','Máscaras','Cosmética B','500 g',4,2,48.00,'Fornecedor Cosmética'),
('Protetor solar facial FPS 50','Fotoproteção','Dermocosmético C','120 g',6,3,42.90,'Fornecedor Dermocosméticos'),
('Óleo vegetal para massagem','Massagem','Essencial D','1 L',3,2,52.00,'Fornecedor Essencial'),
('Creme corporal modelador','Corporal','Cosmética E','1 kg',4,2,65.00,'Fornecedor Corporal'),
('Gel para drenagem','Corporal','Cosmética E','1 kg',3,2,59.90,'Fornecedor Corporal'),
('Luva nitrílica descartável','Descartáveis','SafeCare','Caixa 100 un.',5,3,39.90,'Fornecedor Hospitalar'),
('Touca descartável','Descartáveis','SafeCare','Pacote 100 un.',6,2,18.90,'Fornecedor Hospitalar'),
('Algodão hidrófilo','Descartáveis','MedClean','500 g',3,2,16.90,'Fornecedor Hospitalar'),
('Álcool 70%','Higienização','MedClean','1 L',8,3,12.90,'Fornecedor Hospitalar')
ON CONFLICT DO NOTHING;

-- Consulta útil para o controle de estoque:
-- SELECT *, CASE WHEN estoque_atual <= estoque_minimo THEN 'REPOR' ELSE 'OK' END AS status_estoque
-- FROM estetica.produtos WHERE ativo = TRUE ORDER BY categoria, nome;
