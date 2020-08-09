const { subjects, weekdays, getSubjec, convertHoursToMinutest } = require('./utils/format')

const Database = require('./database/db')

function pageLanding(req, res) {
    return res.render("index.html")
}

async function study(req, res) {
    const filters = req.query

    if (!filters.subjects || !filters.weekdays || !filters.time) {

        return res.render("study.html", { filters, subjects, weekdays })

    }
    //converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query = `
        SELECT classes.*, proffies.*
        FROM proffies
        JOIN classes ON (classes.proffie_id = proffies.id)
        WHERE EXISTS (
            SELECT class_schedule.*
            FROM class_schedule
            WHERE class_schedule.class_id = classes.id
            AND class_schedule.weekday = ${filters.weekdays}
            AND class_schedule.time_from <= ${timeToMinutes}
            AND class_schedule.time_from > ${timeToMinutes}
        )
        AND classes.subject = '$(filters.subject)'   
    `

    //caso haja erro na busca do banco de dados
    try {
        const db = await Database
        const proffies = await db.all(query)

        return res.render('study.html', proffies, subjects, filters, weekdays)


    } catch (error) {
        console.log(error)
    }
}

function giveClasses(req, res) {
    var data = req.query

    var isNotEmpty = Object.keys(data).length > 0;
    //adicionar data ao lista de proffies
    if (isNotEmpty) {

        data.subject = getSubject(data.subject)
        proffies.push(data)

        return res.redirect("/study")
    }

    return res.render("give-classes.html", { subjects, weekdays })
}

module.exports = {
    pageLanding,
    study,
    giveClasses
}