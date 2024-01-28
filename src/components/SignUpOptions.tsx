import React from "react";
import { Button } from "./ui/button";
import { Mail } from "lucide-react";
import { GoogleOutlined } from "@ant-design/icons";
import { useFormStore } from "@/store/formStore";
import { motion } from "framer-motion";
import { signInWithGoogle } from "@/app/auth-actions/client/actions";
import { toast } from "sonner";
import { redirect } from "next/navigation";

const SignUpOptions = () => {
  const [onHandleNext] = useFormStore((state) => [state.onHandleNext]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          opacity: 0,
          translateX: -100,
          transition: {
            delay: 0.5,
          },
        },
        visible: {
          opacity: 1,
          transition: {
            delay: 0.5,
          },
          translateX: 0,
        }
      }}
      className="flex flex-col items-center justify-center mt-8"
    >
      <h1 className="font-bold text-4xl">Sign in with:</h1>
      <div className="mt-8 flex flex-col items-center gap-4">
        <Button onClick={onHandleNext}>
          <Mail className="mr-2 h-4 w-4" />
          Sign up with email and password
        </Button>
        <Button variant={"secondary"} onClick={async() => {
          const {data, error} = await signInWithGoogle();

          if(error){
            toast.error(error.message)
          }else if(data){
            redirect('/dashboard')
          }
        }}>
          <GoogleOutlined className="mr-2 h-4 w-4" />
          Sign in with Google
        </Button>
      </div>
    </motion.div>
  );
};

export default SignUpOptions;
