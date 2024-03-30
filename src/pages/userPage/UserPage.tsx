// react
import { useEffect, useRef } from "react";
// react-router-dom
import { useParams } from "react-router-dom";

// RTK_Query
import { getSingleUserLazy } from "../../store/api/usersApi";

import { getUserTodosLazy } from "../../store/api/todosApi";
import { getUserPostsLazy } from "../../store/api/postsApi";
import { getUserAlbumsLazy } from "../../store/api/albumsApi";

// components
import SingleUserTopic from "./SingleUserTopic";

const UserPage = () => {
  const topicsHolderRef = useRef<HTMLDivElement>(null);

  const { id } = useParams();

  const [getUser, { data, isError, error, isLoading }] = getSingleUserLazy();

  useEffect(() => {
    if (id) getUser(id);
  }, [getUser, id]);

  if (!id) return <h1>Something Went Wrong, Please Try Again</h1>;
  if (isLoading) return <h1>Loading...</h1>;
  if (isError)
    return (
      <h1>{error instanceof Error ? error.message : "faild to get user !"}</h1>
    );

  if (data) {
    const { name, username, phone, website, id, email } = data;

    const topics: {
      topicName: "posts" | "albums" | "todos";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      getUserTopicLazy: any;
    }[] = [
      {
        topicName: "posts",
        getUserTopicLazy: getUserPostsLazy,
      },
      {
        topicName: "todos",
        getUserTopicLazy: getUserTodosLazy,
      },
      {
        topicName: "albums",
        getUserTopicLazy: getUserAlbumsLazy,
      },
    ];

    return (
      <>
        <h1>{name} profile's</h1>
        <p>
          <strong>#{username}</strong>
        </p>

        <div className="user-data-holder">
          <ul>
            <li>
              <p>user id: {id}</p>
            </li>
            <li>
              <p>
                phone: <a href={`tel:${phone}`}>{phone}</a>
              </p>
            </li>
            <li>
              <p>
                website:{" "}
                <a target="_blank" href={"https://" + website}>
                  {website}
                </a>
              </p>
            </li>
            <li>
              <p>
                email: <a href={`mailto:${email}`}>{email}</a>
              </p>
            </li>
          </ul>
        </div>

        <ul className="topics">
          {topics.map(({ topicName }, i) => (
            <li key={topicName} className="topic-btn">
              <button
                onClick={() => {
                  const topicsHolder = topicsHolderRef.current;

                  if (topicsHolder) {
                    const theTopics = [
                      ...topicsHolder.querySelectorAll("[data-topic]"),
                    ] as HTMLUListElement[];

                    theTopics.forEach((top) => {
                      top.style.translate = -i * 100 + "%";
                    });
                  }
                }}
              >
                {topicName}
              </button>
            </li>
          ))}
        </ul>

        <div className="big-holder">
          <div
            className="real-topics-holder"
            ref={topicsHolderRef}
            style={{
              width: `calc(${topics.length} * 100%)`,
            }}
          >
            {topics.map((top) => (
              <SingleUserTopic key={top.topicName} userId={id} {...top} />
            ))}
          </div>
        </div>
      </>
    );
  }
  return <h1>something went wrong, try again later</h1>;
};
export default UserPage;
