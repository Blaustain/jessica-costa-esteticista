require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const { Pool } = require("pg");

const app = express();

const PORT = process.env.PORT || 3000;

// ======================================================
// CONFIGURAÇÃO DO BANCO
// ======================================================

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
});

// ======================================================
// MIDDLEWARES
// ======================================================

app.use(cors({
    origin: process.env.CORS_ORIGIN || "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ======================================================
// FRONTEND
// ======================================================

app.use(express.static(path.join(__dirname, "..")));

// ======================================================
// TESTE DE CONEXÃO COM BANCO
// ======================================================

pool.query("SELECT NOW()")
    .then(() => {
        console.log("======================================");
        console.log("Banco de dados conectado com sucesso!");
        console.log("======================================");
    })
    .catch((error) => {
        console.error("Erro ao conectar ao PostgreSQL:");
        console.error(error.message);
    });

// ======================================================
// HEALTH CHECK
// ======================================================

app.get("/api/health", async (req, res) => {

    try {

        await pool.query("SELECT 1");

        res.json({
            status: "ok",
            database: "connected"
        });

    } catch (error) {

        console.error("Erro no health check:", error.message);

        res.status(500).json({
            status: "error",
            database: "disconnected",
            message: error.message
        });
    }
});

// ======================================================
// SERVIÇOS
// ======================================================

app.get("/api/services", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id_servico,
                nome,
                descricao,
                categoria,
                duracao_minutos,
                preco,
                ativo
            FROM esteticista.servicos
            WHERE ativo = TRUE
            ORDER BY nome
        `);

        res.json(result.rows);

    } catch (error) {

        console.error("Erro ao buscar serviços:", error.message);

        res.status(500).json({
            error: "Erro ao buscar serviços."
        });
    }
});

// ======================================================
// PRODUTOS
// ======================================================

app.get("/api/products", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                id_produto,
                nome,
                categoria,
                marca,
                descricao,
                unidade_medida,
                quantidade_estoque,
                estoque_minimo,
                preco_custo,
                ativo
            FROM esteticista.produtos
            WHERE ativo = TRUE
            ORDER BY nome
        `);

        res.json(result.rows);

    } catch (error) {

        console.error("Erro ao buscar produtos:", error.message);

        res.status(500).json({
            error: "Erro ao buscar produtos."
        });
    }
});

// ======================================================
// CLIENTES
// ======================================================

app.post("/api/clients", async (req, res) => {

    try {

        const {
            nome,
            telefone,
            email,
            data_nascimento,
            observacoes
        } = req.body;

        if (!nome || !telefone) {

            return res.status(400).json({
                error: "Nome e telefone são obrigatórios."
            });
        }

        const result = await pool.query(`
            INSERT INTO esteticista.clientes
            (
                nome,
                telefone,
                email,
                data_nascimento,
                observacoes
            )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `, [
            nome,
            telefone,
            email || null,
            data_nascimento || null,
            observacoes || null
        ]);

        res.status(201).json(result.rows[0]);

    } catch (error) {

        console.error("Erro ao cadastrar cliente:", error.message);

        res.status(500).json({
            error: "Erro ao cadastrar cliente."
        });
    }
});

// ======================================================
// AGENDAMENTOS
// ======================================================

app.post("/api/appointments", async (req, res) => {

    try {

        const {
            nome,
            telefone,
            email,
            id_servico,
            data_atendimento,
            horario,
            observacoes
        } = req.body;

        if (
            !nome ||
            !telefone ||
            !id_servico ||
            !data_atendimento ||
            !horario
        ) {

            return res.status(400).json({
                error: "Nome, telefone, serviço, data e horário são obrigatórios."
            });
        }

        // ----------------------------------------------
        // Procura cliente existente
        // ----------------------------------------------

        let cliente = await pool.query(`
            SELECT id_cliente
            FROM esteticista.clientes
            WHERE telefone = $1
            LIMIT 1
        `, [telefone]);

        let id_cliente;

        // ----------------------------------------------
        // Cliente novo
        // ----------------------------------------------

        if (cliente.rows.length === 0) {

            const novoCliente = await pool.query(`
                INSERT INTO esteticista.clientes
                (
                    nome,
                    telefone,
                    email
                )
                VALUES ($1, $2, $3)
                RETURNING id_cliente
            `, [
                nome,
                telefone,
                email || null
            ]);

            id_cliente = novoCliente.rows[0].id_cliente;

        } else {

            id_cliente = cliente.rows[0].id_cliente;
        }

        // ----------------------------------------------
        // Cria agendamento
        // ----------------------------------------------

        const agendamento = await pool.query(`
            INSERT INTO esteticista.agendamentos
            (
                id_cliente,
                id_servico,
                data_atendimento,
                horario,
                observacoes,
                origem,
                status
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                'site',
                'pendente'
            )
            RETURNING *
        `, [
            id_cliente,
            id_servico,
            data_atendimento,
            horario,
            observacoes || null
        ]);

        res.status(201).json({
            success: true,
            message: "Agendamento criado com sucesso.",
            agendamento: agendamento.rows[0]
        });

    } catch (error) {

        console.error("Erro ao criar agendamento:", error.message);

        res.status(500).json({
            success: false,
            error: "Erro ao criar agendamento."
        });
    }
});

// ======================================================
// LISTAR AGENDAMENTOS
// ======================================================

app.get("/api/appointments", async (req, res) => {

    try {

        const result = await pool.query(`
            SELECT
                a.id_agendamento,
                c.nome AS cliente,
                c.telefone,
                s.nome AS servico,
                a.data_atendimento,
                a.horario,
                a.observacoes,
                a.origem,
                a.status,
                a.criado_em
            FROM esteticista.agendamentos a

            INNER JOIN esteticista.clientes c
                ON c.id_cliente = a.id_cliente

            INNER JOIN esteticista.servicos s
                ON s.id_servico = a.id_servico

            ORDER BY
                a.data_atendimento DESC,
                a.horario DESC
        `);

        res.json(result.rows);

    } catch (error) {

        console.error("Erro ao buscar agendamentos:", error.message);

        res.status(500).json({
            error: "Erro ao buscar agendamentos."
        });
    }
});

// ======================================================
// ROTA PRINCIPAL
// ======================================================

app.get("/api", (req, res) => {

    res.json({
        message: "API Jéssica Costa Esteticista",
        version: "1.0.0",
        status: "online"
    });

});

// ======================================================
// TRATAMENTO DE ERRO
// ======================================================

app.use((err, req, res, next) => {

    console.error("Erro interno:", err);

    res.status(500).json({
        error: "Erro interno do servidor."
    });

});

// ======================================================
// SERVIDOR
// ======================================================

app.listen(PORT, () => {

    console.log("");
    console.log("======================================");
    console.log(" JÉSSICA COSTA — ESTÉTICA E BEM-ESTAR");
    console.log("======================================");
    console.log(` API: http://localhost:${PORT}`);
    console.log(` Health: http://localhost:${PORT}/api/health`);
    console.log("======================================");
    console.log("");

});