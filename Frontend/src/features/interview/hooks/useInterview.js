import { getAllInterviewReports, generateInterviewReport, getInterviewReportById } from "../services/interview.api";
import {useContext} from "react"
import { InterviewContext } from "../inteview.context.jsx";

export const useInterview = () => {
    const context = useContext(InterviewContext)
    if(!context) {
        throw new Error("useInterview must be used within an InterviewProvider")
    }
    const {loading, setLoading, report, setReport, reports, setReports} = context

    const generateReport = async (jobDescription, selfDescription, resumeFile) => {
        setLoading(true)
        try {
            const data = await generateInterviewReport(jobDescription, selfDescription, resumeFile)
            const result = data?.interviewReport ?? data
            if (result) setReport(result)
            return result
        } catch (error) {
            console.error("Error generating interview report:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReportById = async (interviewId) => {
        setLoading(true)
        try {
            const data = await getInterviewReportById(interviewId)
            const result = data?.interviewReport ?? data
            if (result) setReport(result)
            return result
        } catch (error) {
            console.error("Error fetching interview report by ID:", error)
            return null
        } finally {
            setLoading(false)
        }
    }

    const getReports = async () => {
        setLoading(true)
        try {
            const data = await getAllInterviewReports()
            const result = data?.interviewReports ?? data
            setReports(result)
            return result
        } catch (error) {
            console.error("Error fetching all interview reports:", error)
            return []
        } finally {
            setLoading(false)
        }
    }

    return {
        loading,
        report, 
        reports,
        generateReport,
        getReportById,
        getReports
    }
}          
