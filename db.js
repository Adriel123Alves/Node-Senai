import { Pool } from "pg";

export async function connect(){

    if(global.connection){
        return global.connection.connect();
    }
    
    const pool = new Pool({
        connectionString : process.env.CONNECTION_STRING,
    });

    const client = await pool.connect();
    console.log("Criou o pool de conexão! ");

    const res = await client.query("SELECT now()")
    console.log(res.rows[0]);
    client.release();

    global.connection = pool;
    return pool.connect();
}

export async function pegarPalavra() {
    const client = await connect();
    
    try {
        // const query = `
        //     UPDATE repositorio 
        //     SET inativa = now() 
        //     WHERE id_palavra = floor(random() * 599 + 1)
        //     RETURNING palavra;
        // `;

        const query = `
            UPDATE repositorio
            SET inativa = now()
            WHERE id_palavra = (
                SELECT id_palavra
                FROM repositorio
                WHERE id_palavra != floor(random() * 600 + 1)
                ORDER BY random()
                LIMIT 1
            )
            RETURNING palavra;
        `;
        
        const res = await client.query(query);
        
        return res.rows[0]; 
        
    } catch (error) {
        console.error("Erro ao pegar palavra:", error);
        throw error;
    } finally {
        if (client.release) client.release(); 
        else if (client.end) await client.end();
    }
}
