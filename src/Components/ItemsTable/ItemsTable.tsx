import axios from "axios";

const ItemsTable = (props: any) => {
  const { items } = props;

  const handleDeleteItem = (itemID: string) => {
    axios.delete(`http://localhost:5000/inventory/${itemID}`).then(() => {
      window.location.reload();
    });
  };

  return (
    <div className="w-100 h-100 pt-1">
      <table className="table table-striped border border-1">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
            <th>Price</th>
            <th>Operations</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item: any) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.location}</td>
              <td>{item.price}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    handleDeleteItem(item.id);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ItemsTable;
