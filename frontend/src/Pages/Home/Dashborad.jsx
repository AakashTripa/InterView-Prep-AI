import React, { useEffect, useState } from 'react'
import { LuPlus } from 'react-icons/lu'
import {CARD_BG} from '../../utils/data'
import toast from 'react-hot-toast'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import SummaryCard from '../../components/Cards/SummaryCard'
import moment from 'moment'
import CreateSessionForm from './CreateSessionForm'
import Modal from '../../components/Modal'
const Dashborad = () => {
const navigate =useNavigate();

const [openCreateModal,setOpenCreateModal]=useState(false);
const [sessions,setSessions]=useState([]);

const[openDeleteAlert,setOpenDeleAlert]=useState({
  open:false,
  data:null
});

const fetchAllSessions = async () => {
  try {
    const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
    const data = response.data;

    // Example adjustment: if the actual sessions are under data.sessions
    setSessions(Array.isArray(data) ? data : data.sessions || []);
    console.log("session",sessions)
  } catch (error) {
    console.log("Error fetching session data:", error);
  }
};

const deleteSession=async(sessionData)=>{}

useEffect(()=>{
  fetchAllSessions();
},[]);
  return (
    <DashboardLayout>
<div className='container mx-auto pt-4 pb-4'>
  <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0'>
 {
  sessions.length === 0 ? (
    <p>No sessions available yet.</p>
  ) : (
    sessions.map((data, index) => (
      <SummaryCard
        key={index}
        colors={CARD_BG[index % CARD_BG.length]}
        role={data?.role || ""}
        topicsToFocus={data?.topicsToFocus || ""}
        experience={data?.experience || "_"}
        questions={data?.questions?.length || "_"}
        description={data?.description || ""}
        lastUpdated={
          data?.updatedAt
            ? moment(data.updatedAt).format("DD MMM YYYY")
            : ""
        }
        onSelect={() => navigate(`/interview-prep/${data?._id}`)}
        onDelete={() => setOpenDeleAlert({ open: true, data })}
      />
    ))
  )
}

  </div>
  <button
  className='h-12 md:h-h12 flex items-center justify-cemter gap-3 bg-linear-to-r from-[#FF9324] to-[#e99a4b] text-sm font-semibold text-white px-7 py-2.5 rounded-full hover:bg-black hover:text-white transition-colors cursor-pointer hover:shadow-2xl hover:shadow-orange-300 fixed bottom-10 md:bottom-20 right-10 md-right-20 '
  onClick={()=>setOpenCreateModal(true)}
  >
    <LuPlus className='text-2xl text-white'/>
    Add New 
  </button>
</div>

<Modal
isOpen={openCreateModal}
onClose={()=>{
 setOpenCreateModal(false) 
}}
hideHeader
>
<div>
  <CreateSessionForm/>
</div>

</Modal>
    </DashboardLayout>
  )
}

export default Dashborad