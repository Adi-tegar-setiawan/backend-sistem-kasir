const dasboard = async (req, res) => {
    res.status(200).json({
        success: true,
        message: 'welcome admin',
        user : req.user
    })
}

module.exports = {
    dasboard
}