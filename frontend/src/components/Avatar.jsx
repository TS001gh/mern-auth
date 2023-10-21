/* eslint-disable no-unused-vars */
import { useDispatch, useSelector } from 'react-redux';
import { useUploadAvatarMutation } from '../slices/usersApiSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
const Avatar = () => {
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formData = new FormData();

  const [setAvatar, { isLoading, isSuccess }] = useUploadAvatarMutation();
  const { userInfo } = useSelector((state) => state.auth);
  console.log(userInfo);

  const submitImage = async (e) => {
    e.preventDefault();
    formData.append('image', image);

    try {
      const res = await setAvatar(formData).unwrap();
      console.log(res);
      dispatch(setCredentials(res));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const onInputChange = (e) => {
    setImage(e.target.files[0]);
  };
  return (
    <div>
      <Form onSubmit={submitImage} encType="multipart/form-data">
        <Form.Group className="my-2" controlId="avatar">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            name="image"
            accept="image/*"
            onChange={onInputChange}
          ></Form.Control>
        </Form.Group>
        <Button type="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default Avatar;
