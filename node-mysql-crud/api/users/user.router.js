const{
    controllerAddUser,
    controllerGetUsers,
    controllerGetUserById,
    controllerUpdateUser,
    controllerDeleteUser,
    controllerLogin } = require("./user.controller");

const router = require("express").Router();
const { checkToken } = require("../../auth/token_validation")

router.post("/add", controllerAddUser);
router.get("/get",checkToken, controllerGetUsers);
router.get("/get:id", checkToken,controllerGetUserById);
router.patch("/update", checkToken, controllerUpdateUser);
router.delete("/delete", checkToken, controllerDeleteUser);
router.post("/login", controllerLogin)

module.exports = router;
