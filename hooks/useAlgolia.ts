import { useState } from 'react';
import algoliasearch from 'algoliasearch/lite'

type copyRuleParams = {
  sourceIndex: string;
  targetIndex: string;
  objectID: string;
};

interface UseAlgoliaReturn {
  appId: string;
  apiKey: string;
  indices: Index[];
  setAppId: React.Dispatch<React.SetStateAction<string>>;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  loadIndices: () => Promise<void>;
  copyRule: (params: copyRuleParams) => void;
  deleteRule: (index: string, objectID: string) => void;
  loadCards: () => Promise<void>;
  client: any;
};

interface Index {
  name: string;
  rules: Rule[];
};

interface Rule {
  objectID: string;
  description: string;
};

export function useAlgolia(): UseAlgoliaReturn {
  const [appId, setAppId] = useState(process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || '');
  const [apiKey, setApiKey] = useState(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY || '');
  const [indices, setIndices] = useState<Index[]>([]);
  const client = algoliasearch(appId, apiKey);

  async function loadIndices() {
    try {
      const response = await fetch("/api/getIndices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ algoliaAppId: appId, algoliaApiKey: apiKey }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setIndices(data.indices);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function copyRule({ sourceIndex, targetIndex, objectID }: copyRuleParams) {
    try {
      const response = await fetch("/api/copyRule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          algoliaAppId: appId,
          algoliaApiKey: apiKey,
          sourceIndex,
          targetIndex,
          objectID,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setTimeout(async () => await loadIndices(), 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  async function deleteRule(index: string, objectID: string) {
    try {
      const response = await fetch("/api/deleteRule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          algoliaAppId: appId,
          algoliaApiKey: apiKey,
          index,
          objectID,
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      setTimeout(async () => await loadIndices(), 1000);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function loadCards() {
    try {
      const response = await fetch("/api/loadCards", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ algoliaAppId: appId, algoliaApiKey: apiKey, indexName: "cards" }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      console.log('loaded', data);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return {
    appId,
    apiKey,
    client,
    indices,
    setAppId,
    setApiKey,
    loadIndices,
    copyRule,
    deleteRule,
    loadCards
  };
}
