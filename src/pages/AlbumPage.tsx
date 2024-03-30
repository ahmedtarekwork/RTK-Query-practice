// react
import { useEffect, useRef } from "react";
// react-router-dom
import { Link, useParams } from "react-router-dom";

// rtk_query
import { getSingleUserLazy } from "../store/api/usersApi";
import { getSingleAlbumLazy, getAlbumPhotosLazy } from "../store/api/albumsApi";
// components
import Modal, { ModalRefType } from "../components/Modal";

const AlbumPage = () => {
  const { id: albumId } = useParams();
  const modalRef = useRef<ModalRefType>(null);

  // rtk_query
  const [
    getAlbum,
    {
      data: album,
      isError: albumError,
      isLoading: albumLoading,
      error: albumErrorData,
    },
  ] = getSingleAlbumLazy();
  const [
    getPhotos,
    {
      data: photos,
      isError: photosError,
      error: photosErrorData,
      isLoading: photosLoading,
    },
  ] = getAlbumPhotosLazy();

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
    if (albumId) getAlbum(albumId);
  }, [getAlbum, albumId]);

  useEffect(() => {
    if (album) {
      getUser(album.userId);
      getPhotos(album.id);
    }
  }, [album, getUser, getPhotos]);

  if (!albumId) return <h1>Id Not Found !</h1>;
  if (albumLoading) return <h1>Loading...</h1>;
  if (albumError || !album)
    return (
      <h1>
        {albumErrorData instanceof Error
          ? albumErrorData.message
          : "something went wrong while showing album"}
      </h1>
    );

  // user content
  let userContent: JSX.Element = <></>;
  if (userError)
    userContent = (
      <p>
        {userErrorData instanceof Error
          ? userErrorData.message
          : "can't get album owner"}
      </p>
    );
  if (userLoading) userContent = <p>Loading Album Owner Data...</p>;
  if (user && !userError) {
    const { name, id, username } = user;
    userContent = (
      <div className="album-owner owner">
        <p>{name}</p>
        <strong>
          <Link className="btn" to={`/user/${id}`} relative="path">
            #{username} profile
          </Link>
        </strong>
      </div>
    );
  }

  let photosContnet: JSX.Element = <></>;
  if (photosLoading) photosContnet = <h3>Loading Photos...</h3>;
  if (photosError)
    photosContnet = (
      <strong>
        {photosErrorData instanceof Error
          ? photosErrorData.message
          : "can't get album photos, try again later"}
      </strong>
    );

  if (photos && !photosError)
    photosContnet = (
      <>
        <h3 className="list-title">Album Photos</h3>
        <ul className="album-photos-list">
          {photos.map((ph) => (
            <li key={ph.id} className="photo">
              <img
                onClick={() => {
                  console.log("open modal with photo =>", ph.url);
                  const modal = modalRef.current;

                  if (modal) {
                    const modalContent = (
                      <div className="modal-content-holder">
                        <div className="modal-placeholder">Loading...</div>
                        <img src={ph.url} alt={ph.title} />
                      </div>
                    );

                    modal.setChild(modalContent);
                    modal.toggleModal();
                  }
                }}
                src={ph.thumbnailUrl}
                alt={ph.title}
              />
              <strong>{ph.title}</strong>
            </li>
          ))}
        </ul>
      </>
    );

  return (
    <>
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any*/}
      <Modal ref={modalRef as any} />

      {userContent}
      <h1 className="album-title">{album.title}</h1>
      {photosContnet}
    </>
  );
};
export default AlbumPage;
