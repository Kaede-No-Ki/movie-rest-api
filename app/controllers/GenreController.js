const axios = require('axios').default;
const cheerio = require("cheerio");
const {baseUrl} = require("../helpers/Constant");

class GenreController{
    genreList = (req,res) =>{
        axios.get(baseUrl).then(response =>{
            const $ = cheerio.load(response.data);
            const elements = $('.sub-container');
            let obj = {};
            let genreList = [];
            obj.status = true;
            obj.message = 'succes';
            elements.find('ul >li').each((i, elem)=>{
                genreList.push({
                    genre_title : $(elem).find('a').text(),
                    genre_id : $(elem).find('a').attr('href').replace(baseUrl,''),
                    genre_link : $(elem).find('a').attr('href')
                })
                obj.genre_list = genreList;
            })
            res.send(obj)
        })
    }
}
module.exports = new GenreController();