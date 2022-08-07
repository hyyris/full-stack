import { Table } from 'react-bootstrap'

const Users = ({ users }) => {
  return (
    <>
      <h2>Users</h2>
      <Table>
        <tbody>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                {user.username}
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </>
  );
};

export default Users;
