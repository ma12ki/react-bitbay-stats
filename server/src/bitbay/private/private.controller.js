const { status: statusService } = require('./private.service');

const status = async (req, res) => {
    const value = await statusService();
    res.send(value);
};

module.exports = {
    status,
};
