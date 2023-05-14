const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var multer = require('multer');
var fs = require('fs');
const port = 5000;
// if (!fs.existsSync('images/')) {
//     fs.mkdirSync('images/');
//   }
mongoose.connect("mongodb://localhost:27017/miniproject", {
useNewUrlParser: true,
useUnifiedTopology: true,
// console.log("Connected");
});
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, '../HR/views/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  });
 const upload = multer({storage: storage});
const RegisterSchema = {
    firstName: String,
    lastName: String,
    EMAIL: String,
    MNumber: String,
    Gender: String,
    DOB_date:String,
    DOB_month: String,
    DOB_year: String,
    Address: String,
    City: String,
    PINCODE: String,
    STATE:String,
    Country: String,
    WrokExperience: String,
    Role:String,
    linkedIn: String,
    CLetter:String,
    username: String,
    password: String,
    confirmpassword:String
};
const ProjectSchema = {
    firstName: String,
    lastName: String,
    EMAIL: String,
    MNumber: String,
    Role:String,
    Name_here: String,
    ProjectName:String,
    name:String,
    data:String,
    contentType:String,
    Projlink:String,
    ProjectDesc:String,
}
const CourseSchema = {
    firstName: String,
    lastName: String,
    EMAIL: String,
    MNumber: String,
    Role:String,
    Name_here: String,
    CName:String,
    name:String,
    data:String,
    contentType:String,
    Skills:Array,
}
const ImageSchema = {
    firstName: String,
    lastName: String,
    EMAIL: String,
    MNumber: String,
    Role:String,
    img_name:String,
    image:Buffer,
}
const projcreditSchema = {
    firstName: {
        type:String,
        unique:true},
    projcredits:Number,
}
const coursecreditSchema = {
    firstName: {
        type:String,
        unique:true},
    coursecredits:Number,
}
const projcredits = mongoose.model("projcredits",projcreditSchema)
const coursecredits = mongoose.model("coursecredits",coursecreditSchema)
const Employee = mongoose.model("USER", RegisterSchema);
const Project = mongoose.model("project",ProjectSchema);
const course = mongoose.model("course",CourseSchema);
const image = mongoose.model("image",ImageSchema);
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);
app.get('/register', (req, res) => {
      res.render('register');
});
app.get('', (req, res) => {
    res.render('index');
});
app.get('/login', (req, res) => {
    res.render('Login');
});
app.get('/profile',(req, res) => {
    res.render("model");
});
app.get('/performance', (req, res) => {
    res.render('performance');
});
total_cred = 0
course_cred = coursecredits.find({},'coursecredits');
console.log(course_cred);
proj_cred = projcredits.find({},'projcredits');
console.log(proj_cred);
total_cred = parseInt(course_cred) + parseInt(proj_cred);
message = "We regret to inform you that there is no promotion or demotion notice at this time.We appreciate your hard work and dedication to the company, and hope that you will continue to strive for excellence in your work.Please feel free to contact us if you have any questions or concerns."
if (total_cred>20) {
    message = "I am pleased to inform you that you have been promoted ! Your hard work and dedication to Tech Company Solutions has not gone unnoticed, and we are excited to see you continue to grow with us in this new role.Your new responsibilities will informed to you by us in a short notice. I have no doubt that you will excel in this role just as you have in your previous position.Please let us know if you have any questions or concerns regarding your promotion. We are here to support you in any way we can.Once again, congratulations on your promotion!"
}
if (total_cred<5) {
    message = " I regret to inform you that, due to low credits in projects and courses, the company has decided to demote you from your current position. Effective date of demotion, you will assume your new position.We understand that this news may come as a shock, and we want to assure you that we value your contributions to the company. We hope that this demotion will serve as an opportunity for you to grow and develop your skills in your new role.If you have any questions or concerns, please do not hesitate to reach out to me."
}
// app.get('/profile/:id', async (req, res) => {
//     await image.findOne({img_name:req.params.id}, function(req,res,next) {
//          res.send(image.data);
//     });
//     res.set('Content-Type', image.contentType);
//     res.send(image.data);
// })
app.get('/courses', (req, res) => {
    res.render("course");
});
app.get('/project',(req, res) => {
    res.render("project");
});
app.get('/logout', (req, res) => {
     res.render("Login");
});
app.post("/register2", upload.single('image'),function (req, res) {
img_n = req.file.originalname,
imge = req.body.image,
fn =  req.body.First_Name,
ln = req.body.Last_Name,
EM = req.body.Email_Id,
MN =  req.body.Mobile_Number,
Gnd =  req.body.Gender,
date = req.body.Birthday_day,
month = req.body.Birthday_Month,
year = req.body.Birthday_Year,
Addr= req.body.Address,
Ci= req.body.City,
PIN=req.body.Pin_Code,
ST=req.body.State,
Co=req.body.Country,
Work= req.body.Qualifications,
Ro=req.body.Role,
linked = req.body.linkedIn,
CLe=req.body.CoverLetter;
const img = new image ({ 
     firstName:fn,
     lastName:ln,
     EMAIL:EM,
     MNumber:MN,
     Role:Ro,
     img_name:req.file.originalname,
     image:req.file.buffer,
});
 img.save();
 res.render("register2");
});
app.get('/register2', (req, res) => {
    res.render('register2',{});
});

app.post("/submit",function (req, res) {
    const Empl = new Employee({
	firstName: fn,
    lastName: ln,
    EMAIL: EM,
    MNumber: MN,
    Gender: Gnd,
    DOB_date:date,
    DOB_month:month,
    DOB_year:year,
    Address: Addr,
    City: Ci,
    PINCODE: PIN,
    STATE:ST,
    Country: Co,
    WrokExperience: Work,
    Role:Ro,
    linkedIn:linked,
    CLetter:CLe,
    username: req.body.username,
    password:req.body.password,
    confirmpassword: req.body.confirmPassword
 });
    Empl.save();
    res.render("submit");
});
app.post("/project",upload.single('SRS'),function(req,res){
     pro_name = req.file.originalname;
     const proj = new Project ({
        firstName: fn,
        lastName: ln,
        EMAIL: EM,
        MNumber: MN,
        Role: Ro,
        Name_here:req.body.name,
        ProjectName:req.body.projname,
        name:req.file.originalname,
        data:req.file.buffer,
        contentType:req.file.mimetype,
        Projlink:req.body.projlink,
        ProjectDesc:req.body.projdesc,
     });
     proj_SRS = req.file.originalname;
     proj.save();
     res.render("submit");
     module.exports = pro_name;
});
app.post("/course",upload.single('certificate'),function(req,res){
     const cor = new course ({
        firstName: fn,
        lastName: ln,
        EMAIL: EM,
        MNumber: MN,
        Role: Ro,
        Name_here:req.body.uname,
        CName:req.body.cname,
        name:req.file.originalname,
        data:req.file.buffer,
        contentType:req.file.mimetype,
        Skills:req.body.skill,
     });
     cor_name = req.file.originalname;
     cor.save();
     res.render("submit");
});
app.post("/login", function(req, res) {
    Employee.findOne({ username: req.body.username })
  
    // if email exists
    .then((user) => {
      // compare the password entered and the hashed password found
      if (user.password == req.body.password) {
      // 	transporter.sendMail(mailOptions, function(err,info) {
      // 		if (err) {
      // 		   console.log(err);
      // 		}
      // 		else {
      // 		   console.log('Email sent successfully' + info.response);
      // 		}
      //    });
          
          fn = user.firstName;
          ln = user.lastName;
          EM = user.EMAIL;
          MN = user.MNumber;
          Gnd = user.Gender;
          date = user.DOB_date;
          month = user.DOB_month;
          year = user.DOB_year;
          Addr = user.Address;
          Ro = user.Role;
          linked = user.linkedIn;
          image.findOne({firstName: fn, lastName:ln}) 
            .then((img) => {
                img_n = img.img_name;
            }

            )
          // response.send("<h1>Hello username</h1>");
          // res.send("welcome {user.password}");
          res.render("submit");

      }
      else {
        //   alert("Wrong password");
        res.send("<script>window.alert('Wrong Password');window.location.href = '/login'</script>");
      }
    })
    // catch error if email does not exist
    .catch((e) => {
      res.status(404).send({
        message: "Email not found",
        e,
      });
    });
});
app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});