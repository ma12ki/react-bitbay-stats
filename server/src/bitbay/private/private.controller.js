const service = require('./private.service');

const status = async (req, res) => {
    const value = await service.status();
    res.send(value);
};

const statusRefresh = async (req, res) => {
    const value = await service.statusRefresh();
    res.send(value);
};

module.exports = {
    status,
    statusRefresh,
};
