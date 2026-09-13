const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")


/**
 * Generates an interview report based on the user's resume and provided descriptions
 * @param {@description} req 
 * @param {*} res 
 */
async function generateInterviewReportController(req,res) {
    const { selfDescription = "", jobDescription = "" } = req.body || {}

    if (!jobDescription?.trim()) {
        return res.status(400).json({
            message: "Please provide a job description."
        })
    }

    let resumeContent = ""

    if (req.file && req.file.buffer) {
        const fileBuffer = req.file.buffer
        const fileName = req.file.originalname || ""

        try {
            const isPdf = fileName.toLowerCase().endsWith(".pdf") || (req.file.mimetype || "").includes("pdf")

            if (isPdf) {
                const parsedResume = await pdfParse(fileBuffer)
                resumeContent = parsedResume.text || ""
            } else {
                resumeContent = fileBuffer.toString("utf8")
            }
        } catch (error) {
            resumeContent = fileBuffer.toString("utf8")
        }
    }

    if (!resumeContent.trim() && !selfDescription?.trim()) {
        return res.status(400).json({
            message: "Please upload a resume or provide a self description."
        })
    }

    const interviewReportByAi = await generateInterviewReport({
        resume: resumeContent,
        selfDescription,
        jobDescription
    })

    const fallbackTitle = jobDescription.trim().split(/\s+/).slice(0, 6).join(" ") + " Interview Report"

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        jobDescription,
        resume: resumeContent,
        selfDescription,
        title: interviewReportByAi?.title || fallbackTitle,
        ...interviewReportByAi
    })

    res.status(201).json({
        message: "Interview Report generated successfully",
        interviewReport
    })
}


/**
 * Controller to get an interview report by its ID
 * @param {{params: {interviewId: string}}} req 
 * @param {*} res 
 * @returns {Promise<void>}
 */
async function getInterviewReportByIdController(req,res) {
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id:interviewId , user:req.user.id})

    if(!interviewReport) {
        return res.status(404).json({
            message: "Interview Report not found"
        })
    }

    res.status(200).json({
        message: "Interview Report fetched successfully",
        interviewReport
    })
}

/**
 * @description Controller to get all interview reports of the logged-in user
 */
async function getAllInterviewReportsController(req,res) {
    const interviewReports = await interviewReportModel
        .find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behaviouralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview Reports fetched successfully",
        interviewReports
    })
}

module.exports={ generateInterviewReportController, getInterviewReportByIdController, getAllInterviewReportsController }