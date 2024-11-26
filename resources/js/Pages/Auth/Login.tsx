import Checkbox from "@/Components/Checkbox";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Title from "@/Components/Title";
import { AnimatedSubscribeButton } from "@/Components/ui/animated-subscribe-button";
import GuestLayout from "@/Layouts/GuestLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ChevronRightIcon, CheckIcon } from "lucide-react";
import { FormEventHandler, useEffect, useState } from "react";

export default function Login({
  status,
  canResetPassword,
}: {
  status?: string;
  canResetPassword: boolean;
}) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: "",
    password: "",
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    post(route("login"), {
      onFinish: () => reset("password"),
    });
  };

  const [error, setError] = useState<boolean>(false);   
  const findError = Object.values(errors);
  console.log(findError);
  useEffect(()=>{
    if(findError.length > 0){
      setError(true)
    } else{
      setError(false);
    }
  },[findError])
  


  return (
    <GuestLayout>
      <Head title="Log in" />

      {status && (
        <div className="mb-4 text-sm font-medium text-green-600">{status}</div>
      )}
                <Title
            tag="h1"
            classes="text-center mt-6 md:mt-0  p-4  text-2xl content-center font-bold text-black"
          >
            Bentornato, è un piacere rivederti
          </Title>
      <form onSubmit={submit}>
        <div>
          <InputLabel htmlFor="email" value="Email" />

          <TextInput
            id="email"
            type="email"
            name="email"
            value={data.email}
            className="mt-1 block w-full"
            autoComplete="username"
            isFocused={true}
            onChange={(e) => setData("email", e.target.value)}
          />

          <InputError message={errors.email} className="mt-2" />
        </div>

        <div className="mt-4">
          <InputLabel htmlFor="password" value="Password" />

          <TextInput
            id="password"
            type="password"
            name="password"
            value={data.password}
            className="mt-1 block w-full"
            autoComplete="current-password"
            onChange={(e) => setData("password", e.target.value)}
          />

          <InputError message={errors.password} className="mt-2" />
        </div>

        <div className="mt-4 block">
          <label className="flex items-center">
            <Checkbox
              name="remember"
              checked={data.remember}
              onChange={(e) => setData("remember", e.target.checked)}
            />
            <span className="ms-2 text-sm text-gray-600 dark:text-gray-400">
              Remember me
            </span>
          </label>
        </div>

        <div className="mt-4 flex items-center justify-end">
          {canResetPassword && (
            <Link
              href={route("password.request")}
              className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800 me-5"
            >
              Forgot your password?
            </Link>
          )}

          <AnimatedSubscribeButton
            buttonColor="#1f2937"
            buttonTextColor="#ffffff"
            subscribeStatus={false}
            initialText={ 
              <span className="group inline-flex items-center">
                Login{" "}
                <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
            }
            changeText={ error ? (<span className="group inline-flex items-center">
              Login{" "}
              <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
            </span>) : (

              <span className="group inline-flex items-center">
                <CheckIcon className="mr-2 size-4" />
                Loged{" "}
              </span>
            )
            }
          />
        </div>
      </form>
    </GuestLayout>
  );
}
