const axios = require('axios')

const url = 'https://www.materiaalitori.fi/api/rfo'

module.exports = async () => {
    const data = await axios.get(url)
    const notices = data.slice(0, 10)

    notices.forEach(notice => {
        strapi.query('notice').create({
            title: notice.title,
            created: notice.created,
            materials: strapi.query('material').create({
                classification: notice.materials[0].classification,
                description: notice.materials[0].description,
                type: notice.materials[0].type,
                isWaste: notice.materials[0].isWaste
            })
        })
    })
}