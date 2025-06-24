import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import { AnimatePresence, motion } from "framer-motion";
import { LuCircleAlert, LuListCollapse } from "react-icons/lu";
import SpinnerLoader from "../../components/Loader/SpinnerLoader";
import { toast } from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import RoleInfoHeader from "../../components/RoleInfoHeader";

import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import QuestionCard from "../../components/Cards/QuestionCard";
import Drawer from "../../components/Drawer";
import AIResponsePreview from "../../components/AIResponsePreview";
import SkeletonLoader from "../../components/Loader/SkeletonLoader";

const InterviewPrep = () => {
  const { sessionId } = useParams();
  const [sessionData, setSessionData] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const [openLeanMoreDrawer, setOpenLeanMoreDrawer] = useState(false);
  const [explanation, setExplanation] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdateLoader, setIsUpdateLoader] = useState(false);
const [isQuestionsLoading, setIsQuestionsLoading] = useState(true);
  const fetchSessionDetailsById = async () => {
    try {
         setIsQuestionsLoading(true);
      const response = await axiosInstance.get(
        API_PATHS.SESSION.GET_ONE(sessionId)
      );
      if (response.data && response.data.session) {
        setSessionData(response.data.session);
      }
    } catch (error) {
      console.log("Error:", error);
    }finally{
      setIsQuestionsLoading(false);
    }
  };

  const generateConceptExplanation = async (question) => {
    try {
      setErrorMsg("");
      setExplanation(null);
      setIsLoading(true);
      setOpenLeanMoreDrawer(true);

      const response = await axiosInstance.post(
        API_PATHS.AI.GENERATE_EXPLANATION,
        {
          question,
        }
      );
      setExplanation(response.data);
    } catch (error) {
      setExplanation(null);
      setErrorMsg("Failed to generate explanation, Try again Later");
      console.log("Error", error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleQuestionPinStatus = async (questionId) => {
    try {
      const response = await axiosInstance.put(
        API_PATHS.QUESTION.PIN(questionId)
      );
      toast.success(response.data?.message || "Pin status updated");
      fetchSessionDetailsById();
    } catch (error) {
      console.error("Pin error:", error);
      toast.error("Failed to update pin status");
    }
  };

  const uploadMoreQuestions = async () => {
    try {
      setIsUpdateLoader(true);
      const aiResponse = await axiosInstance.post(
        API_PATHS.AI.GENERATE_QUESTIONS,
        {
          role: sessionData?.role,
          experience: sessionData?.experience,
          topicsToFocus: sessionData?.topicsToFocus,
          numberOfQuestions: 10,
        }
      );

      const generatedQuestions = aiResponse.data;

      const response = await axiosInstance.post(
        API_PATHS.QUESTION.ADD_TO_SESSION,
        {
          sessionId,
          questions: generatedQuestions,
        }
      );
      if (response.data) {
        toast.success("Added More Questions and answers!!");
        fetchSessionDetailsById();
      }
    } catch (error) {
      if (error.response && error.response.data.message) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Something went wrong, Please Try again later");
      }
    } finally {
      setIsUpdateLoader(false);
    }
  };

  useEffect(() => {
    if (sessionId) {
      fetchSessionDetailsById();
    }
    return () => {};
  }, []);

  const sortedQuestions = [...(sessionData?.questions || [])].sort((a, b) => {
    if (a.isPinned === b.isPinned) return 0;
    return a.isPinned ? -1 : 1;
  });

  return (
    <DashboardLayout>
      <RoleInfoHeader
        role={sessionData?.role || ""}
        topicsToFocus={sessionData?.topicsToFocus || ""}
        experience={sessionData?.experience || "_"}
        questions={sessionData?.questions?.length || "_"}
        description={sessionData?.description || ""}
        lastUpdated={
          sessionData?.updatedAt
            ? moment(sessionData?.updatedAt).format("DD-MM-YYYY")
            : ""
        }
        className="bg-blue-50 text-blue-900"
      />
      <div className="container mx-auto pt-6 pb-6 px-6 md:px-0 bg-gradient-to-b from-blue-50 via-white to-white min-h-screen">
        <h2 className="text-xl font-bold text-blue-800 mb-6 border-b border-blue-200 pb-2">
          Interview Q &amp; A
        </h2>

        <div className="grid grid-cols-12 gap-6 mt-6 mb-12">
          <div
            className={`col-span-12 ${
              openLeanMoreDrawer ? "md:col-span-7" : "md:col-span-8"
            }`}
          > {isQuestionsLoading ? (
              // Show 5 skeleton loaders as placeholder
              <>
                {[...Array(5)].map((_, idx) => (
                  <SkeletonLoader key={idx} className="mb-6" />
                ))}
              </>
            ) : (
              <AnimatePresence>
                {sortedQuestions.map((data, index) => (
                  <motion.div
                    key={data._id || index}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{
                      duration: 0.4,
                      type: "spring",
                      damping: 15,
                      stiffness: 100,
                      delay: index * 0.1,
                    }}
                    layout
                    layoutId={`Question-${data._id || index}`}
                  >
                    <>
                      <QuestionCard
                        question={data?.question}
                        answer={data?.answer}
                        onLearnMore={() => {
                          generateConceptExplanation(data?.question);
                        }}
                        isPinned={data?.isPinned}
                        onTogglePin={() => {
                          toggleQuestionPinStatus(data?._id);
                        }}
                        className="bg-white border border-blue-200 shadow-sm hover:shadow-md"
                      />

                      {!isLoading &&
                        sessionData?.questions?.length === index + 1 && (
                          <div className="flex items-center justify-center mt-6">
                            <button
                              className="flex items-center gap-3 text-sm font-semibold text-white bg-blue-700 px-6 py-2 rounded-md cursor-pointer hover:bg-blue-800 transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
                              disabled={isLoading || isUpdateLoader}
                              onClick={uploadMoreQuestions}
                            >
                              {isUpdateLoader ? (
                                <SpinnerLoader />
                              ) : (
                                <LuListCollapse className="text-lg" />
                              )}{" "}
                              Load More
                            </button>
                          </div>
                        )}
                    </>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>

        <div>
          <Drawer
            isOpen={openLeanMoreDrawer}
            onClose={() => setOpenLeanMoreDrawer(false)}
            title={!isLoading && explanation?.title}
            className="bg-white text-blue-900"
          >
            {errorMsg && (
              <p className="flex gap-2 text-sm text-red-600 font-medium">
                <LuCircleAlert className="mt-1" /> {errorMsg}
              </p>
            )}
            {isLoading && <SkeletonLoader />}
            {!isLoading && explanation && (
              <AIResponsePreview
                answer={explanation?.explaination}
                className="prose prose-blue max-w-none"
              />
            )}
          </Drawer>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default InterviewPrep;
