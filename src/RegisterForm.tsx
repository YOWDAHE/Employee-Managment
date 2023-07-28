import { Form, useForm } from "react-hook-form";

const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
} = useForm();


  
function RegisterForm() {
  return (
      <div>
          <form
          // onSubmit={handleSubmit(handleForm)}
          >
              

          </form>
    </div>
  )
}

export default RegisterForm