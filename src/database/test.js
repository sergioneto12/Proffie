const Database = require('./db')
const createProffie = require('./createProffie')

Database.then(async (db) => {
    // inserir dados

    proffieValue = {
        name: "Cuca Beludo",
        avatar: "https://avatars0.githubusercontent.com/u/68286883?s=460&v=4",
        whatsapp: "11456321588", 
        bio: "Entusiasta das melhores tecnologias de química avançada.<br><br> Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões", 
 
    }

    classValue = {
        subject: "Química", 
        cost: "20,00",
        // o proffy id vira pelo banco de dados
    }

    classScheduleValues = [
        {

        weekday: 2, 
        time_from: 1450, 
        time_to: 1920 
        },
        {
        weekday: 1, 
        time_from: 1450, 
        time_to: 1920

         },
    
    ]

    await createProffie(db, {proffieValue, classValue, classScheduleValues})
    //consultar dados inseridos

    //todos os proffies
    const selectedProffies = await db.all("SELECT * FROM proffies")
        //console.log(selectedProffies)

    //consultar as classes de um certo professor  e trazer os dados dele junto

    const selectClassesAndProffies = await db.all(`
        SELECT classes.*, proffies.*
        FROM proffies
        JOIN classes ON (classes.proffie_id = proffies.id)
        WHERE classes.proffie_id = 1; 
    `)

    //nconsole.log(selectedProffies)

    // o horario que a pessoa trabalha...
    // o horario de time_from precisa ser antes ou == ao horario solicitado
    // o time_to precisa ser acima

    const selectClassesSchedule = await db.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "2"
        AND class_schedule.time_from <= "420"
        AND class_schedule.time_from > "820"
    `)

    console.log(selectClassesSchedule)

})