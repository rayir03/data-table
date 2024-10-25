import { useState } from "react"


const DataTable = () => {

    const [formData, setFormData ] = useState({ name: "", gender: "", age: "" });

    const [data, setData ] = useState([])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value})
    }
    const handleAddClick = () => {
        if(formData.name && formData.gender && formData.age) {
            const newItem = {
                id: Date.now(),
                name: formData.name,
                gender: formData.gender,
                age: formData.age

            };
            setData([...data, newItem]);
            setFormData({ name: "", gender: "", age: "" });
        }
    }

  return (
    <div className="container">
      <div className="add-container">
        <div className="info-container">
            <input type="text" placeholder="Name" name="name" value={formData.name} onChange={handleInputChange}/>

            <input type="text" placeholder="Gender" name="gender" value={formData.gender} onChange={handleInputChange}/>

            <input type="text" placeholder="Age" name="age" value={formData.age} onChange={handleInputChange}/>
        </div>
        <button className="add" onClick={handleAddClick}>add</button>
      </div>

      <div className="search-table-container">
        <input type="text" placeholder="Search by name" value={""} onChange={() => {}} className="search-input"/>

        <table>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {/* <tr>
                    <td>John Doe</td>
                    <td>Male</td>
                    <td>23</td>
                    <td>
                        <button className="edit">Edit</button>
                        <button className="delete">Delete</button>
                    </td>
                </tr> */}
            </tbody>
        </table>
        <div className="pagination"></div>
      </div>
    </div>
  )
}

export default DataTable
