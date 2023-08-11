import { useEffect, useState } from 'react';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  useGetUserDetailsQuery,
  useSendMessageMutation,
  useUpdateUserMutation,
} from '../slices/usersApiSlice';
import FormContainer from './FormContainer';
function EditPatient() {
  const { id: patientId } = useParams();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const {
    data: user,
    isLoading,
    error,
    refetch,
  } = useGetUserDetailsQuery(patientId);

  const [updateUser, { isLoading: isUploadLoading }] = useUpdateUserMutation();

  const [sendMessage, { isLoading: isMessageLoading }] =
    useSendMessageMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ patientId, firstName, lastName }).unwrap();
      toast.success('patient updated successfully');
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const messageHandler = async (e) => {
    e.preventDefault();
    try {
      await sendMessage({ patientId, message }).unwrap();
      toast.success('message sent successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  useEffect(() => {
    if (user) {
      setFirstName(user?.patient.patient.firstName);
      setLastName(user?.patient.patient.lastName);
    }
  }, [user]);

  return (
    <>
      <Link to='/profile/d' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Edit User</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>first Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter firstName'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='lastName'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter lastName'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='lastName'>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter Phone Number'
              value={user?.patient.patient.phoneNumber}
              readOnly></Form.Control>
          </Form.Group>

          <Form.Group className='my-2' controlId='email'>
            <Form.Label>Email </Form.Label>
            <Form.Control
              type='email'
              readOnly
              value={user?.patient.patient.email}></Form.Control>
          </Form.Group>

          <Button type='submit' variant='primary'>
            Update
          </Button>
        </Form>
      </FormContainer>

      <FormContainer>
        <Form onSubmit={messageHandler}>
          <Form.Group className='my-2' controlId='name'>
            <Form.Label>Send Mail</Form.Label>
            <Form.Control
              type='text'
              value={message}
              onChange={(e) => setMessage(e.target.value)}></Form.Control>
          </Form.Group>
          <Button className=' mt-2' type='submit' variant='primary'>
            Send
          </Button>
        </Form>
      </FormContainer>
    </>
  );
}

export default EditPatient;
