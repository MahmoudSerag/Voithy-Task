import React from 'react';
import { Card, Col, Row } from 'react-bootstrap';
import DoctorCard from '../components/DoctorCard';
import { useGetDoctorsQuery } from '../slices/usersApiSlice';
import { Alert } from 'react-bootstrap';

function HomePage() {
  const { data, isLoading, error } = useGetDoctorsQuery();
  return (
    <>
      <h1>Doctors List</h1>
      <Row>
        {error ? (
          <Alert variant='danger'> Login as a patient to book a doctor </Alert>
        ) : (
          data?.doctors.map((doctor) => (
            <Col sm={12} md={6} lg={4} className='my-2' key={doctor._id}>
              <DoctorCard doctor={doctor} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
}

export default HomePage;
