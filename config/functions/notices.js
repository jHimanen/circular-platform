const axios = require('axios')

const url = 'https://www.materiaalitori.fi/api/rfo'

module.exports = async () => {

    console.log('Fetching notices')
    
    const { data } = await axios.get(url).catch(error => console.log(error.message))
    const notices = data.slice(0, 3)
    
    for (notice of notices) {
                
        const materials = notice.materials
        const materialArr = []

        for (material of materials) {
            const createdMaterial = await strapi.query('material').create({
                classification: material.classification,
                description: material.description,
                type: material.type,
                isWaste: material.isWaste
            })

            materialArr.push(createdMaterial)
        }
        
        await strapi.query('notice').create({
            title: notice.title,
            rfoType: notice.rfoType,
            created: notice.created,
            materials: materialArr
        })
        .catch(error => console.log(error.message))
    }
    console.log('Done!')
}