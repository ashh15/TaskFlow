const Task = require("../models/Task");

async function handleCreateNewTask(req, res) {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      userId: req.user.userId,
      status: req.body.status,
      dueDate: req.body.dueDate,
      userId: req.user.userId,
    });
    res.status(201).json({
      success: true,
      task,
    });
  } catch (err) {
    res.status(500).json({ success: false, Error: err });
  }
}

async function handleGetAllTasks(req, res) {
  try {
    console.log(req.cookies["token"]);
    const tasks = await Task.find({ userId: req.user.userId });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
}

async function handleDeleteTask(req, res) {
  try {
    const id = req.params.id;
    const user = await Task.findOneAndDelete({
      _id: id,
      userId: req.user.userId,
    });
    res.status(200).json({
      success: true,
      deletedUser: user,
    });
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      Error: err,
    });
  }
}

async function handleUpdateTask(req, res) {

  try {

    const id = req.params.id;

    const updateData = {};

    if (req.body.title !== undefined) {
      updateData.title = req.body.title;
    }

    if (req.body.description !== undefined) {
      updateData.description = req.body.description;
    }

    if (req.body.priority !== undefined) {
      updateData.priority = req.body.priority;
    }

    if (req.body.status !== undefined) {
      updateData.status = req.body.status;
    }

    if (req.body.dueDate !== undefined) {
      updateData.dueDate = req.body.dueDate;
    }

    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: id,
        userId: req.user.userId
      },
      updateData,
      {
        returnDocument: "after"
      }
    );

    res.status(200).json({
      success: true,
      updatedTask,
    });

  } catch (err) {

    console.log(err);

  }

}

async function handleGetTaskById(req, res) {
  try {
    const id = req.params.id;
    const task = await Task.findOne({ _id: id, userId: req.user.userId });
    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({
      Error: err,
    });
  }
}
async function handleDeleteManyTasks(req, res) {
  try {
    const { ids } = req.body;
    const result = await Task.deleteMany({
      _id: {
        $in: ids,
      },
      userId: req.user.userId,
    });
    res.status(200).json({
      success: true,
      deletedCount: result.deletedCount,
    });
  } catch (err) {
    res.status(500).json({ sucess: false, Error: err });
  }
}
module.exports = {
  handleCreateNewTask,
  handleGetAllTasks,
  handleDeleteTask,
  handleUpdateTask,
  handleGetTaskById,
  handleDeleteManyTasks,
};
