"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomFormField from "@/components/CustomFormField";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.action";

const AuthForm = ({ type }: { type: string }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
const formSchema = authFormSchema(type)
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const onSubmit=async (data: z.infer<typeof formSchema>)=> {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    setIsLoading(true);
    
  try {
    if(type==="sign-in"){
      const response= await signIn({
        email:data.email,
        password:data.password
      })
      if(response){
        router.push("/")
      }
    }
    if (type==="sign-up"){
      const newUser = await signUp(data)

      setUser(newUser)

    }
    
  } catch (error) {
    console.log(error)
  }finally{
    setIsLoading(false)
  }
    
  }
  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href="/" className=" cursor-pointer flex items-center gap-1 ">
          <Image
            src="/icons/logo.svg"
            width={34}
            height={34}
            alt="Horizon logo"
          />
          <h1 className=" text-26 font-ibm-plex-serif font-bold text-black-1">
            Horizon
          </h1>
        </Link>
        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "LinkAccount" : type === "sign-in" ? "Sign In" : "Sign Up"}
          </h1>
          <p className="text-16 font-normal text-gray-600">
            {user
              ? "Link your account to get started"
              : "Please enter your details"}
          </p>
        </div>
      </header>
      {user ? (
        <div className="flex flex-col gap-4">{/* Pladelink  */}</div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              {type === "sign-up" && (
                <>
                <div className="flex gap-4">
                <CustomFormField
                    control={form.control}
                    name={"firstName"}
                    label={"First Name"}
                    placeholder={"first name"}
                  />
                   <CustomFormField
                    control={form.control}
                    name={"lastName"}
                    label={"Last Name"}
                    placeholder={"last name"}
                  />
                </div>
             
                   <CustomFormField
                    control={form.control}
                    name={"address1"}
                    label={"Address"}
                    placeholder={"specific address"}
                  />
                   <CustomFormField
                    control={form.control}
                    name={"city"}
                    label={"City"}
                    placeholder={"city"}
                  />
                  <div className="flex gap-4">
                   <CustomFormField
                    control={form.control}
                    name={"state"}
                    label={"State"}
                    placeholder={"state"}
                  />
                   <CustomFormField
                    control={form.control}
                    name={"postalCode"}
                    label={"Postal Code"}
                    placeholder={"postal Code"}
                  />
                  </div>
                  <div className="flex gap-4">
                   <CustomFormField
                    control={form.control}
                    name={"dateOfBirth"}
                    label={"Date of birth"}
                    placeholder={"dob"}
                  />
                   <CustomFormField
                    control={form.control}
                    name={"ssn"}
                    label={"SSN"}
                    placeholder={"ssn"}
                  />
                  </div>
                </>
              )}
              <CustomFormField
                control={form.control}
                name={"email"}
                label={"Email"}
                placeholder={"email"}
              />
              <CustomFormField
                control={form.control}
                name={"password"}
                label={"Password"}
                placeholder={"password"}
              />
              <div className="flex flex-col gap-4">
                <Button type="submit" disabled={isLoading} className="form-btn">
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} /> &nbsp;
                      Loading...
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </div>
            </form>
          </Form>
          <footer className="flex justify-center gap-1">
            <p className="text-14 font-normal text-gray-600">
              {type === "sign-in"
                ? "Don't have an account? "
                : "Already have an account? "}
            </p>
            <Link
              className="form-link"
              href={type === "sign-in" ? "/sign-up" : "/sign-in"}
            >
              {type === "sign-in" ? "Sign up" : "Sign in"}
            </Link>
          </footer>
        </>
      )}
    </section>
  );
};

export default AuthForm;
