import {Router} from "express";
import { loginUser, logoutUser, registerUser,refreshAccessToken, updateme, getUserProfile } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1
        },
        {
            name: "coverImage",
            maxCount: 1 
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)
router.route("/update").patch(verifyJWT,updateme)
router.route("/user").get(verifyJWT, (req, res) => {
    res.json(req.user)
})
router.route("/admin").get(verifyJWT, (req, res) => {
    if(req.user.role !== "admin"){
        return res.status(403).json({message: "You are not allowed to access this route"})
    }
    res.json(req.user)
})
//secured routes
router.route("/logout").post(verifyJWT, logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/userprofile").get(verifyJWT,getUserProfile)

export default router