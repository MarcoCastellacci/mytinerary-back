const Cities = require('../models/city');

const citiesControllers = {
    getCities: async (req, res) => {
        // let cities
        // let error = null
        try {
            const cities = await Cities.find();
            // console.log("respuesta de GetCities", cities);
            res.json({
                response: cities,
                success: true
            });
        } catch (err) {
            console.error("Error fetching cities:", err);
            res.json({
                response: 'ERROR',
                success: false,
                error: err
            });
        }
    },
    getOneCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await Cities.findOne({ _id: id })
        }
        catch (err) { error = err }
        console.log(error)
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },
    addCity: async (req, res) => {
        const { name, country, info, image } = req.body
        let city
        let error = null
        try {
            city = await new Cities({
                name: name,
                country: country,
                info: info,
                image: image
            }).save()
        }
        catch (err) { error = err }
        console.log(error)
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },
    modifyCity: async (req, res) => {
        const id = req.params.id
        const city = req.body.data
        let citydb
        let error = null
        try {
            citydb = await Cities.findOneAndUpdate({ _id: id }, city, { new: true })
        }
        catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : citydb,
            success: error ? false : true,
            error: error
        })
    },
    addMultipleCity: async (req, res) => {
        const data = req.body.data
        let city
        let error = null
        try {
            data.map(async (item) => {
                await new Cities({
                    name: item.name,
                    country: item.country,
                    info: item.info,
                    image: item.image
                }).save()
            })
        }
        catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    },
    removeCity: async (req, res) => {
        const id = req.params.id
        let city
        let error = null
        try {
            city = await Cities.findOneAndDelete({ _id: id })
        }
        catch (err) { error = err }
        res.json({
            response: error ? 'ERROR' : city,
            success: error ? false : true,
            error: error
        })
    }
}
module.exports = citiesControllers