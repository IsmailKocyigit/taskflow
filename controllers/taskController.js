
const fs = require("node:fs/promises");
const path = require("node:path");
const { randomUUID } = require("node:crypto");

const tasksFilePath = path.join(__dirname, "../data/tasks.json");

async function readTasks() {
  const data = await fs.readFile(tasksFilePath, "utf8");
  return JSON.parse(data);
}

async function writeTasks(tasks) {
  await fs.writeFile(
    tasksFilePath,
    JSON.stringify(tasks, null, 2)
  );
}

// 1. Yeni görev oluştur
async function createTask(req, res) {
  try {
    const { title, description, status, priority, assignee } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        message: "Görev başlığı zorunludur."
      });
    }

    const tasks = await readTasks();
    const now = new Date().toISOString();

    const newTask = {
      id: randomUUID(),
      title: title.trim(),
      description: description || "",
      status: status || "pending",
      priority: priority || "medium",
      assignee: assignee || "",
      createdAt: now,
      updatedAt: now
    };

    tasks.push(newTask);
    await writeTasks(tasks);

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({
      message: "Sunucu hatası."
    });
  }
}

// 2. Tüm görevleri listele
async function getAllTasks(req, res) {
  try {
    const tasks = await readTasks();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Sunucu hatası."
    });
  }
}

// 3. ID ile görev getir
async function getTaskById(req, res) {
  try {
    const tasks = await readTasks();
    const task = tasks.find((task) => task.id === req.params.id);

    if (!task) {
      return res.status(404).json({
        message: "Görev bulunamadı."
      });
    }

    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Sunucu hatası."
    });
  }
}

// 4. Görevi güncelle
async function updateTask(req, res) {
  try {
    const tasks = await readTasks();
    const index = tasks.findIndex(
      (task) => task.id === req.params.id
    );

    if (index === -1) {
      return res.status(404).json({
        message: "Görev bulunamadı."
      });
    }

    const currentTask = tasks[index];
    const { title, description, status, priority, assignee } = req.body;

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        message: "Görev başlığı boş olamaz."
      });
    }

    tasks[index] = {
      ...currentTask,
      title: title !== undefined ? title.trim() : currentTask.title,
      description: description !== undefined
        ? description
        : currentTask.description,
      status: status !== undefined ? status : currentTask.status,
      priority: priority !== undefined ? priority : currentTask.priority,
      assignee: assignee !== undefined ? assignee : currentTask.assignee,
      updatedAt: new Date().toISOString()
    };

    await writeTasks(tasks);
    res.status(200).json(tasks[index]);
  } catch (error) {
    res.status(500).json({
      message: "Sunucu hatası."
    });
  }
}

// 5. Görevi sil
async function deleteTask(req, res) {
  try {
    const tasks = await readTasks();
    const remainingTasks = tasks.filter(
      (task) => task.id !== req.params.id
    );

    if (remainingTasks.length === tasks.length) {
      return res.status(404).json({
        message: "Görev bulunamadı."
      });
    }

    await writeTasks(remainingTasks);

    res.status(200).json({
      message: "Görev başarıyla silindi."
    });
  } catch (error) {
    res.status(500).json({
      message: "Sunucu hatası."
    });
  }
}

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask
};
