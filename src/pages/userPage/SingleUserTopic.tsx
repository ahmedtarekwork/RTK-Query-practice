import { Link } from "react-router-dom";
import { ComponentProps, useEffect } from "react";
import { AlbumType, PostType, TodoType } from "../../types";
import { getCommentsLazy } from "../../store/api/postsApi";

type Props = {
  userId: string | number;
  topicName: "posts" | "todos" | "albums";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getUserTopicLazy: any;
};

const SingleUserTopic = ({
  userId,
  getUserTopicLazy,
  topicName,
  ...attr
}: Props & ComponentProps<"ul">) => {
  const [getUserTopicData, { data, isError, isLoading, error }] =
    getUserTopicLazy();

  // for posts
  const [getComments, commentsData] = getCommentsLazy();

  useEffect(() => {
    if (userId) getUserTopicData(userId);
  }, [getUserTopicData, userId]);

  useEffect(() => {
    if (topicName === "posts") getComments();
  }, [getComments, topicName]);

  if (!userId) return <h1>user Id didn't found !</h1>;

  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return (
      <h1>
        {error instanceof Error ? error.message : `can't get user ${topicName}`}
      </h1>
    );

  if (!data) return <h1>something went wrong while showing posts</h1>;

  return (
    <ul className={`${topicName}-topic`} data-topic={topicName} {...attr}>
      {data.map((topic: PostType | AlbumType | TodoType) => {
        const { id, title } = topic;

        if (topicName === "posts") {
          const { data, isError, isLoading, error } = commentsData;

          let content: string = "";

          if (isLoading) content = "Loading...";
          else if (isError)
            content =
              error instanceof Error ? error.message : "Unknown Comments";
          else if (!isError && data)
            content =
              data.filter((com) => com.postId === id).length + " Comments";

          return (
            <li className="post" id={id.toString()} key={id}>
              <h2>
                <Link to={`/post/${id}`}>{title}</Link>
              </h2>
              <p>{(topic as PostType).body}</p>
              <p>{content}</p>
            </li>
          );
        }

        if (topicName === "todos") {
          return (
            <li
              className={`todo ${
                (topic as TodoType).completed ? "checked" : ""
              }`}
              id={id.toString()}
              key={id}
            >
              <p>{title}</p>
            </li>
          );
        }

        return (
          <li className="album" id={id.toString()} key={id}>
            <Link
              to={`/album/${id}`}
              relative="path"
              style={{
                textDecoration: "none",
              }}
            >
              <p>{title}</p>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default SingleUserTopic;
