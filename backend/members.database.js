function requireFreshTable (database) {
    try {
        database.query("DROP TABLE members")
    } finally {
        database.query(`
            CREATE TABLE members (
                id          INT             NOT NULL    AUTO_INCREMENT    PRIMARY KEY,
                position    varchar(255),
                experience  varchar(255),
                wage        int         ,
                name        varchar(255)
            )
        `)
    }
}

/**
 * @param {object} args
 * @param {import("mysql2/promise").Connection} database a promise-based connection to the database
 */
export default function makeMemebersDatabase ({ database }) {
    requireFreshTable(database)
    
    return {
        findAll,
        create,
        update,
        remove
    }

    async function findAll () {
        const [ members = undefined ] = await database.query(
            "SELECT * FROM members"
        )

        return members
    }

    async function create ({ position, experience, wage, name }) {
        const [ results = undefined ] = await database.execute(
            "INSERT INTO members (`position`, `experience`, `wage`, `name`) VALUES (?, ?, ?, ?)",
            [position, experience, wage, name]
        ).catch(err => {
            console.error('Error while creating a new member:', err)
            return []
        })

        return results && { id: results.insertId, position, experience, wage, name }
    }

    async function update (id, { position, experience, wage, name }) {
        const [ results = undefined ] = await database.execute(
            "UPDATE members SET `position` = ?, `experience` = ?, `wage` = ?, `name` = ? WHERE id = ?",
            [position, experience, wage, name, id],
        ).catch(err => {
            console.error('Error while updating a member:', err)
            return []
        })

        return results && { id, position, experience, wage, name }
    }

    async function remove (id) {
        const [ member = undefined ] = await database.execute(
            "DELETE FROM members WHERE id = ?",
            [id]
        ).catch(err => {
            console.error('Error while deleting a member:', err)
            return []
        })

        return member
    }
}
