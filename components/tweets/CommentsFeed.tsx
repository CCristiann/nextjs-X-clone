import Comment from "./Comment";

type CommentsFeedProps = {
  comments: Array<object>;
};

const CommentsFeed: React.FC<CommentsFeedProps> = ({ comments }) => {
  if (comments.length === 0) return null;

  return (
    <div className="">
      {comments.map((comment, index: number) => (
        <Comment key={index} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsFeed;
