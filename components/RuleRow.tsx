type RuleRowProps = {
    objectID: string;
    description: string;
    onCopy: () => void;
};

export const RuleRow: React.FC<RuleRowProps> = ({objectID, description, onCopy}) => (
  <>
    <div>{objectID}</div>
    <div className="col-span-4">{description}</div>
    <button
      className="bg-red-500 font-bold rounded-full py-2 px-4"
      onClick={onCopy}
    >Copy
    </button>
  </>
);