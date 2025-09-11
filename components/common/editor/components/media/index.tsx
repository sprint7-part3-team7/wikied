import { ContentState, ContentBlock } from 'draft-js';

interface MediaComponentProps {
  contentState: ContentState;
  block: ContentBlock;
}

const Media = ({ contentState, block }: MediaComponentProps) => {
  const entityKey = block.getEntityAt(0);
  if (!entityKey) {
    return null;
  }

  const entity = contentState.getEntity(entityKey);
  const { src } = entity.getData();

  return (
    <img
      src={src}
      alt="Uploaded content"
      width={500}
      height={300}
      style={{ maxWidth: '100%', height: 'auto' }}
    />
  );
};

export default Media;
