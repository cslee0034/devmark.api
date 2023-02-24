import * as ogs from 'open-graph-scraper';

export const openGraphScraper = async (req, res, next) => {
  try {
    const options = { url: req.body.URL };
    await ogs(options).then((data) => {
      const { error, result, response } = data;

      if (result.ogImage) {
        req.body = { ...req.body, img: result.ogImage };
      }
    });
  } catch (error) {
    next();
  }
  next();
};
