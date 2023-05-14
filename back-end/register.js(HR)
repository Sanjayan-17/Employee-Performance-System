const express = require("express");
const app = express();
const ejs = require("ejs");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
var nodemailer = require('nodemailer');
var multer = require('multer');
// var pro_name = require('../Employee/register')
// var data = require('../Employee/register')
var fs = require('fs');
const port = 4000;
// if (!fs.existsSync('images/')) {
//     fs.mkdirSync('images/');
//   }
errorMessage = ""
mongoose.connect("mongodb://localhost:27017/miniproject", {
useNewUrlParser: true,
useUnifiedTopology: true,
// console.log("Connected");
});
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, 'views/')
    },
    filename: function(req, file, cb) {
      cb(null, file.originalname)
    }
  });
 const upload = multer({storage: storage});
 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sanjayanmutharasan1717@gmail.com',
        pass: 'lbosldpudfogohah'
    }
});
message = "We regret to inform you that there is no promotion or demotion notice at this time.We appreciate your hard work and dedication to the company, and hope that you will continue to strive for excellence in your work.Please feel free to contact us if you have any questions or concerns."
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
}
const LoginSchema = {
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
 course_cred = 0
 proj_cred = 0
const projcredits = mongoose.model("projcredits",projcreditSchema)
const coursecredits = mongoose.model("coursecredits",coursecreditSchema)
const HRLogin = mongoose.model("HRLogin", LoginSchema);
const Employee = mongoose.model("USER", RegisterSchema);
const Project = mongoose.model("project",ProjectSchema);
const course = mongoose.model("course",CourseSchema);
const image = mongoose.model("image",ImageSchema);
app.use(express.static("views"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.engine('ejs', require('ejs').__express);
app.get('/register', (req, res) => {
      res.render('register2');
});
app.get('', (req, res) => {
    res.render('index');
});
app.get('/Evaluation',async (req, res) => {
    const users = await Employee.find({});
    res.render('HRpage',{users});
});
app.get('/login', (req, res) => {
    res.render('Login');
});
// app.get('/submit', async (req, res) => {
//     proj = await Project.find({});
//     res.render("project",{proj});
// })
app.get('/profile',(req, res) => {
    res.render("model");
});
app.get('/profile/:id', async (req, res) => {
    await image.findOne({img_name:req.params.id}, function(req,res,next) {
         res.send(image.data);
    });
    res.set('Content-Type', image.contentType);
    res.send(image.data);
})
app.get('/courses', (req, res) => {
    res.render("course");
});
app.post('/proj_submit',async (req, res) => {
    const proj = await Project.find({});
    nam = req.body.user_fn;
    
    
    res.render("project",{proj:proj}); 
});
app.get('/project',async (req, res) => {
    proj = await Project.find({});
    res.render("project",{proj:proj});
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
    user_n = req.body.username;
    const login = new HRLogin({
	
    username: req.body.username,
    password:req.body.password,
    confirmpassword: req.body.confirmPassword
 });
    login.save();
    res.render("submit");
});
app.post("/course_submit",async (req, res) => {
    cor = await course.find({});
    nam1 = nam;
    
    res.render("course",{cor}); 
});
app.post("/coursecredits",async (req, res) => {
    const users = await Employee.find({});
    const cour = new coursecredits ({
        firstName:nam1,
        coursecredits:req.body.course_credits,
    });
    course_cred = req.body.course_credits;
    // console.log(course_cred);
    // console.log(proj_cred);
    total_cred = parseInt(course_cred) + parseInt(proj_cred);
    console.log(total_cred);
    const email2 = await  Employee.find({firstName:nam}, 'EMAIL');
    // var mailOptions = {
    //     from: 'sanjayanmutharasan1717@gmail.com',
    //     to: 'sanjayan2010533@ssn.edu.in',
    //     subject: 'Your Credits for the course',
    //     text: ` Dear ${nam1} ,We appreciate your effort in submitting your course.  
    //     .We have evaluated your course and the certfifcate .We have evaluated and entered appropriate credits for you for the same. The credits by the HR based on the skills you have acquired
    //     through the course.Your credits are ${req.body.course_credits}.This is the final score and no modifications can be made.We hope you understand.
    //     Regards
    //     HR`,
    // };
    var mailOptions_promotion = {
        from: 'sanjayanmutharasan1717@gmail.com',
        to: email2,
        subject: 'Congragulations on your Promotion!',
        text: `Dear ${nam1},

        I am pleased to inform you that you have been promoted ! Your hard work and dedication to Tech Company Solutions has not gone unnoticed, and we are excited to see you continue to grow with us in this new role.
        
        Your new responsibilities will informed to you by us in a short notice. I have no doubt that you will excel in this role just as you have in your previous position.
        
        Please let us know if you have any questions or concerns regarding your promotion. We are here to support you in any way we can.
        
        Once again, congratulations on your promotion!
        
        Best regards,
        ${user_n},Human Resource Manager
        Tech Company Solutions`,
    }
    var mailOptions_demotion = {
        from: 'sanjayanmutharasan1717@gmail.com',
        to: 'sanjayan2010533@ssn.edu.in',
        subject: 'Demotion Notice',
        text: `Dear ${nam1},

        I regret to inform you that, due to low credits in projects and courses, the company has decided to demote you from your current position. Effective date of demotion, you will assume your new position.
        
        We understand that this news may come as a shock, and we want to assure you that we value your contributions to the company. We hope that this demotion will serve as an opportunity for you to grow and develop your skills in your new role.
        
        If you have any questions or concerns, please do not hesitate to reach out to me.
        
        Sincerely,
        
        ${user_n},Human Resource Manager`,
    }
    if(total_cred>20) {
        message = "I am pleased to inform you that you have been promoted ! Your hard work and dedication to Tech Company Solutions has not gone unnoticed, and we are excited to see you continue to grow with us in this new role.Your new responsibilities will informed to you by us in a short notice. I have no doubt that you will excel in this role just as you have in your previous position.Please let us know if you have any questions or concerns regarding your promotion. We are here to support you in any way we can.Once again, congratulations on your promotion!"
    transporter.sendMail(mailOptions_promotion, function(err,info) {
				if (err) {
				   console.log(err);
				}
				else {
				   console.log('Email sent successfully' + info.response);
				}
		   });
    }
    if(total_cred<5) {
        message = " I regret to inform you that, due to low credits in projects and courses, the company has decided to demote you from your current position. Effective date of demotion, you will assume your new position.We understand that this news may come as a shock, and we want to assure you that we value your contributions to the company. We hope that this demotion will serve as an opportunity for you to grow and develop your skills in your new role.If you have any questions or concerns, please do not hesitate to reach out to me."
        transporter.sendMail(mailOptions_demotion, function(err,info) {
            if (err) {
               console.log(err);
            }
            else {
               console.log('Email sent successfully' + info.response);
            }
       });
    }
    cour.save();
    res.render("HRpage",{users});
})
app.post("/project",upload.single('SRS'),function(req,res){
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
     cor.save();
     res.render("submit");
});
// app.post("/Evaluation", function (req, res) {
//     nam = req.body.user_fn;
//     res.render("HRpage");
// })
app.post("/projcredits",async (req, res) => {
    const users = await Employee.find({});
    const pro = new projcredits ({
        firstName:nam,
        projcredits:req.body.credits,
    });
    proj_cred = req.body.credits;
    const email = await  Employee.find({firstName:nam}, 'EMAIL');
    // var mailOptions = {
    //     from: 'sanjayanmutharasan1717@gmail.com',
    //     to: email,
    //     subject: 'Project Credits',
    //     text: ` Dear ${nam} ,We appreciate your effort in submitting your project.  
    //     .We have evaluated your project and SRS of the project .We have evaluated and entered appropriate credits for you for the same. The credits by the HR based on the complexity and the effort you have taken
    //     for the project.Your credits are ${req.body.credits}.This is the final score and no modifications can be made.We hope you understand.
    //     Regards
    //     HR`,
    // };
    // transporter.sendMail(mailOptions, function(err,info) {
	// 			if (err) {
	// 			   console.log(err);
	// 			}
	// 			else {
	// 			   console.log('Email sent successfully' + info.response);
	// 			}
	// 	   });
     
    
    pro.save();
    res.render("HRpage",{users});
});
app.post("/login", function(req, res) {
    HRLogin.findOne({ username: req.body.username })
  
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
          user_n = user.username;
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
console.log(course_cred)
console.log(proj_cred)
app.listen(port, (req, res) => {
    console.log(`listening on port ${port}`);
});