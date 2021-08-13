// build your `Project` model here
const db = require("../../data/dbConfig");

const getProjects = () => {
	return db("projects");
};

const getProjectsById = (project_id) => {
	return db("projects").where({ project_id });
};

const createProject = (project) => {
	return db("projects")
		.insert(project)
		.then(([project_id]) => {
			return getProjectsById(project_id);
		});
};

const checkId = async (req, res, next) => {
	const { project_id } = req.params;
	const [project] = await getProjectsById(project_id);
	if (project) {
		req.project = {
			...project,
			project_completed: project.project_completed ? true : false,
		};
		next();
	} else {
		res
			.status(404)
			.json({ message: `Project with id ${project_id} not found.` });
	}
};

module.exports = {
	getProjects,
	createProject,
	checkId,
};
