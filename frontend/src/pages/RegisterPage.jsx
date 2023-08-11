import { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import FormContainer from '../components/FormContainer';
import { setCredentials } from '../slices/authSlice';
import { useRegisterMutation } from '../slices/usersApiSlice';
function RegisterPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [role, setRole] = useState('patient');
  const [licenseId, setLicenseId] = useState('none');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [register, { isLoading, error }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const redirect = '/login';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
  console.log(error?.data.error);
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    } else {
      try {
        const res = await register({
          firstName,
          lastName,
          email,
          password,
          phoneNumber,
          role,
          licenseId,
        }).unwrap();

        dispatch(setCredentials({ ...res }));
      } catch (error) {
        error && toast.error(error?.data.error);
      }
    }
  };

  return (
    <FormContainer>
      <h1>Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='firstName' className='my-2'>
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter first name'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='lastName' className='my-2'>
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter last name'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='email' className='my-2'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='password' className='my-2'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='confirmPassword' className='my-2'>
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='phoneNumber' className='my-2'>
          <Form.Label>Phone Number</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter phone number'
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='role' className='my-2'>
          <Form.Label>Role</Form.Label>
          <Form.Select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value='patient'>Patient</option>
            <option value='doctor'>Doctor</option>
          </Form.Select>
        </Form.Group>
        {role === 'doctor' && (
          <Form.Group controlId='licenseId' className='my-2'>
            <Form.Label>Doctor License</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter doctor license'
              value={licenseId}
              onChange={(e) => setLicenseId(e.target.value)}
            />
          </Form.Group>
        )}
        <Button
          type='submit'
          variant='primary'
          className='mt-2'
          disabled={isLoading}
        >
          Register
        </Button>
      </Form>
      <Row className='my-2'>
        <Col>
          Already have an account?
          <Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
            Login
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default RegisterPage;
