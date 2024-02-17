import { LabeledInput } from "@/components/LabeledInput";
import { NotSignedIn } from "@/components/NotSignedIn";
import { IndexTable } from "@/components/IndexTable";
import { RuleRow } from "@/components/RuleRow";
import { useAlgolia } from "@/hooks/useAlgolia";
import { signOut, useSession } from "next-auth/react";
import React from "react";

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
    copyRule
  } = useAlgolia();

  const handleCopyButtonClick = (name: string, objectID: string) => {
    setModalState({
      status: "open",
      sourceIndex: name,
      targetIndex: "",
      objectID
    });
  }


  if (!session) return <NotSignedIn />;

  return (
    <main className="flex h-screen w-full justify-center">
      <div className="flex flex-col items-center w-9/10">
        <h1 className="text-4xl font-bold mt-4">Algolia Assessment</h1>
        {session && session.user && (
          <p className="text-xl">Current User: {session.user.email}</p>
        )}
        <button
          className="bg-red-500 font-bold rounded-full py-2 px-4 my-4"
          onClick={() => signOut()}
        >Log out
        </button>
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
          indices.map(({name, rules}) => (
            <IndexTable key={name} name={name}>
              {rules.map(({objectID, description}) => (
                <RuleRow 
                  key={`${name}-${objectID}`}
                  objectID={objectID}
                  description={description}
                  onCopy={() => handleCopyButtonClick(name, objectID)}
                />
              ))}
            </IndexTable>
          ))
        ) : null}
        { modalState.status === "open" ? (
          <Modal
            setTargetIndex={(value) => setModalState({
              ...modalState,
              targetIndex: value
            })}
            options={indices.map(({ name }) => name).filter((name) => name !== modalState.sourceIndex)}
          />
        ) : null}
      </div>
    </main>
  );
}

type ModalProps = {
  setTargetIndex: (value: string) => void;
  handleCopyRule: () => void;
  closeModal: () => void;
  options: string[];
};

const Modal: React.FC<ModalProps> = ({setTargetIndex, handleCopyRule, closeModal, options}) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
  <div className="bg-white p-4 w-96">
    <h2 className="font-bold mb-4 text-black">Choose an index to copy the rule to</h2>
    <div className="relative inline-block w-full text-gray-700">
      <select 
        className="w-full h-10 pl-3 pr-6 text-base placeholder-gray-600 border rounded-lg appearance-none focus:shadow-outline" 
        onChange={(e) => setTargetIndex(e.target.value)}
      >
        {options
          .map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
            
          ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
        <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
          <path d="M7 7l3-3 3 3m0 6l-3 3-3-3" stroke="#648299" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"></path>
        </svg>
      </div>
    </div>
    <button className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={handleCopyRule}>Copy</button>
    <button className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" onClick={closeModal}>Cancel</button>
  </div>
</div>
)