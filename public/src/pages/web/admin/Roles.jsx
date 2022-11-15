import React, { useState } from 'react'
import Table from '../../../components/Table'
import { FaEdit, FaPlus, FaTrash, FaUsersCog } from 'react-icons/fa'
import Modal from '../../../components/Modal'
import { Input } from '../../../components/FormRenders';

const RenderActions = ({ data }) => {
    
    const [openEdit, setOpenEdit] = useState(false)
    const [openDelete, setOpenDelete] = useState(false)

    const handleDelete = () => {
        setOpenDelete(false)
    }
    const handleEdit = () => {
        setOpenEdit(false)
    }
    const [role, setRole] = useState(data.title)
    const handleChangeInput = (e) => setRole(e.target.value)
    return (
        <div className='table-actions'>
            <Modal
                open={openEdit} setOpen={setOpenEdit}
                header={<React.Fragment><FaEdit /> Edit Role Title</React.Fragment>}
                body={
                    <React.Fragment>
                        <Input height='50px' inputType={'text'} value={role} name="role" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 5px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)',marginBottom:'20px' }} />
                        <button onClick={handleEdit} className='btn bg-success'>Update!</button>
                    </React.Fragment>
                }
            >
                <button className='btn'><FaEdit /></button>
            </Modal>
            <Modal
                open={openDelete} setOpen={setOpenDelete}
                header={<React.Fragment><FaTrash /> Delete Role</React.Fragment>}
                body={
                    <React.Fragment>
                        <div className="body">
                            Are you sure you want to delete this role?
                        </div>
                        <button onClick={handleDelete} className='btn bg-danger'>Delete</button>
                    </React.Fragment>
                }
            >
                <button className='btn'><FaTrash /></button>
            </Modal>
        </div>
    )
}

const Roles = () => {
    const [openAdd, setOpenAdd] = useState(false)
    const [newRole, setNewRole] = useState('')
    
    const handleChangeInput = e => setNewRole(e.target.value)

    const handleAdd = () => {
        setOpenAdd(false)
    }
    return (
        <div className='admin-child'>
            <div className="title"><FaUsersCog /> Manage Roles</div>
            <Table
                tableHeaders={['S/N.', 'Role Title', 'No. of Contestants', 'Actions']}
                tableRows={[
                    ['1.', 'President', '0', <RenderActions data={{_id:'', title:'title goes inhere'}} />],
                    ['2.', 'Vice-President', '0', <RenderActions data={{_id:'', title:'title goes inhere'}} />],
                    ['3.', 'Secretary General', '0', <RenderActions data={{_id:'', title:'title goes inhere'}} />],
                    ['4.', 'Assistant Secretatry General', '0', <RenderActions data={{_id:'', title:'title goes inhere'}} />],
                    ['5.', 'Treasurer', '0', <RenderActions data={{_id:'', title:'title goes inhere'}} />],
                ]}
            />
            <Modal
                open={openAdd} setOpen={setOpenAdd}
                header={<React.Fragment><FaPlus /> Add New Role</React.Fragment>}
                body={
                    <React.Fragment>
                        <Input height='50px' inputType={'text'} value={newRole} name="role" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 5px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)',marginBottom:'20px' }} />
                        <button onClick={handleAdd} className='btn bg-success'>Add!</button>
                    </React.Fragment>
                }
            >
                <button className='btn add'><FaPlus /></button>
            </Modal>
        </div>
    )
}

export default Roles
