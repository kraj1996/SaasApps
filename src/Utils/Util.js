class Utils {
    static isLoggedIn() {

        if(window.localStorage.getItem("user_Token")!=null)
        return true;
        else 
        return false;
    }
}

export default Utils;