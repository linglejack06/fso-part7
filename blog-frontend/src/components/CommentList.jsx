const Comment = ({ comment }) => {
  return (
    <div className="mb-4 min-h-fit  max-w-lg flex-auto rounded-lg bg-orange-100 p-2 font-semibold ring-2 ring-orange-200">
      {comment}
    </div>
  );
};

const CommentList = ({ comments }) => {
  return (
    <ul className="mt-4 flex-col">
      {comments.map((comment) => {
        return <Comment key={comment} comment={comment} />;
      })}
    </ul>
  );
};

export default CommentList;
