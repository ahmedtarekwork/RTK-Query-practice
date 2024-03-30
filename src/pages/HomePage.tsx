import { useEffect } from "react";
import { Link } from "react-router-dom";
import useDispatch from "../hooks/useDispatch";
import { useSelector } from "react-redux";
import { useGetUsersQuery } from "../store/api/usersApi";
import { StateType } from "../store/store";
import { setUsers } from "../store/usersSlice";

const HomePage = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state: StateType) => state.user);

  const { isError, isLoading, data, error } = useGetUsersQuery();

  useEffect(() => {
    if (!isError && data) dispatch(setUsers(data));
  }, [data, isError, dispatch]);

  if (isLoading) return <h1>Loading...</h1>;

  if (isError && error)
    return (
      <h1>{error instanceof Error ? error.message : "faild to get users"}</h1>
    );

  return (
    <>
      <h1 className="home-page-title">Users List</h1>
      <ul>
        {users.map(({ id, name, phone, username }) => (
          <li key={id} className="user">
            <Link to={`/user/${id}`}>
              name: {name} <br />
              username : {username} <br />
              phone : {phone} <br />
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};
export default HomePage;
