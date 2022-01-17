const db = require("../models/index");
const axios = require("axios");
require('dotenv').config();

exports.sendContent = async (context, myTimer) => {
  try {
      if (myTimer.IsPastDue){
    const posts = await axios(
      `${process.env[MYDNA_FEED_BACKEND_URL]}api/postAdmin/randomPosts`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = posts.data; 

    const allUsers = await db.users.findAll({
      where: {
        id: 26,
      },
      attributes: ["id", "name", "email"],
    });

    allUsers.forEach(async (element) => {
      try {
        await axios({
          method: "post",
          url: `https://api.hubapi.com/marketing/v3/transactional/single-email/send?hapikey=${process.env[HUBSPOT_APIKEY_KEY]}`,
          data: {
            "emailId": 62380645696,
            "message": {
              "to": element.email,
              "from": "Testando os testes <sender@hubspot.com>",
            },
            "contactProperties": {
              "name": "firstname",
              "value": element.name
            },
            "customProperties":
            {
              "firstPostTitle": data[0].title,
              "firstPostDesc": data[0].content,
              "secondPostTitle": data[1].title,
              "secondPostDesc": data[1].content,
              "thirdPostTitle": data[2].title,
              "thirdPostDesc": data[2].content,
              "fourthPostTitle": data[3].title,
              "fourthPostDesc": data[3].content,
              "fifthPostTitle": data[4].title,
              "fifthPostDesc": data[4].content
            }
          }
        });
      } catch (err) {
        context.error(err);
      }
    });

    context.res.send({ message: "Ok, check the console" });
      }
  } catch (error) {
    context.res.status(500).send({
      message: error.message || "Some error occurred.",
    });
    context.error(error);
  }
};