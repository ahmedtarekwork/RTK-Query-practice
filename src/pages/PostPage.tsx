// react
import { useEffect } from "react";

// react-router-dom
import { useParams, Link } from "react-router-dom";

// rtk_query
import { getSinglePostLazy, getPostCommentsLazy } from "../store/api/postsApi";
import { getSingleUserLazy } from "../store/api/usersApi";

const PostPage = () => {
  const { id: postId } = useParams();

  const [
    getPost,
    {
      data: post,
      isError: postError,
      isLoading: postLoading,
      error: postErrorData,
    },
  ] = getSinglePostLazy();

  const [
    getComments,
    {
      data: comments,
      isError: commentsError,
      isLoading: commentsLoading,
      error: commentsErrorData,
    },
  ] = getPostCommentsLazy();

  const [
    getUser,
    {
      data: user,
      isError: userError,
      isLoading: userLoading,
      error: userErrorData,
    },
  ] = getSingleUserLazy();

  useEffect(() => {
    if (postId) getPost(postId).then(() => getComments(postId));
  }, [getComments, getPost, postId]);

  useEffect(() => {
    if (post) getUser(post.userId);
  }, [post, getUser]);

  if (!postId) return <h1>No Post Id Founded !</h1>;
  if (postLoading) return <h1>Loading...</h1>;
  if (postError)
    return (
      <h1>
        {postErrorData instanceof Error
          ? postErrorData.message
          : "can't get this post with id " + postId}
      </h1>
    );

  if (post) {
    const { body, title } = post;

    // comments JSX content
    let commentsContent: JSX.Element = <></>;

    if (commentsLoading) commentsContent = <h4>loading comments...</h4>;
    if (commentsError)
      commentsContent = (
        <h4>
          {commentsErrorData instanceof Error
            ? commentsErrorData.message
            : "something went wrong while showing comments"}
        </h4>
      );
    if (!commentsError && comments)
      commentsContent = (
        <>
          <h4>Comments on this post</h4>
          <ul>
            {comments.map(({ body, id, name, email }) => (
              <li key={id} className="comment">
                <div>
                  <p>{name}</p>
                  <a href={`mailto:${email}`}>{email}</a>
                </div>
                <p>{body}</p>
              </li>
            ))}
          </ul>
        </>
      );

    // user JSX content
    let userContent: JSX.Element = <></>;

    if (userLoading) userContent = <p>Loading User Data...</p>;
    if (userError)
      userContent = (
        <p>
          {userErrorData instanceof Error
            ? userErrorData.message
            : "can't get post owner data"}
        </p>
      );
    if (!userError && user) {
      const { name, username, id } = user;

      userContent = (
        <div className="post-owner owner">
          <p>{name}</p>
          <strong>
            <Link className="btn" to={`/user/${id}`} relative="path">
              #{username} profile
            </Link>
          </strong>
        </div>
      );
    }

    return (
      <>
        {userContent}

        <h1>{title}</h1>
        <p>{body}</p>
        {commentsContent}
      </>
    );
  }
};
export default PostPage;
