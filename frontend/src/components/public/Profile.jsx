import React, { useEffect, useState } from 'react'
import { useUser } from '../../hooks/useUser'
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Profile = () => {

  const { user, getUser, deleteUser, getSession, msgError, msgSuccess } = useUser();

  const { id } = useParams();

  const [modal, setModal] = useState(false);
  const navigate = useNavigate();



  const openModal = () => {
    setModal(true)
  }

  const closeModal = () => {
    setModal(false)
  }

  const handleDelete = async () => {
    await deleteUser(user._id)
    await getSession();
    setTimeout(() => {
      navigate('/');
      window.location.reload();
    }, 2000);
  }


  useEffect(() => {
    getUser(id);
  }, [id]);


  return (
    <section>
      {user ? (
        <>
          <h1>Hi, {user.name} {user.surname}!</h1>
          <NavLink to={`/update-user/${user._id}`}>Update User</NavLink>
          <button onClick={openModal}>Delete User</button>
          {modal && (
            <>
              <p>Are you sure you want to delete your user?</p>
              <button onClick={handleDelete}>Confirm</button>
              <button onClick={closeModal}>Cancel</button>
            </>
          )}
        </>
      ) : (

        <p>Profile not found.</p>
      )}
    </section>
  )
}

export { Profile }