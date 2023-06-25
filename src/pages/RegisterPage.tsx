import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";
import { ROUTES, User } from "../utils";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const { signup, errors: registerErrors } = useAuth();

  const onSubmit = handleSubmit(async (user) => {
    const resp = await signup({ user });
    resp && navigate(ROUTES.PROFILE)
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {registerErrors.map((error, i) => (
          <div key={i} className="bg-red-500 p-2 text-white">
            {error}
          </div>
        ))}
        <form onSubmit={onSubmit} autoComplete="off">
          <input
            type="text"
            {...register("username", { required: true })}
            placeholder="Username"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoComplete="new-text"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            type="text"
            {...register("email", { required: true })}
            placeholder="Email"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoComplete="new-text"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            placeholder="Password"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <div className="flex justify-evenly w-full mt-2">
            <button type="submit" className="bg-amber-800 p-2 rounded-sm">
              Register
            </button>
            <Link to={ROUTES.PROFILE} className="bg-red-800 p-2 rounded-sm">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
