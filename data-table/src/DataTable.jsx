import { useEffect, useState } from "react"


const DataTable = () => {

    const [formData, setFormData ] = useState({ name: "", gender: "", age: "" });
    const [data, setData ] = useState([]);
    const [ editId, setEditId ] = useState(false);
    const outdideCkick = useRef(false);
    useEffect(()=> {
        if(!editId) return;
        let selectedItem = document.querySelectorAll(`[id="${editId}"]`)
        selectedItem[0].focus();
    }, [editId]);

    useEffect(()=> {
        const handleClickOutside = (event) => {
            if(outdideCkick.current && !outdideCkick.current.contains(event.target)) {
                setEditId(false);
            }
        }
        document.addEventListener("click", handleClickOutside)
        return () => {
            document.removeEventListener("click", handleClickOutside);
        }
    },[])



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

    const handleDelete = (id) => {
        const updatedList = data.filter((item)=> item.id !== id )
        setData(updatedList);
    }

    const handleEdit = (id, updatedData) => {
        if(!editId || editId !== id) {
            return
        }
        const updatedList = data.map((item) => item.id === id ? {...item, ...updatedData} : item);
        setData(updatedList);
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

        <table ref={outdideCkick}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
               {data.length > 0 ? (
                data.map((item) => (
                    <tr key={item.id}>
                        <td id={item.id} contentEditable={editId === item.id} onBlur={(e)=> handleEdit(item.id, {name: e.target.innerText})}>{item.name}</td>
                        <td id={item.id} contentEditable={editId === item.id} onBlur={(e)=> handleEdit(item.id, {gender: e.target.innerText})}>{item.gender}</td>
                        <td id={item.id} contentEditable={editId === item.id} onBlur={(e)=> handleEdit(item.id, {age: e.target.innerText})}>{item.age}</td>
                        <td className="actions">
                            <button className="edit" onClick={()=> setEditId(item.id)}>Edit</button>
                            <button className="delete" onClick={() => handleDelete(item.id)}>Delete</button>
                        </td>
                    </tr>
                ))
               ) : (
                <tr>
                    <td colSpan="4">No data available</td>
                </tr>
               )}
                
            </tbody>
        </table>
        <div className="pagination"></div>
      </div>
    </div>
  )
}

export default DataTable
