import express from "express";
import * as dotenv from "dotenv";
import { createApi } from "unsplash-js";

dotenv.config();

const unsplashApi = createApi({
  accessKey: process.env.UNSPLASH_ACCESS_KEY,
});

const router = express.Router();

router.route("/").get(async (req, res) => {
  const { prompt } = req.query;

  try {
    if (unsplashApi) {
      const searchObj = {
        count: 27,
      };
      if (prompt) {
        searchObj.query = prompt;
      }
      const photo = await unsplashApi.photos.getRandom(searchObj);

      let array = [];
      let temparr = [];
      photo.response.forEach((item) => {
        if (temparr.length === 9) {
          array.push(temparr);
          temparr = [];
        }
        temparr.push(item);
      });
      array.push(temparr);

      res.status(200).json({ data: array });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
