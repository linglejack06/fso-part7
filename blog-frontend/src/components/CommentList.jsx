const Comment = ({ comment }) => {
  return <div>{comment}</div>;
};

const CommentList = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => {
        return <Comment key={comment} comment={comment} />;
      })}
    </div>
  );
};

export default CommentList;
