import algoliasearch from "algoliasearch";
import type { NextApiRequest, NextApiResponse } from "next";

interface RequestBody {
  algoliaAppId: string;
  algoliaApiKey: string;
  indexName: string;
}

interface SuccessResponseBody {
  message: string;
}

interface ErrorResponseBody {
  message: string;
  error: string;
}

export default async function handler(
  req: NextApiRequest & { body: RequestBody },
  res: NextApiResponse<SuccessResponseBody | ErrorResponseBody>
) {
  const { algoliaAppId, algoliaApiKey, indexName } = req.body;

  const client = algoliasearch(algoliaAppId, algoliaApiKey);
  const index = client.initIndex(indexName);

  const fetchJsonFromGist = async (gistUrl: string) => {
    const response = await fetch(gistUrl);
    const data = await response.json();
    return data;
  };

  const chunkArray = (array: any[], size: number) => {
    const chunks = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  };

  const processAndSaveData = async (data: any) => {
    const chunks = chunkArray(data, 10000);
    for (const chunk of chunks) {
      await index.saveObjects(chunk, { autoGenerateObjectIDIfNotExist: true });
    }
  };

  const gistUrl = 'https://gist.github.com/Case104/8ca547b183afb3485a9f716f3977cf7c/raw';

  try {
    await index.clearObjects();
    const data = await fetchJsonFromGist(gistUrl);
    await processAndSaveData(data);
    res.status(200).json({ message: "Cards loaded successfully" });
  } catch (error: any) {
    res.status(500).json({ message: "Error loading cards", error: error.message });
  }
}