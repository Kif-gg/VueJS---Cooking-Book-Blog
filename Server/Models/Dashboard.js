const { Schema, model } = require("mongoose");

const dashboardSchema = new Schema({
    usersDashboard: {
        totalRegistered: {
            type: [Date],
            default: []
        },
        totalDeleted: {
            type: [Date],
            default: []
        }
    },
    recipesDashboard: {
        totalCreated: {
            type: [Date],
            default: []
        },
        totalDeleted: {
            type: [Date],
            default: []
        }
    },
    reviewsDashboard: {
        totalPosted: {
            type: [Date],
            default: []
        },
        totalDeleted: {
            type: [Date],
            default: []
        }
    }
});

const Dashboard = model("Dashboard", dashboardSchema);

async function getSingleInstance() {
    if (!(await Dashboard.findOne({}))) {
        await Dashboard.create({});
    }
    return Dashboard.findOne({});
};

module.exports = {
    getSingleInstance
};