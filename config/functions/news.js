require('dotenv').config()
const axios = require('axios')

const url = 'https://newsapi.org/v2/everything?' +
            'q=circular_economy&' +
            'from=2021-08-01&' +
            'sortBy=publishedAt&' +
            `apiKey=${process.env.NEWS_API_KEY}`

module.exports = async () => {
    console.log('Refreshing news data...')
    const old = await strapi.query('article').find({_limit: -1})
    old.map(article => article.id).forEach(oldId => {
        strapi.query('article').delete({ id: oldId })
    })

    const { data } = await axios.get(url).catch(error => {
        console.log(error.message)
    })

    const articles = data.articles.length < 5
                    ? data.articles
                    : data.articles.slice(0, 5)

    articles.forEach(article => {
        strapi.query('article').create({
            Title: article.title,
            Description: article.description,
            URL: article.url
        })
    })
    console.log('Done!')
}