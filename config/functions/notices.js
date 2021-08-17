const axios = require('axios')

const url = 'https://www.materiaalitori.fi/api/rfo'

module.exports = async () => {

    console.log('Fetching notices')
    
    const { data } = await axios.get(url).catch(error => console.log(error.message))
    const notices = data.slice(0, 3)
    
    console.log('Data sliced')

    for (notice of notices) {
        
        console.log('Setting up notice...')
        
        const materials = notice.materials
        const materialArr = []

        for (material of materials) {
            console.log('Creating material...')
            const createdMaterial = await strapi.query('material').create({
                classification: material.classification,
                description: material.description,
                type: material.type,
                isWaste: material.isWaste
            })

            console.log('Created material:')
            console.log(createdMaterial)

            materialArr.push(createdMaterial)

            console.log('Material pushed')
        }

        console.log(materialArr)
        console.log('Creating notice...')
        
        await strapi.query('notice').create({
            title: notice.title,
            rfoType: notice.rfoType,
            created: notice.created,
            materials: materialArr
        })
        .catch(error => console.log(error.message))

        console.log('Notice created')
    }
    console.log('Done!')
}