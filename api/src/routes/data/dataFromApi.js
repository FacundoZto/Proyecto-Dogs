require("dotenv").config();
const axios = require("axios");
const { API_KEY } = process.env;
//TRAIGO LA DATA DE LA API

const dataFromApi = async () => {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`
    );

    const dataApi = apiUrl.data.map((d) => {
      return {
        id: d.id,
        name: d.name,
        height: d.height.metric,
        weight: d.weight.metric.includes("NaN")
          ? "weight not found"
          : d.weight.metric,
        life_span: d.life_span,
        temperament: d.temperament,
        image: d.image?.url,
      };
    });

    return dataApi;
  } catch (err) {
    console.log(err);
  }
};

module.exports = dataFromApi;
