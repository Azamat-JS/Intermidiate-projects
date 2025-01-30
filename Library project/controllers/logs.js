const { fetchLogs } = require('../service/fetchlog')

const getLogs = async(req, res) => {
    try {
        const logs = await fetchLogs()
        res.status(200).json(logs)
    } catch (error) {
        res.status(500).json({error: "Failed to fetch logs"})
    }
}

module.exports = getLogs