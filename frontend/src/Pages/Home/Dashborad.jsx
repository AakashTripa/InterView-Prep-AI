import React, { useEffect, useState } from 'react';
import { LuPlus } from 'react-icons/lu';
import { CARD_BG } from '../../utils/data';
import toast from 'react-hot-toast';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import SummaryCard from '../../components/Cards/SummaryCard';
import moment from 'moment';
import CreateSessionForm from './CreateSessionForm';
import Modal from '../../components/Modal';
import DeleteAlertContent from '../../components/DeleteAlertContent';
import { motion } from 'framer-motion';

const Dashborad = () => {
  const navigate = useNavigate();
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [sessions, setSessions] = useState([]);

  const [openDeleteAlert, setOpenDeleAlert] = useState({
    open: false,
    data: null,
  });

  const fetchAllSessions = async () => {
    try {
      const response = await axiosInstance.get(API_PATHS.SESSION.GET_ALL);
      const data = response.data;
      setSessions(Array.isArray(data) ? data : data.sessions || []);
      console.log('session', sessions);
    } catch (error) {
      console.log('Error fetching session data:', error);
    }
  };

  const deleteSession = async (sessionData) => {
    try {
      await axiosInstance.delete(API_PATHS.SESSION.DELETE(sessionData?._id));
      toast.success('Session deleted successfully');
      setOpenDeleAlert({ open: false, data: null });
      fetchAllSessions();
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  };

  useEffect(() => {
    fetchAllSessions();
  }, []);

  return (
    <DashboardLayout>
      <div className="container mx-auto pt-4 pb-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-7 pt-1 pb-6 px-4 md:px-0">
          {sessions.length === 0 ? (
            <p className="text-gray-400 italic text-center col-span-full">
              No sessions available yet.
            </p>
          ) : (
            sessions.map((data, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <SummaryCard
                  colors={CARD_BG[index % CARD_BG.length]}
                  role={data?.role || ''}
                  topicsToFocus={data?.topicsToFocus || ''}
                  experience={data?.experience || '_'}
                  questions={data?.questions?.length || '_'}
                  description={data?.description || ''}
                  lastUpdated={
                    data?.updatedAt
                      ? moment(data.updatedAt).format('DD MMM YYYY')
                      : ''
                  }
                  onSelect={() => navigate(`/interview-prep/${data?._id}`)}
                  onDelete={() => setOpenDeleAlert({ open: true, data })}
                />
              </motion.div>
            ))
          )}
        </div>

        {/* Floating Add Button */}
        <button
          className="h-12 md:h-12 flex items-center justify-center gap-3 bg-gradient-to-r from-teal-400 to-blue-600 text-sm font-semibold text-white px-7 py-2.5 rounded-full 
            hover:from-blue-700 hover:to-teal-500 hover:shadow-lg transition-colors cursor-pointer fixed bottom-10 md:bottom-20 right-10 md:right-20"
          onClick={() => setOpenCreateModal(true)}
          aria-label="Add New Session"
        >
          <LuPlus className="text-2xl text-white" />
          Add New
        </button>
      </div>

      {/* Create Session Modal */}
      <Modal
        isOpen={openCreateModal}
        onClose={() => {
          setOpenCreateModal(false);
        }}
        hideHeader
      >
        <div>
          <CreateSessionForm />
        </div>
      </Modal>

      {/* Delete Session Modal */}
      <Modal
        isOpen={openDeleteAlert?.open}
        onClose={() => {
          setOpenDeleAlert({ open: false, data: null });
        }}
        title="Delete Session"
      >
        <div className="w-[90vw] md:w-[30vw]">
          <DeleteAlertContent
            content="Are you sure you want to delete this session?"
            onDelete={() => deleteSession(openDeleteAlert?.data)}
          />
        </div>
      </Modal>
    </DashboardLayout>
  );
};

export default Dashborad;
