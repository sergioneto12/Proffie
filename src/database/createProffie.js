module.exports = async function(db, {proffieValue, classValue, classScheduleValues}) {
    //inserir dados na tabela de teacher

    const insertedProffie = await db.run(`
        INSERT INTO proffies (
            name,
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffieValue.name}",
            "${proffieValue.avatar}",
            "${proffieValue.whatsapp}",
            "${proffieValue.bio}"
        );
    `) //esse await faz a substituição do .then() e evita a criação de mais uma função

    const proffie_id = insertedProffie.lastID
    //inserir dados na tabela classes
    const insertedClass = await db.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffie_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffie_id}"
            );
    `)

    const class_id = insertedClass.lastID

    //inserir dados na tabela class_schedule

    const insertedAllClassesValues = classScheduleValues.map((classScheduleValue) => {
        return db.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to
            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    //aqui vou executar todos os db.run das classes classSchedules
    await Promise.all(insertedAllClassesValues)
}