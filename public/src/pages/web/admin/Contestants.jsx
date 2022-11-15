import React, { useState } from 'react'
import Table from '../../../components/Table'
import { FaEdit, FaPlus, FaTrash, FaUserCheck } from 'react-icons/fa'
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
    const [contestant, setContestant] = useState(data.name)
    const [cposition, setCposition] = useState(data.position)

    const handleSetPosition = e => setCposition(e.target.value)
    const handleChangeInput = (e) => setContestant(e.target.value)
    return (
        <div className='table-actions'>
            <Modal
                open={openEdit} setOpen={setOpenEdit}
                header={<React.Fragment><FaEdit /> Edit Contestant Data</React.Fragment>}
                body={
                    <React.Fragment>
                        <Input height='50px' inputType={'text'} value={contestant} name="contestant" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 5px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)', marginBottom: '20px' }} />
                        <select className='select' onChange={handleSetPosition}>
                            <option value=''>--Select Position Contesting for--</option>
                            <option value='President'>President</option>
                            <option value='vPresident'>President</option>
                        </select>
                        <button onClick={handleEdit} className='btn bg-success'>Update Contestant Data!</button>
                    </React.Fragment>
                }
            >
                <button className='btn'><FaEdit /></button>
            </Modal>
            <Modal
                open={openDelete} setOpen={setOpenDelete}
                header={<React.Fragment><FaTrash /> Delete Contestant Data</React.Fragment>}
                body={
                    <React.Fragment>
                        <div className="body">
                            Are you sure you want to delete this Contestant?
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


const Contestants = () => {
    const [openAdd, setOpenAdd] = useState(false)
    const [NewContestant, setNewContestant] = useState('')
    const [cposition, setCposition] = useState('')

    const handleChangeInput = e => setNewContestant(e.target.value)
    const handleSetPosition = e => setCposition(e.target.value)

    const handleAdd = () => {
        setOpenAdd(false)
    }
    return (
        <div className='admin-child'>
            <div className="title"><FaUserCheck /> Manage Contestants</div>
            <Table
                tableHeaders={['S/N.', 'Full Name', 'Position Contesting', 'Actions']}
                tableRows={[
                    ['1.', 'Ajibo Chidera Promise', 'President', <RenderActions data={{ _id: '', position:'', names: 'Ajibo Chidera Promise' }} />],
                    ['2.', 'Ajibo Chidera Promise', 'Vice-President', <RenderActions data={{ _id: '', position:'', names: 'Ajibo Chidera Promise' }} />],
                    ['3.', 'Ajibo Chidera Promise', 'Secretary General', <RenderActions data={{ _id: '', position:'', names: 'Ajibo Chidera Promise' }} />],
                    ['4.', 'Ajibo Chidera Promise', 'Assistant Secretatry General', <RenderActions data={{ _id: '', position:'', names: 'Ajibo Chidera Promise' }} />],
                    ['5.', 'Ajibo Chidera Promise', 'Treasurer', <RenderActions data={{ _id: '', position:'', names: 'Ajibo Chidera Promise' }} />],
                ]}
            />
            <Modal
                open={openAdd} setOpen={setOpenAdd}
                header={<React.Fragment><FaPlus /> Add Contestant</React.Fragment>}
                body={
                    <React.Fragment>
                        <Input height='50px' placeholder={'Enter Full Name'} inputType={'text'} value={NewContestant} name="role" onChange={handleChangeInput} boxStyle={{ boxShadow: '0 0 5px var(--siteGreen)', border: '1px solid rgba(119, 21, 168, 0.1)', marginBottom: '20px' }} />
                        <select className='select' onChange={handleSetPosition}>
                            <option value=''>--Select Position Contesting for--</option>
                            <option value='President'>President</option>
                            <option value='vPresident'>President</option>
                        </select>
                        <button onClick={handleAdd} className='btn bg-success'>Add!</button>
                    </React.Fragment>
                }
            >
                <button className='btn add'><FaPlus /></button>
            </Modal>
        </div>
    )
}

export default Contestants
