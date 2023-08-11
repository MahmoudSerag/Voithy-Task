import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setCredentials } from '../slices/authSlice';
import { useGetUsersQuery, useProfileMutation } from '../slices/usersApiSlice';
import PatientListPage from './PatientListPage';

function DoctorProfilePage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  const { data: userProfile, refetch, isLoading, error } = useGetUsersQuery();
  console.log(userProfile?.user);

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success('Profile updated successfully');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row>
        <Col md={userInfo === 'doctor' ? 3 : 6}>
          <h2>User Profile</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name' className='my-2'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                readOnly
                type='text'
                value={`${userProfile?.user.firstName} ${userProfile?.user.lastName} `}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='email' className='my-2'>
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                readOnly
                type='email'
                value={userProfile?.user.email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='phone' className='my-2'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                readOnly
                type='text'
                value={userProfile?.user.phoneNumber}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='licenseId' className='my-2'>
              <Form.Label>licenseId</Form.Label>
              <Form.Control
                readOnly
                type='text'
                value={userProfile?.user.licenseId}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
          </Form>
        </Col>
        <Col md={9}>
          <PatientListPage />
        </Col>
      </Row>
    </>
  );
}

export default DoctorProfilePage;
