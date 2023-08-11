import { Button, Table } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { toast } from 'react-toastify';
import { useGetUsersQuery } from '../slices/usersApiSlice';

function PatientListPage() {
  const { data, refetch, isLoading, error } = useGetUsersQuery();
  console.log(data?.user.patients);

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure')) {
      try {
        await deleteUser(id);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1>Patients</h1>
      <Table striped bordered hover responsive className='table-sm'>
        <thead>
          <tr>
            <th>ID</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {data?.user.patients.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{`${user.firstName} ${user.lastName} `}</td>
              <td>
                <a href={`mailto:${user.email}`}>{user.email}</a>
              </td>

              <td>
                {!user.isAdmin && (
                  <>
                    <LinkContainer
                      to={`/profile/d/${user._id}/edit`}
                      style={{ marginRight: '10px' }}
                    >
                      <Button variant='light' className='btn-sm'>
                        <i className='fas fa-edit'></i>
                      </Button>
                    </LinkContainer>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default PatientListPage;
