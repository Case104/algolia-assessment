import { LabeledInput } from "@/components/LabeledInput";
import { NotSignedIn } from "@/components/NotSignedIn";
import { IndexTable } from "@/components/IndexTable";
import { RuleRow } from "@/components/RuleRow";
import { Modal } from "@/components/Modal";
import { useAlgolia } from "@/hooks/useAlgolia";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import Link from "next/link";

export default function Home() {
  const { data: session } = useSession();
  const [modalState, setModalState] = React.useState({
    status: "closed",
    sourceIndex: "",
    targetIndex: "",
    objectID: ""
  });

  const { 
    appId,
    apiKey,
    indices,
    setAppId,
    setApiKey,
    loadIndices,
    copyRule,
    deleteRule,
  } = useAlgolia();

  function handleCopyRule() {
    const { sourceIndex, targetIndex, objectID } = modalState;
    setModalState({
      ...modalState,
      status: "closed"
    });
    copyRule({ sourceIndex, targetIndex, objectID });
    }

  function handleDeleteRule(name: string, objectID: string) {
    deleteRule(name, objectID);
  }

  if (!session) return <NotSignedIn />;

  return (
    <main className="flex h-screen w-full justify-center">
      <div className="flex flex-col items-center w-9/10">
        <h1 className="text-4xl font-bold mt-4">Algolia Assessment</h1>
        {session && session.user && (
          <p className="text-xl">Current User: {session.user.email}</p>
        )}
        <div>
          <button
            className="bg-red-500 font-bold rounded-full py-2 px-4 my-4"
            onClick={() => signOut()}
          >Log out
          </button>
          <Link href="/lorcana">
            <button className="bg-purple-500 font-bold rounded-full py-2 px-4 my-4 mx-2">
              Lorcana
            </button>
          </Link>
        </div>
        <div className="w-full max-w-xs">
          <LabeledInput
            id="algoliaAppId"
            label="Algolia App ID"
            value={appId}
            onChange={(e) => setAppId(e.target.value)}
          />
          <LabeledInput
            id="algoliaApiKey"
            label="Algolia API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <button
          className="bg-green-500 font-bold rounded-full py-2 px-4 my-4"
          onClick={loadIndices}
        >Load Indices
        </button>
        {indices.length > 0 ? (
          <div className="w-full">
            <h2 className="text-2xl font-bold">Indices</h2>
              {indices.map(({name, rules}) => (
                <IndexTable key={name} name={name}>
                  {rules.map(({objectID, description}) => (
                    <RuleRow 
                      key={`${name}-${objectID}`}
                      objectID={objectID}
                      description={description}
                      onCopy={() =>  setModalState({
                                      status: "open",
                                      objectID,
                                      sourceIndex: name,
                                      targetIndex: ((indices) => {
                                        const firstOther = indices.find((index) => index.name !== name);
                                        return firstOther ? firstOther.name : "";
                                      })(indices)
                                    })}
                      onDelete={() => handleDeleteRule(name, objectID)}
                    />
                  ))}
                </IndexTable>
              ))}
            </div>
            ) : null}
        { modalState.status === "open" ? (
          <Modal
            setTargetIndex={(value: string) => setModalState({
              ...modalState,
              targetIndex: value
            })}
            options={indices.map(({ name }) => name).filter((name) => name !== modalState.sourceIndex)}
            handleCopyRule={handleCopyRule}
            closeModal={() => setModalState({ ...modalState, status: "closed" })}
          />
        ) : null}
      </div>
    </main>
  );
}

