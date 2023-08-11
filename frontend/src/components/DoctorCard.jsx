import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useBookDoctorMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

function DoctorCard({ doctor }) {
  const [bookDoctor, { isLoading: isUploadLoading }] = useBookDoctorMutation();

  const submitHandler = async (e) => {
    try {
      const res = await bookDoctor(doctor._id);
      console.log(res.error);
      res.error
        ? toast.error('already booked')
        : toast.success('booked successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <Card>
      <Card.Header>
        <Card.Title>
          DR. {doctor.firstName} {doctor.lastName}
        </Card.Title>
      </Card.Header>
      <Card.Body>
        <Card.Text>{'license Id: ' + doctor.licenseId}</Card.Text>
        <Card.Text>{'Email:' + doctor.email}</Card.Text>
        <Card.Text>{'Phone Number: ' + doctor.phoneNumber}</Card.Text>
        <Button variant='primary' type='submit' onClick={() => submitHandler()}>
          Book
        </Button>
      </Card.Body>
    </Card>
  );
}

export default DoctorCard;
