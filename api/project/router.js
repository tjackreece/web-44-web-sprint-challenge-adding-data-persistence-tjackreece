// build your `/api/projects` router here
const express = require("express");

const router = express.Router();

const Projects = require("./model");

router.get("/", async (req, res, next) => {
	await Projects.getProjects()
		.then((projects) => {
			res.status(200).json(changeBoo(projects));
		})
		.catch(next);
});

router.post("/", (req, res, next) => {
	Projects.createProject(req.body)
		.then((project) => {
			res.status(201).json(changeBoo(project)[0]);
		})
		.catch(next);
});

const changeBoo = (data) => {
	return data.map((project) => ({
		...project,
		project_completed: project.project_completed ? true : false,
	}));
};
module.exports = router;
// s
