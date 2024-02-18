type RuleRowProps = {
    objectID: string;
    description: string;
    onCopy: () => void;
    onDelete: () => void;
};

export const RuleRow: React.FC<RuleRowProps> = ({
  objectID, 
  description, 
  onCopy, 
  onDelete
}) => (
  <>
    <div>{objectID}</div>
    <div className="col-span-3">{description}</div>
    <button
      className="bg-blue-500 font-bold rounded-full"
      onClick={onCopy}
    >Copy
    </button>
    <button
      className="bg-red-500 font-bold rounded-full"
      onClick={onDelete}
    >Delete
    </button>
  </>
);