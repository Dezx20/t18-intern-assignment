var MongoClient = require("mongodb").MongoClient;
var url = "mongodb://localhost:27017/mydb";
var ObjectId = require("mongodb").ObjectID;
const teachers_Data = [
  {
    name: "jin1",
    email: "jin1@gmail.com",
    subject: "English",
  },
  {
    name: "jin2",
    email: "jin2@gmail.com",
    subject: "Maths",
  },
  {
    name: "jin3",
    email: "jin3@gmail.com",
    subject: "Science",
  },
  {
    name: "jin4",
    email: "jin4@gmail.com",
    subject: "History",
  },
  {
    name: "jin5",
    email: "jin5@gmail.com",
    subject: "Maths",
  },
];

const students_data = [
  {
    name: "dezx1",
    email: "dezx1@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "A",
    assignedTeacher: null,
  },
  {
    name: "dezx2",
    email: "dezx2@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "B",
    assignedTeacher: null,
  },
  {
    name: "dezx3",
    email: "dezx3@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "C",
    assignedTeacher: null,
  },
  {
    name: "dezx4",
    email: "dezx4@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "A",
    assignedTeacher: null,
  },
  {
    name: "dezx5",
    email: "dezx5@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "B",
    assignedTeacher: null,
  },
  {
    name: "dezx6",
    email: "dezx6@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "C",
    assignedTeacher: null,
  },
  {
    name: "dezx7",
    email: "dezx7@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "A",
    assignedTeacher: null,
  },
  {
    name: "dezx8",
    email: "dezx8@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "B",
    assignedTeacher: null,
  },
  {
    name: "dezx9",
    email: "dezx9@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "C",
    assignedTeacher: null,
  },
  {
    name: "dezx10",
    email: "dezx10@gmail.com",
    class: Math.floor(Math.random() * 2) + 8,
    section: "B",
    assignedTeacher: null,
  },
];
const createTeacher = async (obj, dbo, db) => {
  await dbo.collection("Teachers").insertOne(obj, (err, res) => {
    if (err) throw err;
    console.log("Teacher collection added one teacher");
    db.close();
  });
};
const createTeachers = async (obj, dbo, db) => {
  await dbo.collection("Teachers").insertMany(obj, (err, res) => {
    if (err) throw err;
    console.log(res);
    db.close();
  });
};
const createStudent = async (obj, dbo, db) => {
  await dbo.collection("Students").insertOne(obj, (err, res) => {
    if (err) throw err;
    console.log(res);
    db.close();
  });
};
const createStudents = async (obj, dbo, db) => {
  await dbo.collection("Students").insertMany(obj, (err, res) => {
    if (err) throw err;
    console.log(res);
    db.close();
  });
};
const createDB = (dbo, db) => {
  dbo.createCollection("Teachers", (err, res) => {
    if (err) throw err;
    console.log("Teacher Collection Created");
    // db.close();
    dbo.createCollection("Students", (err, res) => {
      if (err) throw err;
      console.log("Students Collection Created");
      db.close();
    });
  });
};

const findAll = async (dbo, db, collection_name) => {
  return await dbo
    .collection(collection_name)
    .find({})
    .toArray((err, res) => {
      if (err) throw err;
      console.log(res);
      //   studentsData = res;
      db.close();
      return res;
    });
};
const findOne = async (id, dbo, db, collection_name) => {
  return await dbo
    .collection(collection_name)
    .find({ _id: ObjectId(id) })
    .toArray((err, res) => {
      if (err) throw err;
      console.log(res);
      //   studentsData = res;
      db.close();
      return res;
    });
};

const assignTeacherToStudent = (teacherId, studentId, dbo, db) => {
  dbo
    .collection("Students")
    .updateOne(
      { _id: ObjectId(studentId) },
      { $set: { assignedTeacher: ObjectId(teacherId) } },
      (err, res) => {
        if (err) throw err;
        console.log("updated", res);
        db.close();
      }
    );
};
const getTeachers = async (subject, dbo, db, collection_name = "Teachers") => {
  return await dbo
    .collection(collection_name)
    .find({ subject: subject })
    .toArray((err, res) => {
      if (err) throw err;
      console.log(res);
      //   studentsData = res;
      db.close();
      return res;
    });
};
const getStudents = async (
  cname,
  section,
  dbo,
  db,
  collection_name = "Students"
) => {
  return await dbo
    .collection(collection_name)
    .find({ class: cname, section: section })
    .toArray((err, res) => {
      if (err) throw err;
      console.log(res);
      //   studentsData = res;
      db.close();
      return res;
    });
};

const editStudent = (studentId, studentObj, dbo, db) => {
  dbo
    .collection("Students")
    .updateOne(
      { _id: ObjectId(studentId) },
      { $set: { ...studentObj } },
      (err, res) => {
        if (err) throw err;
        console.log("updated", res);
        db.close();
      }
    );
};
const getStudentsAssignedToTeacher = async (
  teacherId,
  dbo,
  db,
  collection_name = "Students"
) => {
  return await dbo
    .collection(collection_name)
    .find({ assignedTeacher: ObjectId(teacherId) })
    .toArray((err, res) => {
      if (err) throw err;
      console.log(res);
      //   studentsData = res;
      db.close();
      return res;
    });
};

MongoClient.connect(url, async (err, db) => {
  if (err) throw err;
  let dbo = db.db("internDatabase");

  //   createDB(dbo, db);

  // 1.Create 5 Teachers.
  //   createTeachers(teachers_Data, dbo, db);

  // Create 1 Students
  //   createStudent(
  //     {
  //       name: "Jack1",
  //       email: "jack1@gmail.com",
  //       class: "Maths",
  //       section: "Maths",
  //       assignedTeacher: null,
  //     },
  //     dbo,
  //     db
  //   );

  // 2.Create 10 Students
  //   createStudents(students_data, dbo, db);

  // 3.Assign One Teacher to each student
  //   assignTeacherToStudent(
  //     "62642e3c66337f0e13dd9685",
  //     "62642bd0c134fffedf4d9d6b",
  //     dbo,
  //     db
  //   );

  // finding all teachers
  //   findAll(dbo, db, "Teachers");

  // finding all students
  //   findAll(dbo, db, "Students");

  // finding single student
  //   findOne("62642bc81a34d27967a55b81", dbo, db, "Students");

  //4.Get list of teachers with optional filtering(subject in this case)
  //   let subject = "Maths";
  //   getTeachers(subject, dbo, db);

  //5.Get list of students with optional filtering(class, section)
  //   let cname = 9;
  //   let section = "A";
  //   getStudents(cname, section, dbo, db);

  // 6.Students can edit their profiles(editStudent)
  //   editStudent(
  //     "62642bc81a34d27967a55b80",
  //     {
  //       name: "lexz2",
  //       email: "lexz2@gmail.com",
  //       class: 9,
  //       section: "C",
  //       assignedTeacher: null,
  //     },
  //     dbo,
  //     db
  //   );

  // Get list of students assigned to a teacher(id)
  //   getStudentsAssignedToTeacher("62642e3c66337f0e13dd9685", dbo, db);

  //   db.close();
});
