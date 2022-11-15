import React, { useState } from 'react'
import Table from '../../../components/Table'
import { FaEdit, FaPlus, FaTrash, FaUserFriends } from 'react-icons/fa'
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
    const [regNo, setregNo] = useState(data.regNo)
    const handleChangeInput = (e) => setregNo(e.target.value)
    return (
        <div className='table-actions'>
            <Modal
                open={openEdit} setOpen={setOpenEdit}
                header={<React.Fragment><FaEdit /> Edit Voter Registration Number</React.Fragment>}
                body={
                    <React.Fragment>
                        <Input height='50px' inputType={'number'} value={regNo} name="regNo" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 5px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)', marginBottom: '20px' }} />
                        <button onClick={handleEdit} className='btn bg-success'>Update!</button>
                    </React.Fragment>
                }
            >
                <button className='btn'><FaEdit /></button>
            </Modal>
            <Modal
                open={openDelete} setOpen={setOpenDelete}
                header={<React.Fragment><FaTrash /> Delete Voter</React.Fragment>}
                body={
                    <React.Fragment>
                        <div className="body">
                            Are you sure you want to delete this Voter?
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


const Voters = () => {

    const [openAdd, setOpenAdd] = useState(false)
    const [newVoter, setNewVoter] = useState('')

    const handleChangeInput = e => setNewVoter(e.target.value)

    const handleAdd = () => {
        setOpenAdd(false)
    }
    return (
        <div className='admin-child'>
            <div className="title"><FaUserFriends /> Manage Voters</div>
            <Table
                tableHeaders={['S/N.', 'Registration number', 'Actions']}
                tableRows={[
                    ['1.', '20181076543', <RenderActions data={{ _id: '', regNo: '20186365727672' }} />],
                    ['2.', '20181076543', <RenderActions data={{ _id: '', regNo: '20186365727672' }} />],
                    ['3.', '20181076543', <RenderActions data={{ _id: '', regNo: '20186365727672' }} />],
                    ['4.', '20181076543', <RenderActions data={{ _id: '', regNo: '20186365727672' }} />],
                    ['5.', '20181076543', <RenderActions data={{ _id: '', regNo: '20186365727672' }} />],
                ]}
            />
            <Modal
                open={openAdd} setOpen={setOpenAdd}
                header={<React.Fragment><FaPlus /> Add New Voter</React.Fragment>}
                body={
                    <React.Fragment>
                        <Input height='50px' inputType={'number'} placeholder={'Enter Registration Number'} value={newVoter} name="voter" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 5px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)', marginBottom: '20px' }} />
                        <button onClick={handleAdd} className='btn bg-success'>Add!</button>
                    </React.Fragment>
                }
            >
                <button className='btn add'><FaPlus /></button>
            </Modal>
        </div>
    )
}

export default Voters
