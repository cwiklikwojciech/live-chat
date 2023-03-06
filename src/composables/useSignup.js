import { ref } from "vue";
import { projectAuth } from "../firebase/config";

const error = ref(null);

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

const signup = async (email, password, displayName) => {
    error.value = null;

    try{
        const res = await projectAuth.createUserWithEmailAndPassword(email, password);
        if (!res){
            throw new Error('Could not complete signup')
        }
        await res.user.updateProfile({
            displayName: displayName,
            photoURL: getRandomColor()
          })
        error.value = null;
         
        return res

    }catch(err) {
        console.log(err.message);
        error.value = err.message;
    }
}   

const useSignup = () => {
    return { error, signup }
  }

export default useSignup