require('dotenv').config()
const axios = require('axios')

const url = 'https://newsapi.org/v2/everything?' +
            'q=building&' +
            'from=2021-07-10&' +
            'sortBy=publishedAt&' +
            `apiKey=${process.env.NEWS_API_KEY}`

module.exports = async () => {
    const { data } = await axios.get(url)
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
}